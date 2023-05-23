from django.db import models
from django.utils import timezone


class BaseModel(models.Model):
    created_at = models.DateTimeField(db_index=True, default=timezone.now)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True


class Sex(models.TextChoices):
    FEMALE = 'F', 'Female'
    MALE = 'M', 'Male'
