from django.contrib import admin

from medical_entities.models import MedicalAppointments, Diagnosis, Doctor, Patient

@admin.register(MedicalAppointments)
class MedicalAppointmentsAdmin(admin.ModelAdmin):
    filter_horizontal = ("diagnoses",)
    list_display = ("name", "required", "service_code")

@admin.register(Diagnosis)
class DiagnosisAdmin(admin.ModelAdmin):
    pass

@admin.register(Doctor)
class DoctorAdmin(admin.ModelAdmin):
    pass

@admin.register(Patient)
class PatientAdmin(admin.ModelAdmin):
    pass