from rest_framework import routers

from reports.api import ReportViewSet

router = routers.DefaultRouter()
router.register("reports", ReportViewSet, basename="reports")
