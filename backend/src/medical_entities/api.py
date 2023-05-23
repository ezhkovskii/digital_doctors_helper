from rest_framework import viewsets
from medical_entities.models import Diagnosis, MedicalAppointments
from medical_entities.serializers import MedicalAppointmentsSerializer, DiagnosisSerializer


class DiagnosisViewSet(viewsets.ModelViewSet):
    serializer_class = DiagnosisSerializer
    queryset = Diagnosis.objects.all()


class MedicalAppointmentsViewSet(viewsets.ModelViewSet):
    serializer_class = MedicalAppointmentsSerializer
    queryset = MedicalAppointments.objects.all()
