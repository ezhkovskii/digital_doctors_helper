from django.db import models

from common.models import BaseModel, Sex


class Doctor(BaseModel):
    """Будет добавлять врачей при парсинге протоколов, пока необязательно"""
    position = models.CharField(max_length=500, verbose_name='Должность врача')
    external_id = models.CharField(max_length=10, verbose_name='Внешний идентификатор врача')
    name = models.CharField(max_length=500, verbose_name='ФИО', blank=True)

    def __str__(self):
        return f"{self.external_id}_{self.name}"

    class Meta:
        verbose_name = 'Врач'
        verbose_name_plural = 'Врачи'


class Patient(BaseModel):
    """Будем добавлять пациентов при парсинге протоколов, пока необязательно"""
    external_id = models.CharField(max_length=10, verbose_name='Внешний идентификатор пациента')
    sex = models.CharField(max_length=1, choices=Sex.choices)
    birthday = models.DateField(verbose_name='Дата рождения пациента')
    name = models.CharField(max_length=500, verbose_name='ФИО', blank=True)

    def __str__(self):
        return f"{self.external_id}_{self.name}"

    class Meta:
        verbose_name = 'Пациент'
        verbose_name_plural = 'Пациенты'


class Diagnosis(BaseModel):
    code = models.CharField(max_length=5, verbose_name='Код диагноза', unique=True)
    name = models.CharField(max_length=500, verbose_name='Название', blank=True)

    def __str__(self):
        return self.code

    class Meta:
        verbose_name = 'Диагноз'
        verbose_name_plural = 'Диагнозы'


class MedicalAppointments(BaseModel):
    name = models.CharField(max_length=500, verbose_name='Название')
    synonyms = models.JSONField(verbose_name='Похожие выражения', default=list)
    service_code = models.CharField(max_length=20, blank=True, verbose_name='Код услуги')
    required = models.BooleanField(verbose_name='Необходимость')
    diagnoses = models.ManyToManyField(Diagnosis)

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = 'Назначение'
        verbose_name_plural = 'Назначения'
