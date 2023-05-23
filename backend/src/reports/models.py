from django.contrib.auth.models import User
from django.db import models

from common.models import BaseModel, Sex


class Report(BaseModel):
    name = models.CharField(max_length=250, verbose_name='Название')
    file = models.FileField(verbose_name='Файл')
    user = models.ForeignKey(User, verbose_name='Пользователь', on_delete=models.PROTECT)

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = 'Отчет'
        verbose_name_plural = 'Отчеты'


class FileData(models.Model):
    sex = models.CharField(max_length=1, choices=Sex.choices)
    birthday = models.DateField(verbose_name='Дата рождения пациента')
    patient_external_id = models.CharField(max_length=10, verbose_name='Внешний идентификатор пациента')
    diagnosis_code = models.CharField(max_length=5, verbose_name='Код диагноза')
    diagnosis_name = models.CharField(max_length=500, verbose_name='Название диагноза')
    date_service = models.DateField(verbose_name='Дата оказания услуги')
    doctor_position = models.CharField(max_length=500, verbose_name='Должность врача')
    doctor_external_id = models.CharField(max_length=10, verbose_name='Внешний идентификатор врача')
    doctor_name = models.CharField(max_length=500, verbose_name='ФИО врача')
    medical_appointments = models.TextField(verbose_name='Назначения')
    report = models.ForeignKey(Report, verbose_name='Отчет', on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.report.name} {self.diagnosis_code}_{self.date_service}"

    class Meta:
        verbose_name = 'Данные файла'
        verbose_name_plural = 'Данные файлов'
