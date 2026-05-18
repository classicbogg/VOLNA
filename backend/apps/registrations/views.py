from rest_framework import status
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView

from .serializers import RegistrationCreateSerializer


class RegistrationCreateAPIView(APIView):
    permission_classes = [AllowAny]
    serializer_class = RegistrationCreateSerializer
    throttle_scope = 'registrations'

    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        registration = serializer.save()

        return Response(
            {
                'id': registration.id,
                'detail': 'Заявка на регистрацию успешно принята.',
            },
            status=status.HTTP_201_CREATED,
        )
