from django.contrib import admin

from .models import Registration


@admin.register(Registration)
class RegistrationAdmin(admin.ModelAdmin):
    list_display = (
        'full_name',
        'organization',
        'study_or_position',
        'phone',
        'vk_url',
        'forum_direction_label',
        'created_at',
        'info_consent',
        'personal_data_consent',
    )
    list_filter = ('created_at', 'forum_direction', 'info_consent', 'personal_data_consent')
    search_fields = (
        'first_name',
        'last_name',
        'patronymic',
        'organization',
        'study_or_position',
        'phone',
        'vk_url',
        'email',
    )
    readonly_fields = ('created_at', 'updated_at')
    ordering = ('-created_at',)
    date_hierarchy = 'created_at'
    list_per_page = 50
    fieldsets = (
        ('Участник', {
            'fields': ('last_name', 'first_name', 'patronymic'),
        }),
        ('Образование / работа', {
            'fields': ('organization', 'study_or_position'),
        }),
        ('Контакты', {
            'fields': ('phone', 'vk_url'),
        }),
        ('Направление форума', {
            'fields': ('forum_direction', 'forum_direction_label'),
        }),
        ('Согласия', {
            'fields': ('info_consent', 'personal_data_consent'),
        }),
        ('Старые поля для совместимости', {
            'classes': ('collapse',),
            'fields': ('company', 'email'),
        }),
        ('Служебная информация', {
            'fields': ('created_at', 'updated_at'),
        }),
    )
