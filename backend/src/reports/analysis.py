from reports.models import Report, FileData, Analysis as AnalysisModel
from medical_entities.models import MedicalAppointments
from thefuzz import process

import logging

logger = logging.getLogger(__name__)

SIMILARITY_LEVEL = 90


class Analysis:
    def __init__(self, report: Report):
        self.report = report

    def process_medical_appointments(self, medical_appointments_from_file_raw: str):
        ma_list = list(filter(bool, medical_appointments_from_file_raw.splitlines()))
        ma_list_temp = []
        for appointment in ma_list:
            ma_list_temp += appointment.split(";")
        ma_list = ma_list_temp
        ma_list = [appointment.strip() for appointment in ma_list]

        return ma_list
        
    def run(self):
        file_data = FileData.objects.filter(report__id=self.report.id)
        for row in file_data:
            ma_std_set = MedicalAppointments.objects.filter(diagnoses__code__in=[row.diagnosis_code]).order_by('-required')
            ma_from_file_raw = row.medical_appointments
            ma_from_file = self.process_medical_appointments(ma_from_file_raw)

            if not ma_std_set:
                # Если для диагноза, указанного в протоколе осмотра, не разработан
                # стандарт оказания медицинской помощи, то такие протоколы должны быть
                # исключены из анализа;
                continue

            count_item_in_std_and_required = 0
            count_item_in_std_and_not_required = 0
            count_item_not_in_std = 0
            data = {
                "appointments": []
            }
            for item_ma_from_file in ma_from_file:
                item = {
                    "appointment_file_name": item_ma_from_file,
                    "appointment_file_in_std": False,
                    "appointment_std_id": None
                }
                for ma in ma_std_set:
                    ma_std_for_compare = (ma.name, *ma.synonyms)
                    item_in_std = process.extractOne(item_ma_from_file, ma_std_for_compare)
                    if item_in_std and item_in_std[1] > SIMILARITY_LEVEL:
                        item["appointment_file_in_std"] = True
                        item["appointment_std_id"] = ma.id

                        if ma.required:
                            count_item_in_std_and_required += 1
                        else:
                            count_item_in_std_and_not_required += 1
                        break
                else:
                    count_item_not_in_std += 1

                data["appointments"].append(item)

            len_ma_std_set = len(ma_std_set)
            correct_percent = (count_item_in_std_and_required / len_ma_std_set) * 100 if len_ma_std_set != 0 else 0

            # Группировка по строкам из файла
            data["count_item_in_std_and_required"] = count_item_in_std_and_required
            data["count_item_in_std_and_not_required"] = count_item_in_std_and_not_required
            data["count_item_not_in_std"] = count_item_not_in_std
            data["correct_percent"] = round(correct_percent)

            am = AnalysisModel.objects.create(data=data, report=self.report, file_data=row)
            logger.info(f"{am} {data}")




