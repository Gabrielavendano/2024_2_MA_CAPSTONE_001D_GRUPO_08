from django.db import models

class Contact(models.Model):
    id= models.AutoField(primary_key=True)
    name = models.CharField(max_length=100)
    mail = models.CharField(max_length=100)
    subject = models.CharField(max_length=100)
    message = models.CharField(max_length=100)