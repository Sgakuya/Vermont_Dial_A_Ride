from django import forms
from django.forms.widgets import DateTimeInput
from .models import Ride


class UserForm(forms.ModelForm):
    origin = forms.CharField(widget=forms.TextInput(attrs={'id':'from', 'placeholder':'origin', 'class':'form-control'}))
    destination = forms.CharField(widget=forms.TextInput(attrs={'id':'to', 'placeholder':'destination', 'class':'form-control'}))
    username = forms.CharField(widget=forms.TextInput(attrs={'id': 'requestMethod', 'placeholder':'Name ', 'class':'form-control'}))
    time = forms.DateTimeField(widget=forms.TimeInput(attrs={'id': 'pickDate','placeholder':'Input Time like: 2021-11-25 14:30:59', 'class':'form-control'}))

    class Meta():
        model = Ride
        fields = "__all__"

    
