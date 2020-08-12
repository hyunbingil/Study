from django.db import models
from django.utils import timezone

# Create your models here.

class Test(models.Model):
    title = models.TextField()

    created = models.DateTimeField( default = timezone.now )

    def __str__(self):
        return self.title