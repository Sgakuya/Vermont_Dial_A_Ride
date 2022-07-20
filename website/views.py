from django import forms
from django.http.response import HttpResponseRedirect
from django.http import HttpResponseRedirect
from django.shortcuts import get_object_or_404, render
from django.urls import reverse
from .models import Ride
from users.models import User
from website.forms import UserForm
from django.contrib import messages


destinations = []

# Create your views here.
def index(request):
    return render(request, "website/index.html")

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
        return render(request, "website/DispatcherLogin.html")

def dis(request):
        return render(request, "website/DispatcherInterface.html")

def simulation(request):
        return render(request, "website/simulation.html")

def matrix(request):
        return render(request,"website/distMatrix.html")

def simRan(request):
        return render(request, "website/SimulateRandom.html")

def getSchedule(request):
        return render(request, "website/getSchedule.html")

def simExi(request):
        return render(request, "website/SimulateExisiting.html", {
            "Rides" : Ride.objects.all()
        })

def UserPage(request):
        return render(request, "website/UserPage.html")

def requestPage(request):
        return render(request, "website/RequestPage.html", {
            "Rides" : Ride.objects.all()
        })

def reserved(request):
        return render(request, "website/ReservedPage.html")

def DeletedPage(request):
        return render(request, "website/Deleted.html")

def cGraph(request):
        return render(request, "website/createGraph.html")

def multiDriver(request):
        return render(request, "website/MultiDriver.html")

def mulSimRand(request):
        return render(request, "website/MultiSimulateRandom.html")

def mulSimEx(request):
        return render(request, "website/MultiSimulateExisting.html")

def user_view(request):
        if request.method == "POST":
                # Accessing username and password from form data
                origin = request.POST.get("from")
                destination = request.POST.get("to")
                req = Ride(origin=origin,destination=destination)
                req.save()
        return render(request, "website/UserInterface.html")

def form_page(request):
        form = UserForm()
        if request.method == "POST":
                form = UserForm(request.POST)
                if form.is_valid():
                        post = form.save(commit=False)
                        post.user_name = request.user
                        post.save()

                        #return UserPage(request)
                else:
                        messages.error(request,"Please Click Confirm Before Submit")

        return render(request, "website/form_page.html",{'form':form})

def userRequestPage(request):
        return render(request, "website/UserRequestPage.html", {
            "Rides" : Ride.objects.all()
        })

def delete_post(request, pk):
        template = 'website/Deleted.html'
        Ride.objects.filter(id=pk).delete()

        items = Ride.objects.all()

        context = {
                #'form':form,
                'items' : items,
        }
        return render(request,template,context)

def delete_post2(request, pk):
        template = 'website/DeletedDispatcher.html'
        Ride.objects.filter(id=pk).delete()

        items = Ride.objects.all()

        context = {
                #'form':form,
                'items' : items,
        }
        return render(request,template,context)