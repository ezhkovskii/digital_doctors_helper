from rest_framework import serializers

from medical_entities.models import MedicalAppointments, Diagnosis


class DiagnosisSerializer(serializers.ModelSerializer):

    class Meta:
        model = Diagnosis
        fields = "__all__"


class MedicalAppointmentsSerializer(serializers.ModelSerializer):

    class Meta:
        model = MedicalAppointments
        fields = "__all__"
