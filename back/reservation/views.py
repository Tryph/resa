from django.contrib.auth.models import User
from rest_framework import generics
from rest_framework.viewsets import ModelViewSet, ReadOnlyModelViewSet

from authentication.serializers import UserSerializer

from .models import Reservation
from .serializers import ReservationSerializer


class ReservationViewSet(ModelViewSet):
    queryset = Reservation.objects.all()
    serializer_class = ReservationSerializer

    def _user_url(self, request):
        return UserSerializer(
            instance=request.user, context={'request': request}).data['url']

    def create(self, request, *args, **kwargs):
        request.POST['owner'] = self._user_url(request)
        return super(ReservationViewSet, self).create(request, *args, **kwargs)

    def update(self, request, *args, **kwargs):
        request.POST['owner'] = self._user_url(request)
        return super(ReservationViewSet, self).update(request, *args, **kwargs)

    def partial_update(self, request, *args, **kwargs):
        request.POST['owner'] = self._user_url(request)
        return super(ReservationViewSet, self).partial_update(request,
                                                              *args, **kwargs)


class UserViewSet(ReadOnlyModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer


class WeeklyReservations(generics.ListAPIView):
    queryset = Reservation.objects.all()
    serializer_class = ReservationSerializer
