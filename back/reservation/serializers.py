from django.contrib.auth.models import User
from rest_framework.serializers import HyperlinkedModelSerializer

from .models import Reservation


class ReservationSerializer(HyperlinkedModelSerializer):
    class Meta:
        model = Reservation
        fields = ('url', 'id', 'start', 'end', 'owner', 'title')


class UserSerializer(HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ('url', 'id', 'username', 'email')