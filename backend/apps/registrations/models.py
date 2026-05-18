from django.db import models
from django.utils.translation import gettext_lazy as _


class Registration(models.Model):
    first_name = models.CharField(_('имя'), max_length=80)
    last_name = models.CharField(_('фамилия'), max_length=80)
    patronymic = models.CharField(_('отчество'), max_length=80, blank=True)
    company = models.CharField(_('компания / учебное заведение'), max_length=180)
    phone = models.CharField(_('телефон'), max_length=32)
    email = models.EmailField(_('электронная почта'), max_length=254, unique=True)
    info_consent = models.BooleanField(_('согласие на информационные сообщения'), default=False)
    personal_data_consent = models.BooleanField(_('согласие на обработку персональных данных'), default=False)
    created_at = models.DateTimeField(_('создано'), auto_now_add=True)
    updated_at = models.DateTimeField(_('обновлено'), auto_now=True)

    class Meta:
        verbose_name = _('регистрация')
        verbose_name_plural = _('регистрации')
        ordering = ['-created_at']
        indexes = [
            models.Index(fields=['created_at']),
            models.Index(fields=['email']),
        ]

    def __str__(self) -> str:
        return f'{self.last_name} {self.first_name} — {self.email}'

    @property
    def full_name(self) -> str:
        parts = [self.last_name, self.first_name, self.patronymic]
        return ' '.join(part for part in parts if part).strip()
