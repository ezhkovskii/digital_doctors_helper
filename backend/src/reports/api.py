import django_filters
from django_filters import rest_framework as filters
from rest_framework import viewsets
from reports.models import Report
from reports.serializers import ReportSerializer


class ReportFilter(django_filters.FilterSet):
    class Meta:
        model = Report
        fields = ("name",)


class ReportViewSet(viewsets.ModelViewSet):
    serializer_class = ReportSerializer
    filterset_class = ReportFilter
    filter_backends = (filters.DjangoFilterBackend,)

    def get_queryset(self):
        user = self.request.user
        return Report.objects.select_related("user").filter(user=user.id)
