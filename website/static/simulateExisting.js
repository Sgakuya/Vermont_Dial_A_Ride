import{graphNew} from './graphNew.js';
import{RequestNew} from './RequestNew.js';

var graph = new graphNew();
var rList = [];
var weights = [0,0,0];
var serveList = [];

var table = document.getElementsByTagName('table')[0],
rows = table.getElementsByTagName('tr'),
text = 'textContent' in document ? 'textContent' : 'innerText';

for (var i = 1, len = rows.length; i < len; i++) {
  rows[i].children[0][text] = i + rows[i].children[0][text];
}

//put the data in table into requestList
var tableObj = document.getElementById("table");
var rows = tableObj.getElementsByTagName("tr"); 
var requestList = [];

//Change the time to pure number
var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
function formatTime(date){
  //['Nov. 25', ' 2021', '9:30 a.m.']
  //['Jan. 9', ' 2022', '11:09 p.m.']
  var dateArray = date.split(",");
  var year = parseInt(dateArray[1].substr(1,4));
  var time = dateArray[2].substr(1);// 1:09 p.m.
  var tod = time.substr(time.length-4);
  var min = time.substr(time.length-7);
  if(time.length>9) {
    var hour=time.substr(0,2);
    var tod = time.substr(time.length-4);
  }
  else if(time.length<=9){
    var hour=time.substr(0,1);
  }

  var month = months.indexOf(dateArray[0].substr(0,3))+1;
  var day = parseInt(dateArray[0].substr(4));
  
  
  if(tod==="a.m."){
    var mintotal = parseInt(hour)*60 + parseInt(min);
  }else if(tod==="p.m."){
    var mintotal = (parseInt(hour)+12)*60 + parseInt(min);
  }

  //2021-0000-0000 + 9-00-0000 + 25 0000 + 570
  return year*100000000 + month*1000000 + day*10000 + mintotal;
  //return dateArray;
} 

function formatDuration(str){
  //[1,hour,16,mins]
  var dArray = str.split(" ");
  if(dArray.length > 2)
    return parseInt(dArray[0])*60 + parseInt(dArray[2]);
  else return parseInt(dArray[0]);
}


function getContent(){
  for(var i=1; i< rows.length ; i++){
    var cells = rows[i].getElementsByTagName("td");
    var startPos = cells[1].innerText;
    var finishPos = cells[2].innerText;
    var pickTime = formatTime(cells[3].innerText);
    var Duration = formatDuration(cells[4].innerText);
    var Rider = cells[5].innerText;
    var username = cells[6].innerText;

    const request = {
      startPos : startPos,
      finishPos : finishPos,
      pickTime : pickTime,
      finishTime : pickTime+Duration,
      Rider : Rider,
      username : username
    };
    requestList.push(request);
  }
}

function compare (a, b) {
  if (a.finishTime > b.finishTime)
    return 1;
  else if (a.finishTime === b.finishTime)
    return 0;
  else
    return -1;
}


var serveList = [];
function run(){
  getContent();
  requestList.sort(compare);
  serveList.push(requestList[0]);
  console.log(serveList);
  for(var i=1; i< requestList.length ; i++){
    //Conflict
    if (requestList[i].pickTime > requestList[i-1].finishTime){
      serveList.push(requestList[i]);
    }
  }
  console.log(serveList);
  var counter = 1;

  var table = document.getElementById("body");
  for(let i = 0; i<serveList.length; i++){
  //Inserting cells
  var r = table.insertRow();
  var requestNum = r.insertCell();
  var startPosition = r.insertCell();
  var finishPosition = r.insertCell();
  var pickTime = r.insertCell();
  var finishTime = r.insertCell();
  var Rider = r.insertCell();
  var Username = r.insertCell();


  //inputting data ainto those cells 
  requestNum.innerHTML = counter;
  startPosition.innerHTML += serveList[i].startPos;
  finishPosition.innerHTML += serveList[i].finishPos;
  pickTime.innerHTML += changeBack(serveList[i].pickTime);
  finishTime.innerHTML += changeBack(serveList[i].finishTime);
  Rider.innerHTML += serveList[i].Rider;
  Username.innerHTML += serveList[i].username;

  counter ++;
  }
}

