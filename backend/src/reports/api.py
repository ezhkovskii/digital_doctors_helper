import django_filters
from django_filters import rest_framework as filters
from rest_framework import viewsets, status
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.response import Response

from reports.file_data_parser import FileDataParser
from reports.models import Report
from reports.serializers import ReportSerializer
from reports.tasks import parse_file_data, data_analysis


class ReportFilter(django_filters.FilterSet):
    class Meta:
        model = Report
        fields = ("name",)


class ReportViewSet(viewsets.ModelViewSet):
    serializer_class = ReportSerializer
    filterset_class = ReportFilter
    filter_backends = (filters.DjangoFilterBackend,)
    parser_classes = (FormParser, MultiPartParser)

    def get_queryset(self):
        user = self.request.user
        return Report.objects.select_related("user").filter(user=user.id)

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)

        parse_file_data.delay(serializer.instance.file.name, serializer.instance.id)
        data_analysis.delay(serializer.instance.id)

        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)
