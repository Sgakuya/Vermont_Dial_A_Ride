// Local variables for storage
var edgeWeights = [];
var missed = [];
var edges = [];
var delayFactor = 0;

//Checking to see if there have been previously satisfied requests in the local
//storage
var satisfied = 0;
if(JSON.parse(localStorage.getItem("edgeWeight"))){
    satisfied = JSON.parse(localStorage.getItem("edgeWeight")).length;
}

var total = 0;

/*
    Graph class, takes
    map = google map api object
    vtMap = actual graph (Not currently used?)
    directionsService and directionDisplay = google map api objects
*/
var Graph = /** @class */ (function () {
    function Graph(m, s, d) {
        this.map = m;
        this.vtMap = ({});
        directionsService = s;
        directionsDisplay = d;
        

        //List of locations that we plan on loading into our graph
        //STILL NEED TO INPUT MULTIPLE LOCATIONS WITHIN BURLINGTON, MIDD, etc.
        this.locations = 
        [
            "Addison, VT, USA",
            "Brandon, VT, USA",
            "Bridport, VT, USA",
            "Bristol, VT, USA",

            //Burlington
            "Burlington, VT, USA",


            "Colchester, VT, USA",
            "Cornwall, VT, USA",
            "East Middlebury, Middlebury, VT, USA",
            "Essex Junction, Essex, VT, USA",
            "Essex, VT, USA",
            "Ferrisburg, VT, USA",
            "Hinesburg, VT, USA",
            "Lebanon, VT, USA",
            "Leicester, VT, USA",

            //Middlebury
            "Middlebury, VT, USA",
            //???

            "New Haven, VT, USA",
            "Orwell, VT, USA",
            "Ripton, VT, USA",
            "Rutland, VT, USA",
            "Salisbury, VT, USA",
            "Shoreham, VT, USA",

            // "South Burlington, VT, USA",
            "South Burlington, VT, USA",
            //????

            "Starksboro, VT, USA",
            "Sudberry, VT, USA",
            "Vergennes, VT, USA",
            "Weybridge, VT, USA",
            "Whiting, VT, USA",
            "Williston, VT, USA",
            "Winooski, VT, USA", 

            // "Ripton, VT, USA"
            
                                    ];

            // this.locations = 
            // [
            //     "Middlebury, VT, USA",
            //     "Vergennes, VT, USA",
            //     "Rutland, VT, USA",
            //     "South Burlington, VT, USA",
            //     "Bristol, VT, USA",
            //     "Burlington, VT, USA",
            //     "Salisbury, VT, USA",
            //     "Shoreham, VT, USA",
            //     "Addison, VT, USA",
            //     "Cornwall, VT, USA",
            //     "Leicester, VT, USA"
            // ];

       

        if (this.BusLines === undefined) {
            this.BusLines = null;
        }
        this.TimeTable = ({});
        this.busStations = ["Burlington", "BTV", "Vergennes", "Middlebury College", "Brandon", "Rutland"];
        this.BusLines = ([]);
        for (var i = 0; i < this.locations.length; i++) {
            {
                this.addVertex(this.locations[i], i);
            };
        }
        
       
        setUp(this.locations);
    
      
        
    }

    //Hardcoded bus routes and their times. 
    //The bus route travel times are taken from: https://www.vttranslines.com/bus-schedules/
    Graph.prototype.addBus = function () {
        var line1 = new BusPath();
        line1.addRoute("Burlington", "BTV", 298, 313);
        line1.addRoute("BTV", "Vergennes", 313, 353);
        line1.addRoute("Vergennes", "Middlebury College", 353, 377);
        line1.addRoute("Middlebury College", "Brandon", 377, 400);
        line1.addRoute("Brandon", "Rutland", 400, 427);
                 (this.BusLines.push(line1) > 0);
        var line2 = new BusPath();
        line2.addRoute("Burlington", "BTV", 808, 823);
        line2.addRoute("BTV", "Vergennes", 823, 853);
        line2.addRoute("Vergennes", "Middlebury College", 853, 877);
        line2.addRoute("Middlebury College", "Brandon", 877, 900);
        line2.addRoute("Brandon", "Rutland", 900, 927);
                 (this.BusLines.push(line2) > 0);
        var line3 = new BusPath();
        line3.addRoute("Rutland", "Brandon", 928, 965);
        line3.addRoute("Brandon", "Middlebury College", 965, 988);
        line3.addRoute("Middlebury College", "Vergennes", 988, 1012);
        line3.addRoute("Vergennes", "BTV", 1012, 1052);
        line3.addRoute("BTV", "Burlington", 1052, 1067);
                 (this.BusLines.push(line3) > 0);
        var line4 = new BusPath();
        line4.addRoute("Rutland", "Brandon", 1343, 1380);
        line4.addRoute("Brandon", "Middlebury College", 1380, 1403);
        line4.addRoute("Middlebury College", "Vergennes", 1403, 1427);
        line4.addRoute("Vergennes", "BTV", 1427, 1467);
        line4.addRoute("BTV", "Burlington", 1467, 1482);
                    (this.BusLines.push(line4) > 0);
                (this.TimeTable["Burlington"] = [298, 808, 1067, 1482]);
                (this.TimeTable["BTV"] = [313, 823, 1052, 1467]);
                (this.TimeTable["Vergennes"] = [353, 853, 1012, 1427]);
                (this.TimeTable["Middlebury College"] = [377, 877, 988, 1403]);
                (this.TimeTable["Brandon"] = [400, 900, 965, 1380]);
                (this.TimeTable["Rutland"] = [427, 927, 928, 1343]);
    };
    Graph.prototype.getMinStation = function (path, Pos, startSearch, pathToPos) {
        var isPassed = false;
        var min = 100000;
        var res = startSearch;
        if (pathToPos) {
            for (var i = 0; i < path.BusRoutes.length; i++) {
                var br = path.BusRoutes[i];
                {
                    if (br.source === startSearch)
                        isPassed = true;
                    if (isPassed) {
                        var w = this.getEdgeWeight(br.destination, Pos);
                        if (w < min) {
                            min = w;
                            res = br.destination;
                        }
                    }
                }
            }
        }
        else {
            for (var i = path.BusRoutes.length - 1; i >= 0; i--) {
                {
                    var br = path.BusRoutes[i];
                    if (br.destination === startSearch)
                        isPassed = true;
                    if (isPassed) {
                        var w = this.getEdgeWeight(Pos, br.source);
                        if (w < min) {
                            min = w;
                            res = br.source;
                        }
                    }
                }
                ;
            }
        }
        return res;
    };
    //Adds a new vertex to the graph
    Graph.prototype.addVertex = function (n, p) {
                (this.vtMap[n] = new Vertex(n, p));
    };
    //adds an edge between two locations
    /*
        each location will have an array of edgeweights based on a key
        the key will be equal to the name of the destination in the array
    */
    Graph.prototype.addEdge = function (v1, v2, weight) {
        var edge = new Edge(v1.name, v2.name, weight);
                (v1.edges[v2.name] = edge);
    };

    //finds and returns the edgeweight from location s1 to s2
    Graph.prototype.getEdgeWeight = function (s1, s2) {
        if (s1 === s2) {
            return 0;
        }
        return  (function (m, k) { return m[k] === undefined ? null : m[k]; })((function (m, k) { return m[k] === undefined ? null : m[k]; })(this.vtMap, s1).edges, s2).weight;
    };

 
    //Prints the contents of the graph in the console
    Graph.prototype.printGraph = function () {

            var arr = /* entrySet */ (function (o) {
                var s = []; for (var e in o)
                    s.push({ k: e, v: o[e], getKey: function () { return this.k; }, getValue: function () { return this.v; } }); return s;
            })(this.vtMap);
            for (var i = 0; i < arr.length; i++) {
                var e = arr[i];
                {
                    console.log("Key: " + e.getKey() + " \nValue: " + e.getValue().toString() + "Done");
                    //console.info(this.getEdgeWeight('Burlington','Middlebury College'));
                }
            }
        
    };

    //Checks to see if the location has a bus station attached with it
    Graph.prototype.isBusStation = function (location) {
        for (var i = 0; i < this.busStations.length; i++) {
            var s = this.busStations[i];
            {
                if (location === s)
                    return true;
            }
        }
        return false;
    };
    Graph.prototype.printBus = function () {
        for (var i = 0; i < this.BusLines.length; i++) {
            var bp = this.BusLines[i];
            {
                bp.printRouts();
            }
        }
    };
    return Graph;
}());
Graph = Graph;
Graph["__class"] = "Graph";

