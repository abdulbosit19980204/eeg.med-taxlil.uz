from django.contrib import admin
from .models import AITrainingSession, NeuralModelState

@admin.register(AITrainingSession)
class AITrainingSessionAdmin(admin.ModelAdmin):
    list_display = ('name', 'status', 'progress_percentage', 'current_accuracy', 'started_at')
    list_filter = ('status', 'started_at')
    search_fields = ('name',)

@admin.register(NeuralModelState)
class NeuralModelStateAdmin(admin.ModelAdmin):
    list_display = ('version', 'accuracy', 'is_active', 'last_updated')
    list_filter = ('is_active',)
