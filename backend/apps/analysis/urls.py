from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import EEGAnalysisViewSet

router = DefaultRouter()
router.register('records', EEGAnalysisViewSet, basename='analysis')

urlpatterns = [
    path('', include(router.urls)),
]
