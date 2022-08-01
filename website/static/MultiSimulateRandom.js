//code to implement multidriver algorithm, similar to java code
//still has some bugs/syntax errors

import{Graph} from './graph.js';
import{Request1D}from './Request.js'
import{Driver}from './Driver.js'

var graph = new Graph();
var requestList = [];
var weights = [0,0,0];
var serveList = [];
var currServe = [];
var unserved = [];
var checkList = [];
var driverList = [];
var locations = ["Burlington", "BTV", "Montpelier", "Vergennes", "Weybridge", "Middlebury College", "Cornwall", "Lake Dunmore", "Rutland", "Brandon"];

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

// Creates 'numDr' number of random drivers
function generateRandomDrivers(){
    document.getElementById("demo").innerHTML += "" + '<br>';
    document.getElementById("demo").innerHTML += "The Random Drivers Generated: " + '<br>';
    driverList = [];
    let numDr = document.getElementById('numDr').value;
    var usedLocs = [];
    for(let i = 0; i<numDr; i++){
        var name = i+1;
        var rand;
        while(true){
          rand = getRandomInt(10);
          if(usedLocs[rand] != true){
            usedLocs[rand] = true;

            break;
            }
        }
        var driver = new Driver(name, locations[rand], graph);
        driverList.push(driver);
    }
    for(var i=0;i<driverList.length;i++){
        var x = driverList[i];
       console.info(x);
       document.getElementById("demo").innerHTML += 'Driver: ' + x.name + ' Origin: ' + x.origin + '<br>';
    }
}

// Creates 'num' number of random requests
function createRandomRequest(){
    document.getElementById("demo").innerHTML = "";
    document.getElementById("demo").innerHTML += "The Random Requests Generated: " + '<br>';
    requestList = [];
    let numRequest = document.getElementById('num').value;
    //for each request in the number of random requests requested
    for(let i = 0;i<numRequest;i++){
        var p = getRandomInt(2);
        var prob = getRandomInt(10)+1;
        var time;

        //Assigning time of the request, weighted to add more realistic times
        if(prob == 1) time = getRandomInt(37);
        else if(prob == 10) time = getRandomInt(30)+115;
        else time = getRandomInt(78)+37;

        var s = getRandomInt(10);
        var d = getRandomInt(10);
        while(s==d){
            d = getRandomInt(10);
        }

        //Reserved by pick up time
        if(p==0){
            console.warn("s= ", s + " d = " + d + " time = " + time*10 + " T/F: " + true + " graph: " + graph);
            var request = new Request1D(s,d,time*10,false,graph);
            requestList.push(request);
        }else{
            console.warn("s= ", s + " d = " + d + " time = " + time*10 + " T/F: " + true + " graph: " + graph);
            var request = new Request1D(s,d,time*10,true,graph);
            requestList.push(request);
        }

        if(requestList[requestList.length-1].pickTime<0){
            requestList.pop();
            i--;
        }
    }
    for(var i=0;i<requestList.length;i++){
        var x = requestList[i];
       console.info(x);
       document.getElementById("demo").innerHTML += x.toString() + '<br>';
    }
}

function changeWeight(){
    var maxSize = 0;

    for(var i=0;i<=6;i++){
        for(var j=0;j<=9;j++){
            for(var k=0; k<=10;k++){
                var temp = [];
                for(var m = 0;m<requestList.length;m++){
                    var n = new Request1D(requestList[m].startPos,requestList[m].finishPos,requestList[m].pickTime,false,graph);
                    temp.push(n);
                }

            //    console.warn("entered ChangeWeight function");
                alg(temp,0,"Middlebury College",i,j,k);

                if(serveList.length>maxSize){
                    // console.warn("serveList is greater than the max size with weights of: " + i + " " + j + " " + k);
                    weights[0] = i;
                    weights[1] = j;
                    weights[2] = k;
                    maxSize = serveList.length;
                }
                serveList = [];
                checkList = [];
                currServe = [];
            }
        }
    }
    console.warn("Weights used: " + weights[0] + " " + weights[1] + " " + weights[2]);
}

