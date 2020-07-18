var blocks = document.querySelector('.blocks');
var color = "white";
var mousedown = false;
var field = document.querySelector(".blocks");
var current = document.getElementById("current_detector");
var picker = document.getElementById("picker");
var myStorage = window.localStorage;
var save = document.getElementById("save");
var clear_button = document.getElementById("clear");
var if_changed = false;
var fill = document.getElementById("fill");
var if_fill = false;
var brush = document.getElementById("brush");
var clean = document.getElementById("clean");
var if_clean = false;
current.style.background = color;
var if_brush = true;

//*? ask for saving*//
// window.onbeforeunload = function(elem) {
// if(if_changed){
//   if (confirm("The picture doesn't saved! Any changes won't be saved")) {
//     return true
//   } else {
//     return false;
//   }
// }
// };
//*? ------------------------------------------ *//

//*? creating empty bricks and borders*//

var border_right = 0;
var border_left = 0;
for(var i=0; i<1104;i++){
  var child = document.createElement("span");
  child.classList.add('brick')
  border_right++;
  if(border_left==0){
    child.classList.add("border_left")
  }
  border_left++;
  if(border_right==46){
    child.classList.add("border_right")
    border_right = 0;
    border_left = 0;
  }
  blocks.appendChild(child)
}
var bricks = document.querySelectorAll('.brick')

//*? ------------------------------------------ *//

//*? load picture from storage *//

if(myStorage.length > 0){
  const json = myStorage["save"];
  const save_obj = JSON.parse(json);
  for(var i=0; i<bricks.length; i++){
    bricks[i].style.backgroundColor = save_obj[i];
    if(save_obj[i] != ""){
        bricks[i].style.height = "14px";
        bricks[i].style.width = "14px";
        bricks[i].style.marginRight = "2px";
        bricks[i].style.marginLeft = "-3px";
        bricks[i].style.marginTop = "-5px";
    }
  }
}
//*? ------------------------------------------ *//



//*? one click changes*//

bricks.forEach(function(elem, index){
elem.addEventListener('click', function(e){
  if(if_fill){
    fill_function(index, e.target.style.backgroundColor);
  }
  if(if_brush){
    e.target.style.backgroundColor = color;
    e.target.style.height = "14px";
    e.target.style.width = "14px";
    e.target.style.marginRight = "2px";
    e.target.style.marginLeft = "-3px";
    e.target.style.marginTop = "-5px";
  }
  if(if_clean){
    e.target.style.backgroundColor = "";
    e.target.style.height = "10px";
    e.target.style.width = "10px";
    e.target.style.marginRight = "3px";
    e.target.style.marginLeft = "";
    e.target.style.marginTop = "-1px";
  }
  if_changed = true;
  })
//*? ------------------------------------------ *//

//*? brush*//

  document.body.addEventListener("mousedown", function(e){
    mousedown = true;
    e.stopPropagation();
  })
  document.body.addEventListener("mouseup", function(e){
    mousedown = false;
    e.stopPropagation();
  })
  
  field.addEventListener("mousedown", function(e){
    mousedown = true;
    e.stopPropagation();
  })
  field.addEventListener("mouseup", function(e){
    mousedown = false;
    e.stopPropagation();
  })

elem.addEventListener("mousedown", function(e){
  mousedown = true;
  e.stopPropagation();
})

elem.addEventListener("mouseup", function(e){
  mousedown = false;
  e.stopPropagation();
})

elem.addEventListener("mouseenter", function(e){
  if(mousedown && !if_fill && if_brush){
    e.target.style.backgroundColor = color;
    e.target.style.height = "14px";
    e.target.style.width = "14px";
    e.target.style.marginRight = "2px";
    e.target.style.marginLeft = "-3px";
    e.target.style.marginTop = "-5px";
    if_changed = true;
  }
})
})

brush.addEventListener("click", function(){
  setCursorByID("blocks", "default");
  if_fill = false;
  if_clean = false;
  if_brush = true;
 })

//*? ------------------------------------------ *//

//*? colors panel*//

picker.addEventListener("input", function(e){
  e.target.setAttribute("value", e.target.value);
  color = e.target.value;
  current.style.background = color;
})

document.querySelectorAll('.color').forEach(function(elem){
  elem.addEventListener('click', function(e){
    color = e.target.style.backgroundColor
    current.style.background = color;
  })
})
//*? ------------------------------------------ *//


//*? right buttom options*//

save.addEventListener("click", function(){  
  myStorage.clear();
  var line = [];
  bricks.forEach(function(e){ 
    line.push([e.style.backgroundColor]);
  })
 myStorage.setItem("save", JSON.stringify(line));
 if_changed = false;
})

clear_button.addEventListener("click", function(){
  bricks.forEach(function(e){
    e.style.backgroundColor = "";
    e.style.height = "10px";
    e.style.width = "10px";
    e.style.marginRight = "3px";
    e.style.marginLeft = "";
    e.style.marginTop = "-1px";
  })
  if_changed = false;
})
//*? ------------------------------------------ *//

//*? TOOLS panel without brush*//

fill.addEventListener("click", function(){
  setCursorByID("blocks", "crosshair ");
  if_fill = true;
  if_clean = false;
  if_brush = true;
})

function setCursorByID(id,cursorStyle) {
  var elem;
  if (document.getElementById &&
     (elem=document.getElementById(id)) ) {
   if (elem.style) elem.style.cursor=cursorStyle;
  }
 }

 var fill_function = function(index, field_color){
  bricks[index].style.backgroundColor = color
  bricks[index].style.height = "14px";
  bricks[index].style.width = "14px";
  bricks[index].style.marginRight = "2px";
  bricks[index].style.marginLeft = "-3px";
  bricks[index].style.marginTop = "-5px";
  if(bricks[index-46]){
    if(bricks[index-46].style.backgroundColor == field_color)
      fill_function(index-46, field_color);
  }
  if(bricks[index-1]){
    if(bricks[index-1].style.backgroundColor == field_color){
      if(!bricks[index-1].classList.toString().includes("border_right"))
        fill_function(index-1, field_color);
    }
  }
  if(bricks[parseInt(index)+1]){
    if(bricks[parseInt(index)+1].style.backgroundColor == field_color){
      if(!bricks[parseInt(index)+1].classList.toString().includes("border_left"))
       fill_function(parseInt(index)+1, field_color);
    }
  }
  if(bricks[parseInt(index)+46]){
      if(bricks[parseInt(index)+46].style.backgroundColor == field_color)
        fill_function([parseInt(index)+46], field_color);
  }
  else
    return;
 }

 clean.addEventListener("click", function() {
  setCursorByID("blocks", "not-allowed");
  if_fill = false;
  if_clean = true;
  if_brush = false;
 })
 //*? ------------------------------------------ *//