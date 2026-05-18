from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.http import JsonResponse
from django.urls import include, path


def healthcheck(request):
    return JsonResponse({'status': 'ok'})


urlpatterns = [
    path(settings.ADMIN_URL, admin.site.urls),
    path('api/health/', healthcheck, name='healthcheck'),
    path('api/', include('apps.registrations.urls')),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
