from django.contrib import admin

from .models import Registration


@admin.register(Registration)
class RegistrationAdmin(admin.ModelAdmin):
    list_display = (
        'full_name',
        'company',
        'email',
        'created_at',
        'info_consent',
        'personal_data_consent',
    )
    list_filter = ('created_at', 'info_consent', 'personal_data_consent')
    search_fields = ('first_name', 'last_name', 'patronymic', 'company', 'email', 'phone')
    readonly_fields = ('created_at', 'updated_at')
    ordering = ('-created_at',)
    date_hierarchy = 'created_at'
    list_per_page = 50
    fieldsets = (
        ('Участник', {
            'fields': ('last_name', 'first_name', 'patronymic', 'company'),
        }),
        ('Контакты', {
            'fields': ('email', 'phone'),
        }),
        ('Согласия', {
            'fields': ('info_consent', 'personal_data_consent'),
        }),
        ('Служебная информация', {
            'fields': ('created_at', 'updated_at'),
        }),
    )
