from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import AITrainingViewSet, NeuralModelStateViewSet

router = DefaultRouter()
router.register('sessions', AITrainingViewSet)
router.register('models', NeuralModelStateViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
