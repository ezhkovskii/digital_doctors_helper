import django_filters
from django_filters import rest_framework as filters
from drf_yasg import openapi
from drf_yasg.utils import swagger_auto_schema
from rest_framework import viewsets, status
from rest_framework.generics import GenericAPIView
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.response import Response

from reports.full_report import get_full_report
from reports.models import Report, Analysis
from reports.serializers import ReportSerializer
from reports.tasks import parse_and_analysis_file_data

full = openapi.Parameter('full', openapi.IN_QUERY, description="Полный отчет", type=openapi.TYPE_BOOLEAN)


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

        # parse_and_analysis_file_data.delay(serializer.instance.file.name, serializer.instance.id)
        parse_and_analysis_file_data.delay(serializer.instance.file.name, serializer.instance.id)

        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

    @swagger_auto_schema(manual_parameters=[full])
    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        if request.query_params.get('full'):
            data = get_full_report(instance)
            return Response(data)

        serializer = self.get_serializer(instance)
        return Response(serializer.data)
