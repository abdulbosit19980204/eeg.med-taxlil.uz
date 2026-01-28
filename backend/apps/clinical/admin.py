from django.contrib import admin
from .models import Patient, MedicalRecord

@admin.register(Patient)
class PatientAdmin(admin.ModelAdmin):
    list_display = ('fullname', 'doctor', 'gender', 'created_at')
    list_filter = ('gender', 'created_at')
    search_fields = ('fullname', 'phone')

@admin.register(MedicalRecord)
class MedicalRecordAdmin(admin.ModelAdmin):
    list_display = ('patient', 'date')
    list_filter = ('date',)
    search_fields = ('patient__fullname', 'symptoms')