//algorithm to create schedule
function alg(list,time,origin,w1,w2,w3){

    for(var i=0;i<list.length;i++){
        list[i].setf(w1,w2,w3,graph.getEdgeWeight(origin,list[i].startPos),list[i].finishTime,list[i].getX3(list,graph));
    }

    list.sort(compare);

    //remove all the illegal requests
    for(var i=0;i<list.length;i++){
        var r = list[i];

        //Allowing 15 minutes delay
        //if(r.pickTime < time + 15){
        if(r.pickTime < time){
            unserved.push(list[i]);
            list.splice(i,1);
            i--;
            continue;
        }

        //if(graph.getEdgeWeight(origin,r.startPos) + time + 15>r.pickTime){
        if(graph.getEdgeWeight(origin,r.startPos) + time>r.pickTime){
            unserved.push(list[i]);
            list.splice(i,1);
            i--;
        }

    }

    if(list.length>0){
        var r = list[0];
        var T = (r.pickTime-time) - graph.getEdgeWeight(origin,r.startPos);
        if(T<=15 && T>=0){
            checkList.push(T);
            r.finishTime -= T;
            r.pickTime -= T;
            r.shift = T;
        }else if(T>15){
            checkList.push(15);
            r.finishTime -= 15;
            r.pickTime -= 15;
            r.shift = 15;
        }


        serveList.push(r);
        currServe.push(r);
        time = r.finishTime;
        origin = r.finishPos;
        list.splice(0,1);

        alg(list,time,origin,w1,w2,w3);
    }
}

//Shows the data in a table, gets the individual results
function showData(){
    var counter = 1;

    var table = document.getElementById("body");
    for(let i = 0; i<serveList.length; i++){
        //Inserting cells
            var r = table.insertRow();
            var requestNum = r.insertCell();
            var startPosition = r.insertCell();
            var finishPosition = r.insertCell();
            var pickTime = r.insertCell();
            var d = r.insertCell();
            var shift = r.insertCell();
            var driver = r.insertCell();


            //inputting data ainto those cells
            requestNum.innerHTML = "Request " + counter;
            startPosition.innerHTML += serveList[i].startPos;
            finishPosition.innerHTML += serveList[i].finishPos;
            pickTime.innerHTML += Math.floor(serveList[i].pickTime/60) + ':' +  ((serveList[i].pickTime%60 < 10) ? ("0" + serveList[i].pickTime%60) : serveList[i].pickTime%60);
            d.innerHTML += Math.floor(serveList[i].finishTime/60) + ":" + ((serveList[i].finishTime%60 < 10) ? ("0" + serveList[i].finishTime%60) : serveList[i].finishTime%60);
            shift.innerHTML += serveList[i].shift + " min earlier";
            var temp = serveList[i].drivers[0];
            driver.innerHTML += serveList[i].drivers[0].name;

            counter ++;
    }
}

//find the k closest requests to the specified driver's location
function kClosest(k, driver, list){
    var distMap = new Map;
    for(let i=0; i<list.length; i++){
        var d = driver.distToReq(list[i].startPos);
        distMap.set(driver.distToReq(list[i].startPos), list[i]);
    }
    var unsortedArr = [...distMap];
    var sortedArr = unsortedArr.sort((a,b) => (a-b));
    var sortedDistMap = new Map(sortedArr);

    var sortedClosest = [];
    for(let value of sortedDistMap.values()){
        sortedClosest.push(value);
    }

    sortedClosest.splice(k);

    return sortedClosest;
}

//function to check if the requests in the already made schedule can be done later i.e. without the 15 min max shift
//needs to be updated(was used for single driver before)
function check() {
    //loop backwards through our checklist to see if it is possible
    //to do the corresponding request later
    for(let i = serveList.length-1; i>-1; i--){
        //if shifted last request
        var r = serveList[i];
        if(i == checkList.length-1){
            r.finishTime += checkList[i];
            r.pickTime += checkList[i];
            r.shift -= checkList[i];
        }else{ //if not last request
            if (serveList[i+1].pickTime - (r.finishTime + 15 ) - graph.getEdgeWeight(r.finishPos,serveList[i+1].startPos) >= 0){
                r.finishTime += checkList[i];
                r.pickTime += checkList[i];
                r.shift -= checkList[i];
            }
            continue;
        }

    }
}

