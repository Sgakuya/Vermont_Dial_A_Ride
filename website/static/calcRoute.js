//set map options to center around middlebury
console.log("Hello There");

var myLatLng = { lat: 44.0153, lng: -73.1673 };
var mapOptions = {
    center: myLatLng,
    zoom: 14,
    mapTypeId: google.maps.MapTypeId.ROADMAP

};

//create map
var map = new google.maps.Map(document.getElementById('googleMap'), mapOptions);

//create a DirectionsService object from the google map api
var directionsService = new google.maps.DirectionsService();

//create a DirectionsRenderer object which we will use to display the route
var directionsDisplay = new google.maps.DirectionsRenderer();

//bind the DirectionsRenderer to the map
directionsDisplay.setMap(map);

// var g = new Graph(map);


function calcRoute() {

    console.log("This thing workin?");
    //create request
    var request = {
        origin: document.getElementById("from").value,
        destination: document.getElementById("to").value,
        travelMode: google.maps.TravelMode.DRIVING, //WALKING, BYCYCLING, TRANSIT
        unitSystem: google.maps.UnitSystem.IMPERIAL
    }

    //pass the request to the route method
    directionsService.route(request, function (result, status) {
        var sPos = document.getElementById("from").value;
        var fPos = document.getElementById("to").value;

        

        if (status == google.maps.DirectionsStatus.OK 
            && sPos.includes('VT') 
            && fPos.includes('VT') 
            && sPos!=fPos) {
    
            //Get distance and time
            const output = document.querySelector('#output');
            output.innerHTML = "<div class='alert-success'><i class='fas fa-shuttle-van'></i> Your Request has Been Submitted <i class='fas fa-shuttle-van'></i> <br/> From (A): " + document.getElementById("from").value + ".<br />To (B): " + document.getElementById("to").value +  ".<br />Travel Time : " + result.routes[0].legs[0].duration.text + ".</div>";

            
            
            //taking from autofill
            const startPos = document.getElementById("from").value;
            const finishPos = document.getElementById("to").value;
            
            //for deciding for or against pickup time

            // var requestMethod = false;
            // if(document.getElementById("requestMethod").value == "Pick Up Time"){
            //     requestMethod = true;
            // }
                
                      
            //Taking all of the variables and storing them in variables
            // var spl = document.getElementById("pickTime").value.split(':');
            // var hrs = parseInt(spl[0]) * 60;
            // var mins = parseInt(spl[1]);
            // const pickOrDropTime = hrs + mins;


            // const date = document.getElementById("pickDate").value;
            // //converting the edgeweight into a value
            // const edgeWeight = Math.round((result.routes[0].legs[0].duration.value)/60);

            // g.printGraph();  
            console.log("Graph");

            
            
            //display route
            directionsDisplay.setDirections(result);
        } else {
            //delete route from map
            directionsDisplay.setDirections({ routes: [] });
            //center map in VT
            map.setCenter(myLatLng);

            if(sPos==fPos){
                //show error message for having a duplicate address
                output.innerHTML = "<div class='alert-danger'><i class='fas fa-exclamation-triangle'></i> Please Enter Two Different Locations<i class='fas fa-exclamation-triangle'></i></div>";
            }else{
                //show error message for a location outside of vermont
                output.innerHTML = "<div class='alert-danger'><i class='fas fa-exclamation-triangle'></i> Please Enter a Location in Vermont<i class='fas fa-exclamation-triangle'></i></div>";
            }
        }
    });

}




//create autocomplete objects for all inputs
var options = {
    types: ['geocode', 'establishment']
}

//Autocomplete for the starting location
var input1 = document.getElementById("from");
var autocomplete1 = new google.maps.places.Autocomplete(input1, options);

//Autocomplete object for the finishing destination
var input2 = document.getElementById("to");
var autocomplete2 = new google.maps.places.Autocomplete(input2, options);


