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
        dataset_type = request.data.get('dataset_type', 'kaggle')
        dataset_source = request.data.get('dataset_source', 'Kaggle: amananandrai/complete-eeg-dataset')
        
        session = AITrainingSession.objects.create(
            name=name, 
            dataset_type=dataset_type,
            dataset_source=dataset_source
        )
        TrainingService.start_training_run(session.id)
        return Response(AITrainingSessionSerializer(session).data, status=status.HTTP_201_CREATED)

    @action(detail=False, methods=['post'])
    def upload_dataset(self, request):
        import zipfile
        import os
        from django.conf import settings
        
        file_obj = request.FILES.get('file')
        if not file_obj:
            return Response({"error": "No file uploaded"}, status=status.HTTP_400_BAD_PRODUCT)

        if not file_obj.name.endswith('.zip'):
            return Response({"error": "Only ZIP files are supported"}, status=status.HTTP_400_BAD_PRODUCT)

        # 1. Save and unzip
        dataset_name = os.path.splitext(file_obj.name)[0]
        extract_path = os.path.join(settings.BASE_DIR, 'datasets', dataset_name)
        os.makedirs(extract_path, exist_ok=True)
        
        try:
            with zipfile.ZipFile(file_obj, 'r') as zip_ref:
                zip_ref.extractall(extract_path)
            
            # 2. Create a session for this manual dataset
            session = AITrainingSession.objects.create(
                name=f"Training: {dataset_name}",
                dataset_type='local',
                dataset_source=dataset_name,
                logs=f"Dataset '{file_obj.name}' uploaded and extracted to {extract_path}\n"
            )
            
            return Response(AITrainingSessionSerializer(session).data, status=status.HTTP_201_CREATED)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class NeuralModelStateViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = NeuralModelState.objects.all()
    serializer_class = NeuralModelStateSerializer

    @action(detail=False, methods=['get'])
    def active(self, request):
        active_model = NeuralModelState.objects.filter(is_active=True).first()
        if active_model:
            return Response(NeuralModelStateSerializer(active_model).data)
        return Response({"error": "No active model found"}, status=status.HTTP_404_NOT_FOUND)
