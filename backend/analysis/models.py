from django.db import models
from django.contrib.auth.models import User

class Patient(models.Model):
    doctor = models.ForeignKey(User, on_delete=models.CASCADE, related_name='patients')
    fullname = models.CharField(max_length=255)
    age = models.IntegerField()
    gender = models.CharField(max_length=10, choices=[('M', 'Male'), ('F', 'Female')])
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.fullname

class EEGFile(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='eeg_files', null=True, blank=True)
    patient = models.ForeignKey(Patient, on_delete=models.SET_NULL, null=True, blank=True)
    file = models.FileField(upload_to='eeg_files/')
    
    # Analysis results cached in DB
    status = models.CharField(max_length=20, default='pending') # pending, processing, completed, error
    seizure_probability = models.FloatField(null=True, blank=True)
    summary = models.TextField(null=True, blank=True)
    
    uploaded_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"EEG {self.id} for {self.user.username}"

class AIModelStats(models.Model):
    model_version = models.CharField(max_length=20, default='v2.0')
    total_samples = models.IntegerField(default=0)
    current_accuracy = models.FloatField(default=0.0)
    last_trained = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name_plural = "AI Model Stats"
