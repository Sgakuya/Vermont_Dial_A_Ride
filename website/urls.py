from django.urls import path
from django.conf.urls import url
#from django.conf.urls import include

from . import views
from .views import *

urlpatterns = [
    path("", views.index, name="index"),
    path("MainPage.html", views.MainPage, name="MainPage"),
    path("busRoutes.html", views.busRoutes, name="busRoutes"),
    path("aboutAlg.html", views.aboutAlg, name="aboutAlg"),
    path("DispatcherLogin.html", views.disLog, name="disLog"),
    path("DispatcherInterface.html", views.dis, name="dis"),
    path("simulation.html", views.simulation, name="simulation"),
    path("SimulateRandom.html", views.simRan, name="simRan"),
    path("SimulateExisiting.html", views.simExi,name="simExi"),
    path("RequestPage.html", views.requestPage, name="requestPage"),
    path("ReservedPage.html", views.reserved, name="reserved"),
    path("users/login.html", views.users, name="users"),
    path("UserInterface.html", views.user_view, name="user_view"),
    path("createGraph.html", views.cGraph, name="cGraph"),
    path("form_page.html", views.form_page, name="form_page"),
    path("UserPage.html", views.UserPage, name="UserPage"),
    path("UserRequestPage.html", views.userRequestPage, name="UserRequestPage"),
    path("Deleted.html", views.DeletedPage, name="DeletedPage"),
    url(r'^delete/(?P<pk>\d+)$', delete_post, name="delete_post"),
    #path("UserRequestPage.html", views.delete_post, name="delete_post"),
]