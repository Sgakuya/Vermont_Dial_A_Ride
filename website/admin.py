from django.contrib import admin

from .models import Ride, Location, Edge

# Register your models here.
admin.site.register(Ride)
admin.site.register(Location)
admin.site.register(Edge)