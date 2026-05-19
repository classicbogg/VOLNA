from django.db import models
from django.utils.translation import gettext_lazy as _


class Registration(models.Model):
    class ForumDirection(models.TextChoices):
        TECH = 'tech', _('Технологии и инновации')
        SOCIAL = 'social', _('Социальный бизнес')
        BUSINESS = 'business', _('Малый бизнес')
        WELLNESS = 'wellness', _('Красота и здоровье')
        FASHION = 'fashion', _('Мода')
        CRAFT = 'craft', _('Мастера')
        MEDIA = 'media', _('Медиа')
        SVO = 'svo', _('СВОя волна (секция для участников СВО)')

    first_name = models.CharField(_('имя'), max_length=80)
    last_name = models.CharField(_('фамилия'), max_length=80)
    patronymic = models.CharField(_('отчество'), max_length=80, blank=True)
    organization = models.CharField(_('учебное заведение / организация'), max_length=180, blank=True, default='')
    study_or_position = models.CharField(_('направление обучения / должность'), max_length=180, blank=True, default='')
    phone = models.CharField(_('телефон'), max_length=32)
    vk_url = models.URLField(_('ссылка ВКонтакте'), max_length=255, blank=True, default='')
    forum_direction = models.CharField(_('направление форума'), max_length=40, choices=ForumDirection.choices, blank=True, default='')
    forum_direction_label = models.CharField(_('название направления форума'), max_length=120, blank=True, default='')
    company = models.CharField(_('компания / учебное заведение, старое поле'), max_length=180, blank=True)
    email = models.EmailField(_('электронная почта, старое поле'), max_length=254, unique=True, blank=True, null=True)
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
            models.Index(fields=['vk_url']),
            models.Index(fields=['forum_direction']),
        ]

    def __str__(self) -> str:
        return f'{self.last_name} {self.first_name} — {self.vk_url or self.phone}'

    @property
    def full_name(self) -> str:
        parts = [self.last_name, self.first_name, self.patronymic]
        return ' '.join(part for part in parts if part).strip()
