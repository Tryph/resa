from django.contrib.auth import authenticate
from django.contrib.auth.models import User

from rest_framework import serializers


class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField(required=False, allow_blank=True)
    username = serializers.CharField(required=False, allow_blank=True)
    password = serializers.CharField(required=True)

    def __init__(self, *args, **kwargs):
        self._user = None
        self.allow_inactive = kwargs.pop('allow_inactive', False)
        super().__init__(*args, **kwargs)

    def validate(self, data):
        username = data.get('username')
        password = data.get('password')

        if username and password:
            self._user = authenticate(username=username, password=password)
            if self._user is None:
                raise serializers.ValidationError('invalid_credentials')
            if not self.login_allowed(self._user):
                raise serializers.ValidationError('login_not_allowed')
        if not username:
            raise serializers.ValidationError('username required')
        return data

    def login_allowed(self, user):
        return (
            User.objects.filter(username=user.username).exists() and
            (user.is_active or self.allow_inactive)
        )

    def get_user(self):
        return self._user


class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ('url', 'id', 'username', 'email')