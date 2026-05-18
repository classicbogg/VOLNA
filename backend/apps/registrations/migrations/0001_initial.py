from django.db import migrations, models


class Migration(migrations.Migration):
    initial = True

    dependencies = []

    operations = [
        migrations.CreateModel(
            name='Registration',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('first_name', models.CharField(max_length=80, verbose_name='имя')),
                ('last_name', models.CharField(max_length=80, verbose_name='фамилия')),
                ('patronymic', models.CharField(blank=True, max_length=80, verbose_name='отчество')),
                ('company', models.CharField(max_length=180, verbose_name='компания / учебное заведение')),
                ('phone', models.CharField(max_length=32, verbose_name='телефон')),
                ('email', models.EmailField(max_length=254, unique=True, verbose_name='электронная почта')),
                ('info_consent', models.BooleanField(default=False, verbose_name='согласие на информационные сообщения')),
                ('personal_data_consent', models.BooleanField(default=False, verbose_name='согласие на обработку персональных данных')),
                ('created_at', models.DateTimeField(auto_now_add=True, verbose_name='создано')),
                ('updated_at', models.DateTimeField(auto_now=True, verbose_name='обновлено')),
            ],
            options={
                'verbose_name': 'регистрация',
                'verbose_name_plural': 'регистрации',
                'ordering': ['-created_at'],
            },
        ),
        migrations.AddIndex(
            model_name='registration',
            index=models.Index(fields=['created_at'], name='registratio_created_a226d9_idx'),
        ),
        migrations.AddIndex(
            model_name='registration',
            index=models.Index(fields=['email'], name='registratio_email_2d2215_idx'),
        ),
    ]
