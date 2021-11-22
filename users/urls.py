from django.urls import path
from . import views

urlpatterns = [
    path("registration.html",views.register,name='register'),
    path("", views.index, name="index"),
    path("login.html", views.login_view, name="login"),
    path("logout", views.logout_view, name="logout"),
    path("website/MainPage.html", views.MainPage, name="MainPage"),
    path("website/busRoutes.html", views.busRoutes, name="busRoutes"),
    path("website/aboutAlg.html", views.aboutAlg, name="aboutAlg"),
    path("website/User.html", views.UI, name="UI") 
]