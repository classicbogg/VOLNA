from django.db import IntegrityError, transaction
from rest_framework import serializers

from .models import Registration
from .validators import validate_company, validate_person_name, validate_phone


class RegistrationCreateSerializer(serializers.ModelSerializer):
    website = serializers.CharField(required=False, allow_blank=True, write_only=True, max_length=120)

    class Meta:
        model = Registration
        fields = [
            'id',
            'first_name',
            'last_name',
            'patronymic',
            'company',
            'phone',
            'email',
            'info_consent',
            'personal_data_consent',
            'website',
        ]
        read_only_fields = ['id']
        extra_kwargs = {
            'first_name': {'max_length': 80, 'trim_whitespace': True},
            'last_name': {'max_length': 80, 'trim_whitespace': True},
            'patronymic': {'max_length': 80, 'trim_whitespace': True, 'required': False, 'allow_blank': True},
            'company': {'max_length': 180, 'trim_whitespace': True},
            'phone': {'max_length': 32, 'trim_whitespace': True},
            'email': {'max_length': 254, 'trim_whitespace': True},
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

        attrs['company'] = validate_company(attrs.get('company', ''))
        attrs['phone'] = validate_phone(attrs.get('phone', ''))
        attrs['email'] = attrs.get('email', '').strip().lower()

        if Registration.objects.filter(email__iexact=attrs['email']).exists():
            raise serializers.ValidationError({'email': 'Заявка с этой электронной почтой уже зарегистрирована.'})

        return attrs

    def create(self, validated_data):
        try:
            with transaction.atomic():
                return Registration.objects.create(**validated_data)
        except IntegrityError as exc:
            raise serializers.ValidationError({'email': 'Заявка с этой электронной почтой уже зарегистрирована.'}) from exc
