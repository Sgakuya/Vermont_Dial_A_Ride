import{Graph,Vertex,Edge,BusPath,BusRoute} from './Graph.js';
import{Request1D}from './Request.js'
var graph = new Graph();
var requestList = [];
var weights = [0,0,0];
var serveList = [];


function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

function createRandomRequest(){
    document.getElementById("demo").innerHTML = "";
    document.getElementById("demo").innerHTML += "The Random Requests Generated: " + '<br>';
    requestList = [];
    let numRequest = document.getElementById('num').value;
    for(let i = 0;i<numRequest;i++){
        var p = getRandomInt(2);
        var prob = getRandomInt(10)+1;
        var time;
        
        //Assigning time of the request
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
            var request = new Request1D(s,d,time*10,false,graph);
            requestList.push(request);
        }else{
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
                
               
                alg(temp,0,"Middlebury College",i,j,k);

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

function showData(){
    var counter = 1;

    var table = document.getElementById("body");
    for(let i = 0; i<serveList.length; i++){
            var r = table.insertRow();
            var requestNum = r.insertCell();
            var startPosition = r.insertCell();
            var finishPosition = r.insertCell();
            var pickTime = r.insertCell();
            var d = r.insertCell();
            var shift = r.insertCell();


            requestNum.innerHTML = "Request " + counter;
            startPosition.innerHTML += serveList[i].startPos;
            finishPosition.innerHTML += serveList[i].finishPos;
            pickTime.innerHTML += Math.floor(serveList[i].pickTime/60) + ':' +  ((serveList[i].pickTime%60 < 10) ? ("0" + serveList[i].pickTime%60) : serveList[i].pickTime%60);
            d.innerHTML += Math.floor(serveList[i].finishTime/60) + ":" + ((serveList[i].finishTime%60 < 10) ? ("0" + serveList[i].finishTime%60) : serveList[i].finishTime%60);
            shift.innerHTML += serveList[i].shift + " min earlier";
            
            counter ++;
    }
}


function run(){
    changeWeight();
    alg(requestList,0,"Middlebury College",weights[0],weights[1],weights[2]);
    showData();
    //empty the lists
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


function show(){
    document.getElementById("body").innerHTML = "";
}




document.getElementById('create').addEventListener('click', createRandomRequest);
document.getElementById('create').addEventListener('click', show);
document.getElementById('run').addEventListener('click', run);
