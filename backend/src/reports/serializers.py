from rest_framework import serializers

from reports.models import Report


class ReportSerializer(serializers.ModelSerializer):
    user = serializers.HiddenField(default=serializers.CurrentUserDefault())

    class Meta:
        model = Report
        fields = "__all__"
