# Generated by Django 4.2.7 on 2023-11-28 16:37

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('backend_app', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Test',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('test', models.CharField(max_length=69, verbose_name='test')),
            ],
        ),
    ]