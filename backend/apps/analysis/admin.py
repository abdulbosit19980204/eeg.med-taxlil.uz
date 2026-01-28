from django.contrib import admin
from .models import EEGAnalysis, SpectralResult

@admin.register(EEGAnalysis)
class EEGAnalysisAdmin(admin.ModelAdmin):
    list_display = ('id', 'patient', 'status', 'seizure_probability', 'created_at')
    list_filter = ('status', 'created_at')
    search_fields = ('patient__fullname', 'ai_summary')
    readonly_fields = ('created_at', 'completed_at')

@admin.register(SpectralResult)
class SpectralResultAdmin(admin.ModelAdmin):
    list_display = ('analysis', 'alpha_power', 'beta_power', 'theta_power', 'delta_power')
