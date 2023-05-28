from celery import shared_task

from reports.analysis import Analysis
from reports.file_data_parser import FileDataParser
from reports.models import Report


@shared_task()
def parse_and_analysis_file_data(file_path: str, report_id: int):
    report = Report.objects.get(pk=report_id)
    file_data_parser = FileDataParser(file_path, report)
    file_data_parser.run()

    analysis = Analysis(report)
    analysis.run()