/*
    Vertex class, takes in a name (location) and a position
    Initialized with an empty array of edges
*/
var Vertex = /** @class */ (function () {
    function Vertex(n, p) {
        if (this.name === undefined) {
            this.name = null;
        }
        if (this.pos === undefined) {
            this.pos = 0;
        }
        if (this.edges === undefined) {
            this.edges = null;
        }
        this.name = n;
        this.pos = p;
        this.edges = ({});
    }
    Vertex.prototype.toString = function () {
        var res = this.name + " " + this.pos + "\n";
        {
            var arr = /* entrySet */ (function (o) {
                var s = []; for (var e in o)
                    s.push({ k: e, v: o[e], getKey: function () { return this.k; }, getValue: function () { return this.v; } }); return s;
            })(this.edges);
            for (var i = 0; i < arr.length; i++) {
                var e = arr[i];
                {
                    res += e.toString() + "\n";
                }
            }
        }
        return res;
    };
    return Vertex;
}());
Vertex = Vertex;
Vertex["__class"] = "Vertex";

/*
    Edge class, takes a source, a destination, and stores a weight. 
    Only used for storage
*/
var Edge = /** @class */ (function () {
    function Edge(s, d, w) {
        if (this.source === undefined) {
            this.source = null;
        }
        if (this.destination === undefined) {
            this.destination = null;
        }
        if (this.weight === undefined) {
            this.weight = 0;
        }
        this.source = s;
        this.destination = d;
        this.weight = w;
    }
    Edge.prototype.toString = function () {
        return this.source + " to " + this.destination + ": " + this.weight + " minutes driving";
    };
    return Edge;
}());
Edge = Edge;
Edge["__class"] = "Edge";

