from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.decorators import action
from .models import EEGAnalysis, SpectralResult
from .serializers import EEGAnalysisSerializer
from apps.ai_engine.services import EEGProcessorService
import threading
from django.utils import timezone

class EEGAnalysisViewSet(viewsets.ModelViewSet):
    serializer_class = EEGAnalysisSerializer
    
    def get_queryset(self):
        return EEGAnalysis.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        analysis = serializer.save(user=self.request.user)
        
        # Start background processing
        thread = threading.Thread(target=self.process_eeg, args=(analysis.id,))
        thread.start()

    def process_eeg(self, analysis_id):
        try:
            analysis = EEGAnalysis.objects.get(id=analysis_id)
            analysis.status = 'processing'
            analysis.save()
            
            # 1. Extract Metadata
            meta = EEGProcessorService.extract_metadata(analysis.edf_file.path)
            analysis.channels_count = meta.get('channels_count')
            analysis.sampling_rate = meta.get('sampling_rate')
            analysis.duration_seconds = meta.get('duration_seconds')
            
            # 2. Perform AI Inference
            results = EEGProcessorService.calculate_spectral_bands(analysis.edf_file.path)
            
            analysis.seizure_probability = results['seizure_probability']
            
            # Generate Clinical Summary
            summary = "Tahlil yakunlandi. "
            if results['seizure_probability'] > 0.7:
                summary += "DIQQAT: Yuqori darajadagi epileptiform faollik (seizure) aniqlandi. "
            elif results['seizure_probability'] > 0.3:
                summary += "O'rtacha darajadagi asinxroniya kuzatildi. "
            else:
                summary += "Ritmik faollik normal chegarada. "
                
            summary += f"Dominant Alpha kuchi: {results['alpha_power']:.2f} μV². "
            if results['beta_power'] > results['alpha_power']:
                summary += "Beta to'lqinlarining ustunligi taranglik yoki dori ta'sirini ko'rsatishi mumkin. "
            
            analysis.ai_summary = summary
            
            # 3. Create Spectral Results
            SpectralResult.objects.create(
                analysis=analysis,
                alpha_power=results['alpha_power'],
                beta_power=results['beta_power'],
                theta_power=results['theta_power'],
                delta_power=results['delta_power']
            )
            
            analysis.status = 'completed'
            analysis.completed_at = timezone.now()
            analysis.save()
            
        except Exception as e:
            import traceback
            analysis.status = 'error'
            analysis.ai_summary = f"Xatolik: {str(e)}"
            print(f"EEG Processing Error: {traceback.format_exc()}")
            analysis.save()

    @action(detail=True, methods=['get'])
    def signal_data(self, request, pk=None):
        """Return sampled signal data for visualization."""
        import mne
        import numpy as np
        
        analysis = self.get_object()
        
        try:
            raw = mne.io.read_raw_edf(analysis.edf_file.path, preload=True, verbose=False)
            
            # Subsample for performance (take every Nth sample)
            sfreq = raw.info['sfreq']
            data = raw.get_data()
            
            # Take max 10 seconds of data, subsampled
            max_samples = int(min(10 * sfreq, data.shape[1]))
            step = max(1, int(sfreq / 100))  # ~100 samples per second for display
            
            sampled_data = data[:, :max_samples:step].tolist()
            ch_names = raw.ch_names
            
            return Response({
                "channels": ch_names,
                "data": sampled_data,
                "sfreq": sfreq,
                "duration": raw.times[-1],
                "samples_per_channel": len(sampled_data[0]) if sampled_data else 0
            })
        except Exception as e:
            import traceback
            print(f"Signal Data Error: {traceback.format_exc()}")
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)
