from celery import shared_task

from reports.file_data_parser import FileDataParser


@shared_task()
def parse_file_data(file_path: str, report_id: int):
    file_data_parser = FileDataParser(file_path, report_id)
    file_data_parser.run()


@shared_task()
def data_analysis(report_id: int):
    pass
