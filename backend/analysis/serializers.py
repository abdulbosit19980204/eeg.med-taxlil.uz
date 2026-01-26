from rest_framework import serializers
from .models import EEGFile

class EEGFileSerializer(serializers.ModelSerializer):
    class Meta:
        model = EEGFile
        fields = ['id', 'file', 'uploaded_at']
