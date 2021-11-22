from django.http.response import HttpResponseRedirect
from django.contrib.auth import authenticate, login, logout
from django.shortcuts import render
from django.http import HttpResponseRedirect
from django.urls import reverse
from users.forms import loginForm

# Create your views here.

def register(request):
    registered = False

    if request.method == "POST":
        user_form = loginForm(data=request.POST)

        if user_form.is_valid():
            user = user_form.save()
            user.set_password(user.password)
            user.save()
            registered = True
        else:
            print(user_form.errors)
    else:
        user_form = loginForm()

    return render(request,'users/registration.html',
        {'user_form': loginForm,
         'registered': registered})

def index(request):
    if not request.user.is_authenticated:
        return HttpResponseRedirect(reverse("login"))
    return render(request, "website/UserInterface.html")

def login_view(request):
    if request.method == "POST":
        
        # Accessing username and password from form data
        username = request.POST["username"]
        password = request.POST["password"]

        # Check if username and password are correct, returning User object if so
        user = authenticate(request, username=username, password=password)

        # If user object is returned, log in and route to index page:
        if user:
            login(request, user)
            return HttpResponseRedirect(reverse("index"))
        # Otherwise, return login page again with new context
        else:
            return render(request, "users/login.html", {
                "message": "Invalid Credentials"
            })
    return render(request, "users/login.html")

def logout_view(request):
    logout(request)
    return render(request, "users/login.html",{
        "message": "Logged out"
    })

def registration(request):
        return render(request, "user/registration.html")

def MainPage(request):
        return render(request, "website/MainPage.html")

def busRoutes(request):
        return render(request, "website/busRoutes.html")

def aboutAlg(request):
        return render(request, "website/aboutAlg.html")

def UI(request):
        return render(request, "website/User.html")
