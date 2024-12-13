# Generated by Django 5.0.9 on 2024-12-04 01:41

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Reserve',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('services', models.JSONField(blank=True, default=list, verbose_name=models.IntegerField())),
                ('init_date', models.DateField()),
                ('end_date', models.DateField()),
                ('pet_name', models.CharField(max_length=100)),
                ('pet_type', models.CharField(max_length=100)),
                ('pet_breed', models.CharField(max_length=100)),
                ('total', models.IntegerField()),
                ('email', models.EmailField(blank=True, max_length=254, null=True)),
                ('user', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
