var information = JSON.parse(localStorage.getItem('DispatcherLogin'));
  if(!information){
     information = [];
  }
  console.log(typeof information);
  console.warn(information);


//for validating a log in attempt
  function validate(){
    if(document.getElementById('username').value == 'llorenz'
    && document.getElementById('password').value == 'password'){
      checkBox(); // check to see if the username and password want to be stored
      location.href = 'DispatcherInterface.html';
    }else if(document.getElementById('username').value == 'hluo'
    && document.getElementById('password').value == 'password'){
      checkBox(); // check to see if the username and password want to be stored
      location.href = 'DispatcherInterface.html';
    }else if(document.getElementById('username').value == 'achristman'
    && document.getElementById('password').value == 'password'){
      checkBox(); // check to see if the username and password want to be stored
      location.href = 'DispatcherInterface.html';
    }
    else{
      alert("Incorrect Username or Password");
    }
  }

  
  //for storing the username and password
  function checkBox(){
    console.warn(document.getElementById('rememberMe').checked);
    if(document.getElementById('rememberMe').checked == true){
      let info = {
        username: document.getElementById('username').value,
        password: document.getElementById('password').value
      }
      if(!exist(info.username)){
        information.push(info);
      }
      localStorage.setItem('DispatcherLogin', JSON.stringify(information));
    }
  }

  function exist(username){
        for(let i =0;i<information.length;i++){
            if(username == information[i].username){
                return true;
            }
        }
        return false;
  }

  function key(){
      if(typeof information[0] == undefined){
          return '';
      }else{
        return information[0].password;
      }
}


  document.getElementById("password").value = key();
