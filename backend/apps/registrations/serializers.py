from django.db import IntegrityError, transaction
from rest_framework import serializers

from .models import Registration
from .validators import (
    validate_forum_direction,
    validate_person_name,
    validate_phone,
    validate_plain_text,
    validate_vk_url,
)


class RegistrationCreateSerializer(serializers.ModelSerializer):
    website = serializers.CharField(required=False, allow_blank=True, write_only=True, max_length=120)
    vk_url = serializers.CharField(required=True, allow_blank=False, max_length=255, trim_whitespace=True)
    company = serializers.CharField(required=False, allow_blank=True, write_only=True, max_length=180)
    email = serializers.EmailField(required=False, allow_blank=True, write_only=True, max_length=254)
    forum_direction_label = serializers.CharField(required=False, allow_blank=True, max_length=120)

    class Meta:
        model = Registration
        fields = [
            'id',
            'first_name',
            'last_name',
            'patronymic',
            'organization',
            'study_or_position',
            'phone',
            'vk_url',
            'forum_direction',
            'forum_direction_label',
            'info_consent',
            'personal_data_consent',
            'company',
            'email',
            'website',
        ]
        read_only_fields = ['id']
        extra_kwargs = {
            'first_name': {'max_length': 80, 'trim_whitespace': True},
            'last_name': {'max_length': 80, 'trim_whitespace': True},
            'patronymic': {'max_length': 80, 'trim_whitespace': True, 'required': False, 'allow_blank': True},
            'organization': {'max_length': 180, 'trim_whitespace': True},
            'study_or_position': {'max_length': 180, 'trim_whitespace': True},
            'phone': {'max_length': 32, 'trim_whitespace': True},
            'vk_url': {'max_length': 255, 'trim_whitespace': True},
        }

    def validate(self, attrs):
        if attrs.pop('website', ''):
            raise serializers.ValidationError({'detail': 'Заявку не удалось принять. Попробуйте позже.'})

        if not attrs.get('info_consent'):
            raise serializers.ValidationError({'info_consent': 'Необходимо согласие на получение информационных сообщений.'})

        if not attrs.get('personal_data_consent'):
            raise serializers.ValidationError({'personal_data_consent': 'Необходимо согласие на обработку персональных данных.'})

        attrs['first_name'] = validate_person_name(attrs.get('first_name', ''), 'Имя')
        attrs['last_name'] = validate_person_name(attrs.get('last_name', ''), 'Фамилия')

        patronymic = attrs.get('patronymic', '')
        if patronymic:
            attrs['patronymic'] = validate_person_name(patronymic, 'Отчество')
        else:
            attrs['patronymic'] = ''

        organization = attrs.get('organization') or attrs.pop('company', '')
        attrs['organization'] = validate_plain_text(
            organization,
            'Учебное заведение / организация',
            min_length=2,
            max_length=180,
        )
        attrs['company'] = attrs['organization']
        attrs['study_or_position'] = validate_plain_text(
            attrs.get('study_or_position', ''),
            'Направление обучения / должность',
            min_length=2,
            max_length=180,
        )
        attrs['phone'] = validate_phone(attrs.get('phone', ''))
        attrs['vk_url'] = validate_vk_url(attrs.get('vk_url', ''))

        forum_direction, forum_direction_label = validate_forum_direction(attrs.get('forum_direction', ''))
        attrs['forum_direction'] = forum_direction
        attrs['forum_direction_label'] = forum_direction_label

        email = attrs.get('email') or None
        if email:
            attrs['email'] = email.strip().lower()
            if Registration.objects.filter(email__iexact=attrs['email']).exists():
                raise serializers.ValidationError({'email': 'Заявка с этой электронной почтой уже зарегистрирована.'})
        else:
            attrs['email'] = None

        if Registration.objects.filter(vk_url__iexact=attrs['vk_url']).exists():
            raise serializers.ValidationError({'vk_url': 'Заявка с этой ссылкой ВКонтакте уже зарегистрирована.'})

        return attrs

    def create(self, validated_data):
        try:
            with transaction.atomic():
                return Registration.objects.create(**validated_data)
        except IntegrityError as exc:
            raise serializers.ValidationError({'detail': 'Заявка с такими данными уже зарегистрирована.'}) from exc
