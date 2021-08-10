from django.urls import path

from . import views

urlpatterns = [
    path("", views.index, name="index"),
    path("MainPage.html", views.MainPage, name="MainPage"),
    path("busRoutes.html", views.busRoutes, name="busRoutes"),
    path("aboutAlg.html", views.aboutAlg, name="aboutAlg"),
    path("DispatcherLogin.html", views.disLog, name="disLog"),
    path("DispatcherInterface.html", views.dis, name="dis"),
    path("simulation.html", views.simulation, name="simulation"),
    path("SimulateRandom.html", views.simRan, name="simRan"),
    path("RequestPage.html", views.requestPage, name="requestPage"),
    path("ReservedPage.html", views.reserved, name="reserved"),
    path("users/login.html", views.users, name="users"),
    path("UserInterface.html", views.user_view, name="user_view"),
    path("createGraph.html", views.cGraph, name="cGraph"),
]