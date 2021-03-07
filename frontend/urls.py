from django.urls import path
from . views import index


urlpatterns = [
    path('', index),
    path('login/', index),
    path('signup/', index),
    path('reset_password', index),
    path('password/reset/confirm/<str:uid>/<str:token>', index),
    path('activate/<str:uid>/<str:token>', index),
    path('list/', index),
    path('<int:room_id>/', index),
    path('add/<int:room_id>', index),
    path('transactions/<int:room_id>', index),
    path('summary/<int:room_id>', index),
]