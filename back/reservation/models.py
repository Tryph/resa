from django.contrib.auth.models import User
from django.db import models


class Reservation(models.Model):
    start = models.DateTimeField(unique=True, null=False)
    end = models.DateTimeField(unique=True, null=False)
    owner = models.ForeignKey(User, null=False)
    title = models.TextField(max_length=200, null=True)

    def __str__(self):
        return self.title