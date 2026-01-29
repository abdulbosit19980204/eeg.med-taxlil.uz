from django.db import models
from django.conf import settings

class AITrainingSession(models.Model):
    STATUS_CHOICES = (
        ('pending', 'Pending Dataset'),
        ('downloading', 'Downloading from Kaggle'),
        ('preprocessing', 'Preprocessing Clinical Data'),
        ('training', 'Deep Learning Active'),
        ('completed', 'Training Successful'),
        ('failed', 'Training Failed'),
    )

    DATASET_CHOICES = (
        ('kaggle', 'Kaggle Dataset'),
        ('local', 'Local Upload'),
    )

    name = models.CharField(max_length=100, default="Neuro-Training Run")
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')
    dataset_type = models.CharField(max_length=10, choices=DATASET_CHOICES, default='kaggle')
    dataset_source = models.CharField(max_length=512, default="Kaggle: amananandrai/complete-eeg-dataset")
    
    # Progress Metrics
    progress_percentage = models.FloatField(default=0.0)
    current_loss = models.FloatField(null=True, blank=True)
    current_accuracy = models.FloatField(null=True, blank=True)
    
    # Final Metrics
    final_accuracy = models.FloatField(null=True, blank=True)
    model_path = models.CharField(max_length=255, null=True, blank=True)
    
    started_at = models.DateTimeField(auto_now_add=True)
    completed_at = models.DateTimeField(null=True, blank=True)
    logs = models.TextField(null=True, blank=True)

    class Meta:
        ordering = ['-started_at']

    def __str__(self):
        return f"{self.name} - {self.status}"

class NeuralModelState(models.Model):
    version = models.CharField(max_length=20, unique=True)
    accuracy = models.FloatField()
    is_active = models.BooleanField(default=False)
    weights_file = models.FileField(upload_to='models/weights/', null=True, blank=True)
    last_updated = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Neural Model {self.version} ({self.accuracy * 100:.2f}%)"
