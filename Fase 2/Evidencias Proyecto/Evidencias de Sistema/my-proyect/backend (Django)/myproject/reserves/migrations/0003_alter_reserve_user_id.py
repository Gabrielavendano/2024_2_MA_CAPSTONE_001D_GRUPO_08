# Generated by Django 5.0.9 on 2024-11-03 21:24

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('reserves', '0002_reserve_user_id_alter_reserve_pet_type'),
    ]

    operations = [
        migrations.AlterField(
            model_name='reserve',
            name='user_id',
            field=models.IntegerField(),
        ),
    ]