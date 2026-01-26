from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from ...serializers import EEGFileSerializer
from ...services.ai_service import AIService

class UploadAPIView(APIView):
    """
    Endpoint for uploading and immediately analyzing EEG data.
    """
    def post(self, request, *args, **kwargs):
        serializer = EEGFileSerializer(data=request.data)
        if serializer.is_valid():
            eeg_instance = serializer.save(user=request.user if request.user.is_authenticated else None)
            
            # Trigger AI Inference
            # In a real app, this should be an async Celery task
            results = AIService.run_inference(eeg_instance.file.path)
            
            # Update model instance with results
            eeg_instance.status = results['status']
            eeg_instance.seizure_probability = results['probability']
            eeg_instance.summary = results['summary']
            eeg_instance.save()
            
            return Response({
                "id": eeg_instance.id,
                "filename": eeg_instance.file.name,
                "analysis": results
            }, status=status.HTTP_201_CREATED)
            
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
