from rest_framework import serializers

from medical_entities.models import MedicalAppointments, Diagnosis, Doctor, Patient


class DiagnosisSerializer(serializers.ModelSerializer):

    class Meta:
        model = Diagnosis
        fields = "__all__"


class MedicalAppointmentsSerializer(serializers.ModelSerializer):

    class Meta:
        model = MedicalAppointments
        fields = "__all__"


class DoctorSerializer(serializers.ModelSerializer):

    class Meta:
        model = Doctor
        fields = "__all__"


class PatientSerializer(serializers.ModelSerializer):

    class Meta:
        model = Patient
        fields = "__all__"
