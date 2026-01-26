from rest_framework.views import APIView
from rest_framework.response import Response
from ....services.ai_service import AIService

class TrainingStatsAPIView(APIView):
    """
    Returns the latest metrics for the AI training laboratory.
    """
    def get(self, request):
        stats = AIService.get_training_stats()
        return Response(stats)
