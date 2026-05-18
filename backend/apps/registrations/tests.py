from django.test import TestCase
from rest_framework.test import APIClient

from .models import Registration


class RegistrationApiTests(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.payload = {
            'first_name': 'Иван',
            'last_name': 'Иванов',
            'patronymic': 'Иванович',
            'company': 'ООО ВОЛНА',
            'phone': '+7 (999) 123-45-67',
            'email': 'ivanov@example.ru',
            'info_consent': True,
            'personal_data_consent': True,
        }

    def test_registration_created(self):
        response = self.client.post('/api/registrations/', self.payload, format='json')

        self.assertEqual(response.status_code, 201)
        self.assertEqual(Registration.objects.count(), 1)
        self.assertNotIn('phone', response.data)
        self.assertNotIn('email', response.data)

    def test_registration_requires_personal_data_consent(self):
        payload = {**self.payload, 'personal_data_consent': False}
        response = self.client.post('/api/registrations/', payload, format='json')

        self.assertEqual(response.status_code, 400)
        self.assertEqual(Registration.objects.count(), 0)

    def test_duplicate_email_rejected(self):
        self.client.post('/api/registrations/', self.payload, format='json')
        response = self.client.post('/api/registrations/', self.payload, format='json')

        self.assertEqual(response.status_code, 400)
        self.assertEqual(Registration.objects.count(), 1)
