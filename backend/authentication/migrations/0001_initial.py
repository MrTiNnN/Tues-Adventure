# Generated by Django 5.0.4 on 2024-05-29 14:34

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='User',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('email', models.EmailField(max_length=200)),
                ('firstName', models.CharField(max_length=200)),
                ('lastName', models.CharField(max_length=200)),
                ('grade', models.IntegerField()),
                ('className', models.CharField(max_length=1)),
                ('password', models.CharField(max_length=200, unique=True)),
            ],
        ),
    ]
