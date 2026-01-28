from rest_framework import serializers
from .models import AITrainingSession, NeuralModelState

class AITrainingSessionSerializer(serializers.ModelSerializer):
    class Meta:
        model = AITrainingSession
        fields = '__all__'

class NeuralModelStateSerializer(serializers.ModelSerializer):
    class Meta:
        model = NeuralModelState
        fields = '__all__'
