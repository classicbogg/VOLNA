import re

from django.core.exceptions import ValidationError
from django.utils.html import strip_tags

NAME_RE = re.compile(r"^[A-Za-zА-Яа-яЁё\-\s']+$")
PHONE_RE = re.compile(r'^\+?[0-9\s()\-]{7,32}$')
CONTROL_CHARS_RE = re.compile(r'[\x00-\x08\x0b\x0c\x0e-\x1f\x7f]')


def normalize_spaces(value: str) -> str:
    return re.sub(r'\s+', ' ', value or '').strip()


def reject_control_chars(value: str, field_name: str = 'Поле') -> None:
    if CONTROL_CHARS_RE.search(value or ''):
        raise ValidationError(f'{field_name} содержит недопустимые служебные символы.')


def reject_html(value: str, field_name: str = 'Поле') -> None:
    if value and strip_tags(value) != value:
        raise ValidationError(f'{field_name} не должно содержать HTML-разметку.')


def validate_person_name(value: str, field_name: str) -> str:
    normalized = normalize_spaces(value)
    reject_control_chars(normalized, field_name)
    reject_html(normalized, field_name)
    if not NAME_RE.match(normalized):
        raise ValidationError(f'{field_name} может содержать только буквы, пробел, дефис и апостроф.')
    return normalized


def validate_company(value: str) -> str:
    normalized = normalize_spaces(value)
    reject_control_chars(normalized, 'Компания / учебное заведение')
    reject_html(normalized, 'Компания / учебное заведение')
    if len(normalized) < 2:
        raise ValidationError('Укажите компанию или учебное заведение.')
    return normalized


def validate_phone(value: str) -> str:
    normalized = normalize_spaces(value)
    reject_control_chars(normalized, 'Телефон')
    reject_html(normalized, 'Телефон')
    if not PHONE_RE.match(normalized):
        raise ValidationError('Укажите корректный номер телефона.')
    return normalized
