from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import AITrainingSession, NeuralModelState
from .serializers import AITrainingSessionSerializer, NeuralModelStateSerializer
from .trainer import TrainingService

class AITrainingViewSet(viewsets.ModelViewSet):
    queryset = AITrainingSession.objects.all()
    serializer_class = AITrainingSessionSerializer

    @action(detail=False, methods=['post'])
    def start_training(self, request):
        name = request.data.get('name', 'Neuro-Training Run')
        session = AITrainingSession.objects.create(name=name)
        TrainingService.start_training_run(session.id)
        return Response(AITrainingSessionSerializer(session).data, status=status.HTTP_201_CREATED)

class NeuralModelStateViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = NeuralModelState.objects.all()
    serializer_class = NeuralModelStateSerializer

    @action(detail=False, methods=['get'])
    def active(self, request):
        active_model = NeuralModelState.objects.filter(is_active=True).first()
        if active_model:
            return Response(NeuralModelStateSerializer(active_model).data)
        return Response({"error": "No active model found"}, status=status.HTTP_404_NOT_FOUND)
