function validate(){
  var code = document.getElementById("nric").value;
  if (code == "") {
    alert("內容是空的！"); 
  }
  else if (!isNaN(code)) {
    alert("內容不能是數字!"); 
  }
  else if (code.length !=10 ) {
    alert("長度不正確")
  }
  else {
    document.getElementById("result").innerHTML = "通過驗證";
  }
}