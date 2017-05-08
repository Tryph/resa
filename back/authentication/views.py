from django.contrib.auth import login, logout
from django.views.decorators.csrf import csrf_exempt

from rest_framework import status, permissions
from rest_framework.response import Response
from rest_framework.views import APIView

from .serializers import LoginSerializer, UserSerializer


class LoginView(APIView):

    def post(self, request):
        serializer = LoginSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            user = serializer.get_user()
            login(request, user)
            user_serializer = UserSerializer(instance=user,
                                             context={'request': request})
            return Response(data=user_serializer.data)


class LogoutView(APIView):

    def post(self, request):
        logout(request)
        return Response(status=status.HTTP_204_NO_CONTENT)


class ProfileView(APIView):

    def get(self, request):
        user_serializer = UserSerializer(instance=request.user,
                                         context={'request': request})
        return Response(data=user_serializer.data)
