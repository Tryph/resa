from django.contrib.auth.models import User
from rest_framework import generics
from rest_framework.viewsets import ModelViewSet, ReadOnlyModelViewSet

from authentication.serializers import UserSerializer

from .models import Reservation
from .serializers import ReservationSerializer


class ReservationViewSet(ModelViewSet):
    queryset = Reservation.objects.all()
    serializer_class = ReservationSerializer


class UserViewSet(ReadOnlyModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer


class WeeklyReservations(generics.ListAPIView):
    queryset = Reservation.objects.all()
    serializer_class = ReservationSerializer