/*
    Bus path class
*/
var BusPath = /** @class */ (function () {
    function BusPath() {
        if (this.BusRoutes === undefined) {
            this.BusRoutes = null;
        }
        this.BusRoutes = ([]);
    }
    BusPath.prototype.addRoute = function (source, destination, depart, arrive) {
                 (this.BusRoutes.push(new BusRoute(source, destination, depart, arrive)) > 0);
    };
    BusPath.prototype.printRouts = function () {
        for (var i = 0; i < this.BusRoutes.length; i++) {
            var br = this.BusRoutes[i];
            {
                console.info(br.toString());
            }
        }
    };
    return BusPath;
}());
BusPath = BusPath;
BusPath["__class"] = "BusPath";

/*
    Busroute class, stored in the busPath, takes a starting position, a
    destination, a departure time, and an arrival time
*/
var BusRoute = /** @class */ (function () {
    function BusRoute(s, d, depart, arrive) {
        if (this.source === undefined) {
            this.source = null;
        }
        if (this.destination === undefined) {
            this.destination = null;
        }
        if (this.weight === undefined) {
            this.weight = 0;
        }
        if (this.departure === undefined) {
            this.departure = 0;
        }
        if (this.arrival === undefined) {
            this.arrival = 0;
        }
        this.source = s;
        this.destination = d;
        this.departure = depart;
        this.arrival = arrive;
        this.weight = arrive - depart;
    }
    BusRoute.prototype.toString = function () {
        return "Bus Route from " + this.source + " at " + (this.departure / 60 | 0) + ":" + this.departure % 60 + " to " + this.destination + " at " + (this.arrival / 60 | 0) + ":" + this.arrival % 60;
    };
    return BusRoute;
}());

