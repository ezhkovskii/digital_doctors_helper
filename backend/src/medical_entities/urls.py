from django.urls import include, path

from medical_entities.routers import router

urlpatterns = [
    path("v1/", include(router.urls)),
]
