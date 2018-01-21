 var state = true;
function togglelight() {
  var image = document.getElementById("image");
  state = !state;
  image.src = state? "img/on.jpg" : "img/off.jpg";
}

function input_time_number() {
  var time_input = document.getElementById("time_input").value;
  if (time_input == ""){
    alert ("不能是空的");
  } else if (isNaN(time_input)) {
    alert ("請輸入數字");
  } else {
   var timeLeft = parseInt(time_input);    
  }
  
 function countDownTimer() {
   timeLeft = timeLeft - 1;
  if (timeLeft <= 0) {
    document.getElementById("image").src = "img/off.jpg";
    clearInterval(setting);
  }

  document.getElementById("timer").innerHTML = timeLeft; 
   
}
var setting =  setInterval(countDownTimer,1000);
}

