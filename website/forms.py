from django import forms
from django.forms.widgets import DateTimeInput
from .models import Ride
from users.models import User


class UserForm(forms.ModelForm):
    origin = forms.CharField(widget=forms.TextInput(attrs={'id':'from', 'placeholder':'origin', 'class':'form-control'}))
    destination = forms.CharField(widget=forms.TextInput(attrs={'id':'to', 'placeholder':'destination', 'class':'form-control'}))
    rider_name = forms.CharField(widget=forms.TextInput(attrs={'placeholder':'Name ', 'class':'form-control'}))
    contact_number = forms.CharField(widget=forms.TextInput(attrs={'placeholder':'Number to contact', 'class':'form-control'}))
    time = forms.DateTimeField(widget=forms.TimeInput(attrs={'placeholder':'Enter The Time for 24 hour clock', 'class':'form-control'}), 
        label="Time (In form YYYY-MM-DD hh:mm:ss)")
    #user_name = forms.CharField(widget = forms.HiddenInput(), required = False)

    class Meta():
        model = Ride
        fields = ('origin','destination','rider_name','contact_number',"time",)

    
