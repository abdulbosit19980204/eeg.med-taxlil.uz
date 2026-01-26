from django.urls import path
from .endpoints.upload import UploadAPIView
from .endpoints.stats import TrainingStatsAPIView

urlpatterns = [
    path('upload/', UploadAPIView.as_view(), name='v1-upload'),
    path('training-stats/', TrainingStatsAPIView.as_view(), name='v1-training-stats'),
]
