from django.contrib import admin

from reports.models import Report, FileData


@admin.register(Report)
class ReportAdmin(admin.ModelAdmin):
    list_display = ("name", "file", "user", "created_at")


@admin.register(FileData)
class FileData(admin.ModelAdmin):
    pass