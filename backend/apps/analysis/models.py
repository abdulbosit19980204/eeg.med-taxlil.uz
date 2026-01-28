from django.db import models
from django.conf import settings
from apps.clinical.models import Patient

class EEGAnalysis(models.Model):
    STATUS_CHOICES = (
        ('pending', 'Pending AI Analysis'),
        ('processing', 'Processing Signal'),
        ('completed', 'Analysis Complete'),
        ('error', 'Processing Error'),
    )
    
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='analyses')
    patient = models.ForeignKey(Patient, on_delete=models.CASCADE, related_name='analyses')
    
    edf_file = models.FileField(upload_to='eeg_records/%Y/%m/%d/')
    file_size = models.CharField(max_length=20, null=True, blank=True)
    
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')
    
    # AI Results
    seizure_probability = models.FloatField(null=True, blank=True)
    dominant_frequency = models.FloatField(null=True, blank=True)
    ai_summary = models.TextField(null=True, blank=True)
    
    # Metadata
    channels_count = models.IntegerField(null=True, blank=True)
    duration_seconds = models.FloatField(null=True, blank=True)
    sampling_rate = models.FloatField(null=True, blank=True)
    
    created_at = models.DateTimeField(auto_now_add=True)
    completed_at = models.DateTimeField(null=True, blank=True)

    class Meta:
        verbose_name = 'EEG Analysis'
        verbose_name_plural = 'EEG Analyses'
        ordering = ['-created_at']

    def __str__(self):
        return f"Analysis {self.id} - {self.patient.fullname}"

class SpectralResult(models.Model):
    analysis = models.OneToOneField(EEGAnalysis, on_delete=models.CASCADE, related_name='spectral_data')
    alpha_power = models.FloatField()
    beta_power = models.FloatField()
    theta_power = models.FloatField()
    delta_power = models.FloatField()
    
    # Json field for storage efficiency if needed, or separate fields
    spectral_json = models.JSONField(null=True, blank=True) 

    def __str__(self):
        return f"Spectral results for {self.analysis.id}"
