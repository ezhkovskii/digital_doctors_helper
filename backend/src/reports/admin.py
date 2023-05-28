from django.contrib import admin

from reports.models import Report, FileData, Analysis


@admin.register(Report)
class ReportAdmin(admin.ModelAdmin):
    list_display = ("name", "file", "user", "created_at")


@admin.register(FileData)
class FileDataAdmin(admin.ModelAdmin):
    pass


@admin.register(Analysis)
class AnalysisAdmin(admin.ModelAdmin):
    pass