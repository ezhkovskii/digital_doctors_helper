from rest_framework import serializers

from reports.models import Report, Analysis, FileData


class ReportSerializer(serializers.ModelSerializer):
    user = serializers.HiddenField(default=serializers.CurrentUserDefault())

    class Meta:
        model = Report
        exclude = ("created_at", "updated_at")


class FileDataSerializer(serializers.ModelSerializer):

    class Meta:
        model = FileData
        exclude = ("report",)


class AnalysisSerializer(serializers.ModelSerializer):
    report = ReportSerializer(read_only=True)
    file_data = FileDataSerializer(read_only=True)

    class Meta:
        model = Analysis
        fields = "__all__"
