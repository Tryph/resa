from django.conf.urls import url, include
from rest_framework.routers import DefaultRouter

from .views import LoginView, LogoutView, ProfileView


urlpatterns = [
    url('^login/$', LoginView.as_view(), name='auth_login'),
    url('^logout/$', LogoutView.as_view(), name='auth_logout'),
    url(r'^profile/', ProfileView.as_view(), name='auth_profile'),
]