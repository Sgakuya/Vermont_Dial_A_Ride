var requests = JSON.parse(localStorage.getItem('RequestList'));

var index = 0;
    
if (!requests){
  requests = [[]];
}

while(requests[index]){
    index++;
}

var smallList = [];

console.warn(requests);

const addRequest = (ev)=>{
    ev.preventDefault();
    requests.push(smallList);
    console.warn('added', {requests});
    localStorage.setItem('RequestList', JSON.stringify(requests));
    document.location = 'ReservedPage.html'
}

function printAndSave(){
    
    //Request in requests
    let request = {
        startPos: document.getElementById('startPos').value,
        finishPos: document.getElementById('finishPos').value,
        hour: document.getElementById('hours').value,
        minute: document.getElementById('minutes').value,
        tod: document.getElementById('tod').value,
        method: document.getElementById('requestMethod').value,
        pickTime: 0,
        finishTime: 0
      }

      /*
      For converting the input into a picktime our algorithm can handle
      */
      if(request.tod == 'AM'){
        if(request.hour == 12){
          if(request.method == "Pick Up Time"){
            request.pickTime = (parseInt(request.hour)*0 + parseInt(request.minute)/10);
          }else{
            request.finishTime = (parseInt(request.hour)*0 + parseInt(request.minute)/10);
          }
        }else{
          if(request.method == "Pick Up Time"){
            request.pickTime = (parseInt(request.hour)*6 + parseInt(request.minute)/10);
          }
          request.finishTime = (parseInt(request.hour)*6 + parseInt(request.minute)/10);
        }
        
      }else{ //request hour = PM
        if(request.hour == 12){
          if(request.method == "Pick Up Time"){
            request.pickTime = (parseInt(request.hour)*0 + parseInt(request.minute)/10 + 72);
          }
          request.finishTime = (parseInt(request.hour)*0 + parseInt(request.minute)/10 + 72);
        }else{
          if(request.method == "Pick Up Time"){
            request.pickTime = (parseInt(request.hour)*6 + parseInt(request.minute)/10 + 72);
          }
          request.finishTime = (parseInt(request.hour)*6 + parseInt(request.minute)/10 + 72);
      } 
    }
    
    myFunction();
    smallList.push(request);
    //clear for next input
    document.getElementById('startPos').value = '';
    document.getElementById('finishPos').value = '';
    document.getElementById('hours').value = '';
    document.getElementById('minutes').value = '';
    document.getElementById('tod').value = '';
}

function myFunction() {
    document.getElementById("demo").innerHTML += "Your Request: " + '<br>';
    document.getElementById("demo").innerHTML += "Starting Position: " + document.getElementById("startPos").value + '<br>';  
    document.getElementById("demo").innerHTML += "Finishing Position: " +  document.getElementById("finishPos").value + '<br>';
    document.getElementById("demo").innerHTML += document.getElementById('requestMethod').value + ": " + document.getElementById("hours").value + ':' + document.getElementById('minutes').value+ ' ' + document.getElementById('tod').value + '<br><br>';
  }



function re(){
    smallList = [];
    document.getElementById("demo").innerHTML = '';
}

function reserveMethod(){
  document.getElementById("mtd").innerHTML = document.getElementById('requestMethod').value;
}

document.querySelector('select').addEventListener('change', reserveMethod);
  

document.addEventListener('DOMContentLoaded', ()=>{
  document.getElementById('btn').addEventListener('click', addRequest);
 // document.getElementById('bt').addEventListener('click', printAndSave);
  //document.getElementById('rmv').addEventListener('click', reset());
});

