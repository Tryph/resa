from django.conf.urls import url, include
from rest_framework.routers import DefaultRouter

from .views import ReservationViewSet, UserViewSet, WeeklyReservations


router = DefaultRouter()
router.register(r'resas', ReservationViewSet)
router.register(r'users', UserViewSet)
# print(router.urls)


urlpatterns = [
    # url(r'^$', api_root),
    url(r'^', include(router.urls)),
    url(r'resas/(?P<year>\d{4})/weekly/(?P<week>\d{2})/',
        WeeklyReservations.as_view())
]
