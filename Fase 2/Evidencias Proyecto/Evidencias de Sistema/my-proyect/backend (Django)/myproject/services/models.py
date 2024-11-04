from django.db import models
    

class Service(models.Model):
    id= models.AutoField(primary_key=True)
    name = models.CharField(max_length=100)
    info = models.CharField(max_length=1000)
    image = models.CharField(max_length=30)
    price = models.IntegerField()