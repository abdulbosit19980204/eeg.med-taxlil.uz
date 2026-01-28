from rest_framework import serializers
from .models import EEGAnalysis, SpectralResult
from apps.clinical.serializers import PatientSerializer

class SpectralResultSerializer(serializers.ModelSerializer):
    class Meta:
        model = SpectralResult
        fields = '__all__'

class EEGAnalysisSerializer(serializers.ModelSerializer):
    patient_details = PatientSerializer(source='patient', read_only=True)
    spectral_data = SpectralResultSerializer(read_only=True)
    
    class Meta:
        model = EEGAnalysis
        fields = '__all__'
        read_only_fields = ('user', 'status', 'seizure_probability', 'ai_summary', 'completed_at')
