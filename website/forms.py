from django import forms
from django.forms.widgets import DateTimeInput
from .models import Ride
from users.models import User


class UserForm(forms.ModelForm):
    origin = forms.CharField(widget=forms.TextInput(attrs={'id':'from', 'placeholder':'Origin', 'class':'form-control'}))
    destination = forms.CharField(widget=forms.TextInput(attrs={'id':'to', 'placeholder':'Destination', 'class':'form-control'}))
    rider_name = forms.CharField(widget=forms.TextInput(attrs={'id': 'to','placeholder':'Name ', 'class':'form-control'}))
    contact_number = forms.CharField(widget=forms.TextInput(attrs={'id': 'to','placeholder':'Phone Number', 'class':'form-control'}))
    #This is where we have problems storing the date and time
    time = forms.DateTimeField(widget=forms.TimeInput(attrs={'id': 'to','placeholder':'Enter The Time for 24 hour clock', 'class':'form-control'}), 
        label="Time (In form YYYY-MM-DD hh:mm:ss)")
    trip_duration = forms.CharField(widget=forms.HiddenInput(attrs={'id':'duration', 'name':'duration', 'class':'form-control'}),
        label="Time (In form YYYY-MM-DD hh:mm:ss)")
    
    #user_name = forms.CharField(widget = forms.HiddenInput(), required = False)

    class Meta():
        model = Ride
        fields = ('origin','destination','rider_name','contact_number',"time","trip_duration")
    
    def __init__(self, *args, **kwargs):
        super(UserForm, self).__init__(*args, **kwargs)
        self.fields['trip_duration'].error_messages = {'required': 'Please Click Confirm Before Submit'}

    
