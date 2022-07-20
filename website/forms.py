from django import forms
from django.forms.widgets import DateTimeInput
from .models import Ride
from users.models import User


class UserForm(forms.ModelForm):
    origin = forms.CharField(widget=forms.TextInput(attrs={'id':'from', 'class':'form-control'}))
    destination = forms.CharField(widget=forms.TextInput(attrs={'id':'to', 'class':'form-control'}))
    rider_name = forms.CharField(widget=forms.TextInput(attrs={'id': 'to', 'class':'form-control'}))
    contact_number = forms.CharField(widget=forms.TextInput(attrs={'id': 'to', 'class':'form-control'}))
    #This is where we have problems storing the date and time
    time = forms.DateTimeField(widget=forms.TimeInput(attrs={'id': 'to', 'class':'form-control'}))
    trip_duration = forms.CharField(widget=forms.HiddenInput(attrs={'id':'duration', 'name':'duration', 'class':'form-control'}))

    ride_status = forms.CharField(widget=forms.HiddenInput(attrs={'id': 'ride_status', 'class':'form-control','name':'ride_status', 'value':'pending'}))
    roundtrip = forms.CharField(widget=forms.TextInput(attrs={'id': 'to', 'class':'form-control'}))
    rtime = forms.DateTimeField(widget=forms.TimeInput(attrs={'id': 'to', 'class':'form-control'}))
    share = forms.CharField(widget=forms.TextInput(attrs={'id': 'requestMethod', 'class':'form-control'}))
    needs = forms.CharField(widget=forms.TextInput(attrs={'id': 'to', 'class':'form-control'}))

    class Meta():
        model = Ride
        fields = ('origin','destination','rider_name','contact_number',"time","trip_duration", "ride_status", "roundtrip", "rtime", "share", "needs")

    def __init__(self, *args, **kwargs):
        super(UserForm, self).__init__(*args, **kwargs)
        self.fields['trip_duration'].error_messages = {'required': 'Please Click Confirm Before Submit'}