// FUNCTION
// 
// 
function run2(){
  getContent();
  
  let newList = [];
  let newList2 = []; 

  for(let i = 0; i<requestList.length; i++){
  
      if(newList.indexOf(requestList[i].startPos) == -1){
        newList.push(requestList[i].startPos);
        newList2.push(splitAndFormat(requestList[i].startPos));
      }
      if(newList.indexOf(requestList[i].finishPos) == -1){
        newList.push(requestList[i].finishPos);
        newList2.push(splitAndFormat(requestList[i].finishPos));
      }
   

  }
  console.log(newList);
  console.log(newList2);
  
  const service = new google.maps.DistanceMatrixService(); // instantiate Distance Matrix service
  const matrixOptions = {
origins: newList,
destinations: newList,

travelMode: 'DRIVING',
unitSystem: google.maps.UnitSystem.IMPERIAL
};
// Call Distance Matrix service
service.getDistanceMatrix(matrixOptions, callback);

// Callback function used to process Distance Matrix response
function callback(response, status) {
if (status !== "OK") {
  alert("Error with distance matrix");
  return;
}
console.log(response);
const output = document.querySelector('#result');

for (var f = 0; f < newList2.length; f++) {
  {
      graph.locations.push(newList2[f]);
      graph.addVertex(newList2[f], f);
  };
}

for(let i =0; i<response.rows.length; i++){
    for(let j = 0; j<response.rows[0].elements.length; j++){
        // console.log(response.destinationAddress);
    
    var weight = formatDuration(response.rows[i].elements[j].duration.text);

   
    
    console.log("Adding Edge from: " + splitAndFormat(response.originAddresses[i]) + " to: " + splitAndFormat(response.destinationAddresses[j]) + " weight: " + weight);
    graph.addEdge((function (m, k) { return m[k] === undefined ? null : m[k]; })(graph.vtMap, splitAndFormat(response.originAddresses[i])), (function (m, k) { return m[k] === undefined ? null : m[k]; })(graph.vtMap, splitAndFormat(response.destinationAddresses[j])), weight);

    }
}
console.log(graph.printEdges());

console.log("Creating rLIST");
for(var i=0;i<requestList.length;i++){
    rList.push(new RequestNew(splitAndFormat(requestList[i].startPos),splitAndFormat(requestList[i].finishPos),requestList[i].pickTime,graph,requestList[i].Rider,requestList[i].username));
    console.log(rList[i]);
}

changeWeight();
alg(rList,0,"Middlebury",weights[0],weights[1],weights[2]);

//WORKS WITHOUT CHANGEWEIGHT
//alg(rList,0,"Middlebury",0,1,0);
console.log(serveList);
showData();
//empty the lists
serveList = [];
rList = [];

}
}

function changeBack(num){
  var year = Math.floor((num/100000000)).toString();
  num = num%(100000000);
  var month = Math.floor((num/1000000)).toString();
  num = num%(1000000);
  var day = Math.floor((num/10000)).toString();
  num = num%(10000);
  var hourmin = Math.floor(num/60) + ':' +  ((num%60 < 10) ? ("0" + num%60) : num%60);
  return year + "-" + month + "-" + day + " " + hourmin;
}

function splitAndFormat(loc){
    var l = loc.split(",")[0];
    if(l.substr(l.length-2)=="Rd"){
        l = l.substr(0,l.length-2) + "Road";
    }
    return l;
}

function changeWeight(){
    var maxSize = 0;

    for(var i=0;i<=6;i++){
        for(var j=0;j<=9;j++){
            for(var k=0; k<=10;k++){
                var temp = [];
                for(var m = 0;m<rList.length;m++){
                    var n = new RequestNew(rList[m].startPos,rList[m].finishPos,rList[m].pickTime,graph,rList[m].rider,rList[m].username);
                    temp.push(n);
                }
                
       
                alg(temp,0,"Middlebury",i,j,k);

                if(serveList.length>maxSize){
                    // console.warn("serveList is greater than the max size with weights of: " + i + " " + j + " " + k);
                    weights[0] = i;
                    weights[1] = j;
                    weights[2] = k;
                    maxSize = serveList.length;
                }
                serveList = [];
            }
        }
    }
    console.warn("Weights used: " + weights[0] + " " + weights[1] + " " + weights[2]);
}

function alg(list,time,origin,w1,w2,w3){
  
    for(var i=0;i<list.length;i++){
        list[i].setf(w1,w2,w3,graph.getEdgeWeight(origin,list[i].startPos),list[i].finishTime,list[i].getX3(list,graph));
    }
    
    list.sort(compare);

    //remove all the illegal requests
    for(var i=0;i<list.length;i++){
        var r = list[i];

        if(r.pickTime<time){
            list.splice(i,1);
            i--;
            continue;
        }
        if(graph.getEdgeWeight(origin,r.startPos)+time>r.pickTime){
            list.splice(i,1);
            i--;
        }
    }

    if(list.length>0){
        var r = list[0];
        var T = (r.pickTime-time) - graph.getEdgeWeight(origin,r.startPos);
        if(T<=30 && T>=0){
            r.finishTime -= T;
            r.pickTime -= T;
            r.shift = T;
        }else if(T>30){
            r.finishTime -= 30;
            r.pickTime -= 30;
            r.shift = 30;
        }

        
        serveList.push(r);
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
          var finishTime = r.insertCell();
          var shift = r.insertCell();
          var rider = r.insertCell();
          var username = r.insertCell();


          //inputting data ainto those cells 
          requestNum.innerHTML = "Request " + counter;
          startPosition.innerHTML += serveList[i].startPos;
          finishPosition.innerHTML += serveList[i].finishPos;
          pickTime.innerHTML += changeBack(serveList[i].pickTime);
          finishTime.innerHTML += changeBack(serveList[i].finishTime);
          shift.innerHTML += serveList[i].shift + " min earlier";
          rider.innerHTML += serveList[i].rider;
          username.innerHTML += serveList[i].username;
          
          counter ++;
  }
}

document.getElementById('run').addEventListener('click', run2);