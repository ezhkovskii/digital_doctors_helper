from rest_framework import serializers

from reports.models import Report


class ReportSerializer(serializers.ModelSerializer):
    user = serializers.HiddenField(default=serializers.CurrentUserDefault())

    class Meta:
        model = Report
        exclude = ("created_at",)
