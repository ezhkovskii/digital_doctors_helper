import pathlib

from django.contrib.auth.models import User
from django.db import models

from common.models import BaseModel, Sex
from medical_entities.models import MedicalAppointments


def update_filename(instance, filename):
    """Создает новое название файла и определяет куда он будет загружен"""
    extension = pathlib.Path(filename).suffix
    filename_new = f"file_{instance.name}_{instance.created_at}{extension}"
    path = f"report_files/user_{instance.user.id}/{instance.created_at.date()}/{filename_new}"
    return path


class Report(BaseModel):
    name = models.CharField(max_length=250, verbose_name='Название')
    file = models.FileField(verbose_name='Файл', upload_to=update_filename)
    user = models.ForeignKey(User, verbose_name='Пользователь', on_delete=models.PROTECT)

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = 'Отчет'
        verbose_name_plural = 'Отчеты'


class FileData(models.Model):
    sex = models.CharField(max_length=1, choices=Sex.choices, verbose_name="Пол пациента")
    birthday = models.DateField(verbose_name='Дата рождения пациента')
    patient_external_id = models.CharField(max_length=10, verbose_name='Внешний идентификатор пациента')
    diagnosis_code = models.CharField(max_length=5, verbose_name='Код диагноза')
    diagnosis_name = models.CharField(max_length=500, verbose_name='Название диагноза')
    date_service = models.DateField(verbose_name='Дата оказания услуги')
    doctor_position = models.CharField(max_length=500, verbose_name='Должность врача')
    doctor_external_id = models.CharField(max_length=10, verbose_name='Внешний идентификатор врача')
    doctor_name = models.CharField(max_length=500, verbose_name='ФИО врача', blank=True)
    medical_appointments = models.TextField(verbose_name='Назначения')
    report = models.ForeignKey(Report, verbose_name='Отчет', on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.report.name} {self.diagnosis_code}_{self.date_service}"

    class Meta:
        verbose_name = 'Данные файла'
        verbose_name_plural = 'Данные файлов'


class Analysis(models.Model):
    report = models.ForeignKey(Report, verbose_name='Отчет', on_delete=models.CASCADE)
    file_data = models.ForeignKey(FileData, verbose_name='Данные файла', on_delete=models.CASCADE)
    data = models.JSONField(verbose_name='Данные анализа', default=dict)
    # appointment_file_name = models.CharField(max_length=500, verbose_name='Назначение', blank=True)
    # appointment_std_id = models.ForeignKey(MedicalAppointments, verbose_name="Стандартное назначение", on_delete=models.PROTECT, null=True)
    # appointment_file_in_std = models.BooleanField(verbose_name='Назначение в стандарте')
    # count_item_in_std_and_required = models.PositiveIntegerField(verbose_name="Количество назначений стандартных обязательных")
    # count_item_in_std_and_not_required = models.PositiveIntegerField(verbose_name="Количество назначений стандартных необязательных")
    # count_item_not_in_std = models.PositiveIntegerField(verbose_name="Количество назначений нестандартных")
    # correct_percent = models.PositiveSmallIntegerField(verbose_name="Процент корректности")

    def __str__(self):
        return f"{self.report.name} {self.file_data.diagnosis_code}_{self.file_data.date_service}"

    class Meta:
        verbose_name = 'Данные анализа'
        verbose_name_plural = 'Данные анализа'