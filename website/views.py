from django import forms
from django.http.response import HttpResponseRedirect
from django.http import HttpResponseRedirect
from django.shortcuts import render
from django.urls import reverse
from .models import Ride



destinations = []

# Create your views here.
def index(request):
    return render(request, "website/index.html",{
        "destinations": destinations
    })

def MainPage(request):
        return render(request, "website/MainPage.html")

def busRoutes(request):
        return render(request, "website/busRoutes.html")

def aboutAlg(request):
        return render(request, "website/aboutAlg.html")

# def user(request):
#         return render(request, "website/UserInterface.html")

def users(request):
        return render(request,"/users/login.html")

def disLog(request):
        return render(request, "website/dispatcherLogin.html")

def dis(request):
        return render(request, "website/dispatcherInterface.html")

def simulation(request):
        return render(request, "website/simulation.html")

def simRan(request):
        return render(request, "website/simulateRandom.html")

def requestPage(request):
        return render(request, "website/RequestPage.html", {
            "Rides" : Ride.objects.all()
        })

def reserved(request):
        return render(request, "website/ReservedPage.html")

def cGraph(request):
        return render(request, "website/createGraph.html")
        
def user_view(request):
        if request.method == "POST":
                # Accessing username and password from form data
                origin = request.POST["from"]
                destination = request.POST["to"]
                req = Ride(origin=origin,destination=destination)
                req.save()
        return render(request, "website/UserInterface.html")

