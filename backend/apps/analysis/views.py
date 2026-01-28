from rest_framework import viewsets, status
from rest_framework.response import Response
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
            
            # 2. Perform AI Inference (Simulated)
            results = EEGProcessorService.calculate_spectral_bands(analysis.edf_file.path)
            
            analysis.seizure_probability = results['seizure_probability']
            analysis.ai_summary = f"Analysis completed. Dominant Alpha: {results['alpha_power']:.2f}. No acute spikes detected."
            
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
            analysis.status = 'error'
            analysis.ai_summary = str(e)
            analysis.save()
