from django.db import models
from datetime import datetime
from users.models import User


# Note: To make change in database:
# makemigrations -> migrate

# Create your models here.
class Location(models.Model):
    city = models.CharField(max_length=64)

    def __str__(self):
        return f"{self.city}"

class Ride(models.Model):
    # CASCADE --> If delete a city, will also delete all the relevant rides
    origin = models.CharField(max_length=100)
    destination = models.CharField(max_length=100)
    rider_name = models.CharField(default="", max_length=64)
    contact_number = models.CharField(default="", max_length=30)
    user_name = models.ForeignKey(User, default=User, on_delete=models.CASCADE)
    time = models.DateTimeField(default=datetime.now,blank=True)
    trip_duration = models.CharField(default="", max_length=30)

    ride_status = models.CharField(default="pending", max_length=30)
    roundtrip = models.CharField(default="", max_length=30)
    rtime = models.DateTimeField(default=datetime.now,blank=True)
    share = models.CharField(default="", max_length=30)
    needs = models.CharField(default="", max_length=300)

    def __str__(self):
        return f"{self.origin} to {self.destination} pickTime: {self.time}"


class Edge(models.Model):
    origin = models.ForeignKey(Location, on_delete=models.CASCADE, related_name="origin")
    destination = models.ForeignKey(Location, on_delete=models.CASCADE, related_name="destination")
    duration = models.IntegerField()


    def __str__(self):
        return f"{self.id}: {self.origin} to {self.destination} from {self.pickTime} to {self.finishTime}"


