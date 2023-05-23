from django.urls import include, path

from reports.routers import router

urlpatterns = [
    path("v1/", include(router.urls)),
]
