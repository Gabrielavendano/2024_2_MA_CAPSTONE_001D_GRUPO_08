from django.db import models
    

class Reserve(models.Model):
    id= models.AutoField(primary_key=True)
    user_id = models.IntegerField()
    services = models.JSONField(models.IntegerField(), blank=True, default=list) 
    init_date = models.DateField()
    end_date = models.DateField()
    pet_name = models.CharField(max_length=100)
    pet_type = models.CharField(max_length=100)
    pet_breed = models.CharField(max_length=100)
    total = models.IntegerField()
