from rest_framework import viewsets
from medical_entities.models import Diagnosis, MedicalAppointments, Patient, Doctor
from medical_entities.serializers import MedicalAppointmentsSerializer, DiagnosisSerializer, \
    DoctorSerializer, PatientSerializer


class DiagnosisViewSet(viewsets.ModelViewSet):
    serializer_class = DiagnosisSerializer
    queryset = Diagnosis.objects.all()


class MedicalAppointmentsViewSet(viewsets.ModelViewSet):
    serializer_class = MedicalAppointmentsSerializer
    queryset = MedicalAppointments.objects.all()


class DoctorViewSet(viewsets.ModelViewSet):
    serializer_class = DoctorSerializer
    queryset = Doctor.objects.all()


class PatientViewSet(viewsets.ModelViewSet):
    serializer_class = PatientSerializer
    queryset = Patient.objects.all()
