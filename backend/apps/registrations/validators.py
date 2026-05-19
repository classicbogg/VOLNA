import re
from urllib.parse import urlparse

from django.core.exceptions import ValidationError
from django.utils.html import strip_tags

NAME_RE = re.compile(r"^[A-Za-zА-Яа-яЁё\-\s']+$")
PHONE_RE = re.compile(r'^\+?[0-9\s()\-]{7,32}$')
CONTROL_CHARS_RE = re.compile(r'[\x00-\x08\x0b\x0c\x0e-\x1f\x7f]')
VK_RE = re.compile(r'^(?:https?://)?(?:www\.)?vk\.com/[A-Za-z0-9_.]{2,80}/?$', re.IGNORECASE)

FORUM_DIRECTIONS = {
    'tech': 'Технологии и инновации',
    'social': 'Социальный бизнес',
    'business': 'Малый бизнес',
    'wellness': 'Красота и здоровье',
    'fashion': 'Мода',
    'craft': 'Мастера',
    'media': 'Медиа',
    'svo': 'СВОя волна (секция для участников СВО)',
}


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


def validate_plain_text(value: str, field_name: str, min_length: int = 2, max_length: int | None = None) -> str:
    normalized = normalize_spaces(value)
    reject_control_chars(normalized, field_name)
    reject_html(normalized, field_name)
    if len(normalized) < min_length:
        raise ValidationError(f'Укажите поле «{field_name}».')
    if max_length is not None and len(normalized) > max_length:
        raise ValidationError(f'Поле «{field_name}» слишком длинное.')
    return normalized


def validate_company(value: str) -> str:
    return validate_plain_text(value, 'Компания / учебное заведение', min_length=2, max_length=180)


def validate_phone(value: str) -> str:
    normalized = normalize_spaces(value)
    reject_control_chars(normalized, 'Телефон')
    reject_html(normalized, 'Телефон')
    if not PHONE_RE.match(normalized):
        raise ValidationError('Укажите корректный номер телефона.')
    return normalized


def validate_vk_url(value: str) -> str:
    normalized = normalize_spaces(value)
    reject_control_chars(normalized, 'Ссылка ВКонтакте')
    reject_html(normalized, 'Ссылка ВКонтакте')

    if not VK_RE.match(normalized):
        raise ValidationError('Укажите корректную ссылку на профиль ВКонтакте.')

    if not normalized.lower().startswith(('http://', 'https://')):
        normalized = f'https://{normalized}'

    parsed = urlparse(normalized)
    host = parsed.netloc.lower()
    if host not in {'vk.com', 'www.vk.com'}:
        raise ValidationError('Ссылка должна вести на профиль ВКонтакте.')

    return normalized.rstrip('/')


def validate_forum_direction(value: str) -> tuple[str, str]:
    normalized = normalize_spaces(value).lower()
    reject_control_chars(normalized, 'Направление форума')
    reject_html(normalized, 'Направление форума')

    label = FORUM_DIRECTIONS.get(normalized)
    if not label:
        raise ValidationError('Выберите корректное направление форума.')

    return normalized, label