//multidriver algorithm to split the requests among the drivers
function multiDriver(requests, drivers, thresh){
    var kClos = [];

    //assign to each driver in list "drivers" n/k closest requests to them
    for(let i=0; i<drivers.length; i++){
        var nk = Math.floor(requests.length / drivers.length);
        kClos = kClosest(nk, drivers[i], requests);

        //assign each request in kClos list this driver
        //and add this request to the driver's reqs
        for(let i=0; i<kClos.length; i++){
            kClos[i].addDriver(drivers[i]);
            drivers[i].addRequest(kClos[i]);
        }
    }

    for(let i=0; i<requests.length; i++){
      //if request not assigned, find closest driver and assign to them if not past
      //threshold requests
      if(requests[i].drivers.length == 0){
          var closest = new Driver(0, 0, graph);
          var minDist = 100000000;
          for(let j=0; j<drivers.length; j++){
            //if driver is not past threshold request number
            if(drivers[j].numReq < (requests.length / drivers.size + thresh)){
                 //if driver is closer than the minimum distance seen before
                 if(drivers[j].distToReq(requests[i].startPos) < minDist){
                    //  closest = drivers[j];
                     Object.assign(closest, drivers[j]);
                     minDist = drivers[j].distToReq(requests[i].startPos);
                 }
            }

          }
      }else if(requests[i].drivers.length > 1){
          var bestDriver = new Driver(0,0, graph);
          var minDist = 10000000000;
          //find out which driver has the least distance to each request
          for(let j=0; j<drivers.length; j++){
             if(drivers[j].distToReq(requests[i].startPos) < minDist){
                 Object.assign(bestDriver, drivers[j]);
                 minDist = drivers[j].distToReq(requests[i].startPos);
                }
            }
          //Remove this request from the request lists of the other drivers
          for(let j=0; j<drivers.length; j++){
            if(!drivers[j].equals(bestDriver)){
                drivers[j].remRequest(requests[i]);
                }
            }
          //take out all drivers, add the one with the least requests
          requests[i].drivers = [bestDriver];


        }
    }
    return requests;
}


//Function that runs the alg and displays the data
function run(){
    // For allowing drivers to change their starting locations
    var loc = document.getElementById("from")
    //console.warn(loc.value)

    changeWeight();
    multiDriver(requestList, driverList, 1);
    //for each driver run the algorithm on their request lists
    for(let i=0; i<driverList.length; i++){
        alg(driverList[i].requests, 0,driverList[i].origin, weights[0],weights[1],weights[2]);
        driverList[i].editNumReq(0);
        for(let j=0; j<currServe.length; j++){
            driverList[i].addRequest(currServe[j]);
        }
        currServe = [];
    }
    //for each driver try to fit the unserved requests from above to their schedules
    for(let i=0; i<driverList.length; i++){
        for(let  j=0; j<unserved.length; j++){
            driverList[i].addRequest(unserved[j]);
        }
        unserved = [];
        alg(driverList[i].requests, 0,driverList[i].origin, weights[0],weights[1],weights[2]);
        driverList[i].editNumReq(0);
        for(let j=0; j<currServe.length; j++){
            driverList[i].addRequest(currServe[j]);
        }
        currServe = [];
    }
    // check();
    showData();
    //empty the lists
    checkList = [];
    serveList = [];
    requestList = [];
}



function compare (a, b) {
    if (a.f_value > b.f_value)
        return 1;
    else if (a.f_value === b.f_value)
        return 0;
    else
        return -1;
}

//Deletes the body of the inner html
function show(){
    document.getElementById("body").innerHTML = "";
}



//event listeners
document.getElementById('create').addEventListener('click', createRandomRequest);
document.getElementById('create').addEventListener('click', show);
document.getElementById('createDr').addEventListener('click', generateRandomDrivers);
document.getElementById('run').addEventListener('click', run);

// //create autocomplete objects for all inputs
// var options = {
//     types: ['geocode', 'establishment']
// }

// //Autocomplete for the starting location
// var input1 = document.getElementById("from");
// var autocomplete1 = new google.maps.places.Autocomplete(input1, options);