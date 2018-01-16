function createToDo(){
  var todo = document.createElement("div");
  var span = document.createElement("span");
  var replaceButton = document.createElement("button");
  var removeButton = document.createElement("button");

  var input = document.getElementById("input").value;
  if (input == "") {
    input = "不要發廢文"
  } 
  span.innerHTML = input;
  todo.appendChild(span);


  replaceButton.onclick = function(){
    var input = document.getElementById("input").value; //為何要再打一次?
     if (input == "") {
    alert("你沒有輸入任何文字");
    return;
  }  
  this.parentNode.firstChild.innerHTML = input;
  document.getElementById("input").value = "";
  }
  replaceButton.textContent = "R";
  todo.appendChild(replaceButton);

  removeButton.onclick = function(){
    this.parentNode.parentNode.removeChild(this.parentNode);
  }
  removeButton.textContent = "V";
  todo.appendChild(removeButton);
}
  var todolist = document.getElementById("todolist");
  todolist.appendChild(todo);
  document.getElementById("input").value = "";
