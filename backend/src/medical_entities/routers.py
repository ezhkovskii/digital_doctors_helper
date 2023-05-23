from rest_framework import routers

from medical_entities.api import DiagnosisViewSet, MedicalAppointmentsViewSet

router = routers.DefaultRouter()
router.register("diagnosis", DiagnosisViewSet, basename="diagnosis")
router.register("medical_appointments", MedicalAppointmentsViewSet, basename="medical_appointments")

