// Code taken and copied from elsewhere in the program for simplicity

var arr = new Array();
        
function getData(){
    var str = localStorage.getItem("RequestList");
    if(str != null){
        arr = JSON.parse(str);
    }
   console.warn(arr);
}



function showData(){
    getData();
    console.warn(arr);

    var counter = 1;

    var table = document.getElementById("table");
    for(let i = 0; i<arr.length+1; i++){
        if(arr[i]){
            for(let j = 0; j<arr[i].length; j++){
            var r = table.insertRow();
            var requestNum = r.insertCell();
            var startPosition = r.insertCell();
            var finishPosition = r.insertCell();
            var pickTime = r.insertCell();
            var d = r.insertCell();


            requestNum.innerHTML = "Request " + counter;
            startPosition.innerHTML += arr[i][j].startPos;
            finishPosition.innerHTML += arr[i][j].finishPos;
            pickTime.innerHTML += arr[i][j].hour + ':' + arr[i][j].minute + ' '+ arr[i][j].tod;
            d.innerHTML += '<button class="delete" onclick="deleteRow(this)">DELETE</button>';
            
            counter ++;
         }
        }
    }
}

showData();

function reservedMethod(m){
    if(m=='Pick Up Time'){
        return ' Pick up time: ';
    }
    return ' Drop off time: '
}

function deleteRow(o) {
    var p=o.parentNode.parentNode;
    p.parentNode.removeChild(p);
}