//Sets up the local storage and stores all the missed graph edges in
//a local storage option called "missedWeights"
function setUp(locations){
    for(var i =0; i<locations.length; i++){
        for(var j =0; j<locations.length; j++){
            if(i==j){

            }else{
                total++;
                var g = new graphEdge(locations[i],locations[j],-1);
                edges.push(g);
                console.log(edges);
            }
        }
    }
    localStorage.setItem("missedWeights", JSON.stringify(edges));
    localStorage.setItem("count", total);
}

//For the save and refresh button in the html
//Adds the first 10 locations if they are available, stores them and the weights
// in the local storage, then conti
function addRefresh(){
    
    if(localStorage.getItem("missedWeights")){

    
    var w = JSON.parse(localStorage.getItem("missedWeights"));

    for(var i = 0; i < 10; i++){
        if(w[i]){
            graphAdd(w[i].startPos,w[i].finishPos);
        }else{
            // console.log("Hey it's empty!");
            break;
        }
    }
    w.splice(0,10);
    localStorage.setItem("missedWeights", JSON.stringify(w));

    setTimeout(
        function(){
            window.location.reload(true);
        },3000);
        
    }else{
        console.log("Miss is Empty!!!")
    }
}




/*
* Gets the edgeweight between two input locations and adds to a global array
*/
function graphAdd(loc1, loc2) {
    
    
    //create request
    var request = {
        origin: loc1,
        destination: loc2,
        travelMode: google.maps.TravelMode.DRIVING, //WALKING, BYCYCLING, TRANSIT
        unitSystem: google.maps.UnitSystem.IMPERIAL
    }

    //Asynchronous method
    directionsService.route(request, function(result,status){
        var sPos = loc1;
        var fPos = loc2;
        
        
       if (status == google.maps.DirectionsStatus.OK 
           && sPos.includes('VT') 
           && fPos.includes('VT') 
           && sPos!=fPos) {

            satisfied ++;

            progress.innerHTML = " Satisfied: " + satisfied + "/" + total + " Api Requests. ";

            //create edgeWeight
            var edgeWeight = Math.round((result.routes[0].legs[0].duration.value)/60);
            output.innerHTML = "<div class='alert-success'> Adding to gEdge Array<br/> StartPos: " + sPos + "<br/>FinishPos: " + fPos + "<br/>EdgeWeight: " + edgeWeight + " Minutes.</div> ";
            console.log("Adding to gEdge Array, StartPos: " + sPos + " FinishPos: " + fPos + " EdgeWeight: " + edgeWeight + " Minutes");

            //create the new edgeweight
            var gEdge = new graphEdge(sPos, fPos, edgeWeight);

            // this.addEdge((function (m, k) { return m[k] === undefined ? null : m[k]; })(this.vtMap, this.locations[i]), (function (m, k) { return m[k] === undefined ? null : m[k]; })(this.vtMap, this.locations[j]), 100);

            directionsDisplay.setDirections(result);

            if(!JSON.parse(localStorage.getItem("edgeWeight"))){
                console.log("Edgeweights is empty");
            }else{
                edgeWeights = JSON.parse(localStorage.getItem("edgeWeight"));
            }
           


            //push it into the array of other edgeweights
            edgeWeights.push(gEdge);


            //store in local storage
            localStorage.setItem("edgeWeight", JSON.stringify(edgeWeights));

            

        //to prevent requesting too many locations from the api at once
       }else if (status == google.maps.DirectionsStatus.OVER_QUERY_LIMIT){
           delayFactor ++;
        //    console.log("Delay Factor: " + delayFactor);
        //    console.log("The api is busy. Pushing the request of StartPos: " + sPos + " FinishPos: " + fPos +" to the end");
           var emptyEdge = new graphEdge(sPos,fPos,-1);
           missed.push(emptyEdge);
           localStorage.setItem("missedWeights",JSON.stringify(missed));

        //    setTimeout(function(){
        //        graphAdd(sPos,fPos);  
        //    },delayFactor *1000); //2 seconds
       }
    }
    
    );
  
}




BusRoute = BusRoute;
BusRoute["__class"] = "BusRoute";


// export { Graph, Vertex, Edge, BusPath, BusRoute };