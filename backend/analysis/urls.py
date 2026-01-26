from django.urls import path, include

urlpatterns = [
    path('v1/', include('analysis.api.v1.urls')),
    path('upload/', include('analysis.api.v1.urls')), # Maintain legacy for a moment to avoid breakages
]
