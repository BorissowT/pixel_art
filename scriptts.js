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
var undo_button = document.getElementById("undo");
var undo_list = []
var count_collection = []
var brush_collection = 0;
var eye_dropper = document.getElementById("dropper")
var if_drop = false;
var load = document.getElementById("load")


//*? ask for saving*//
window.onbeforeunload = function(elem) {
if(if_changed){
  if (confirm("The picture doesn't saved! Any changes won't be saved")) {
    return true
  } else {
    return false;
  }
}
};
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
  const json = myStorage[myStorage.key(myStorage.length-1)];
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

//*? mouse listeners ///
document.body.addEventListener("mousedown", function(e){
    mousedown = true;
    e.stopPropagation();
  })
  document.body.addEventListener("mouseup", function(e){
    mousedown = false;
    if(brush_collection!=0)
      count_collection.push(brush_collection);
    brush_collection = 0;
    e.stopPropagation();
  })

field.addEventListener("mousedown", function(e){
  mousedown = true;
  e.stopPropagation();
})
field.addEventListener("mouseup", function(e){
  mousedown = false;
  if(brush_collection!=0)
    count_collection.push(brush_collection);
  brush_collection = 0;
  e.stopPropagation();
})

//*? ------------------------------------------*//

//*? one click changes*//

bricks.forEach(function(elem, index){
  elem.addEventListener('click', function(e){
    if(if_fill){
      fill_function(index, e.target.style.backgroundColor);
      count_collection.push(brush_collection);
      brush_collection = 0;
      if_changed = true;
    }
    if(if_brush){
      undo_list.push({"before":e.target.style.backgroundColor,"coordinates":index});
      brush_collection++;
      count_collection.push(brush_collection);
      brush_collection = 0;
      e.target.style.backgroundColor = color;
      e.target.style.height = "14px";
      e.target.style.width = "14px";
      e.target.style.marginRight = "2px";
      e.target.style.marginLeft = "-3px";
      e.target.style.marginTop = "-5px";
      if_changed = true;
    }
    if(if_clean){
      undo_list.push({"before":e.target.style.backgroundColor,"coordinates":index});
      brush_collection++;
      count_collection.push(brush_collection);
      brush_collection = 0;
      e.target.style.backgroundColor = "";
      e.target.style.height = "10px";
      e.target.style.width = "10px";
      e.target.style.marginRight = "3px";
      e.target.style.marginLeft = "";
      e.target.style.marginTop = "-1px";
      if_changed = true;
    }
    if(if_drop){
      color = e.target.style.backgroundColor;
      current.style.background = color;
    }
    })
//*? ------------------------------------------ *//

//*? brush*//

  elem.addEventListener("mousedown", function(e){
    mousedown = true;
    e.stopPropagation();
    
  })

  elem.addEventListener("mouseup", function(e){
    mousedown = false;
    if(brush_collection!=0)
      count_collection.push(brush_collection);
    brush_collection = 0;
    e.stopPropagation();
  })

  elem.addEventListener("mouseenter", function(e){
    if(mousedown && !if_fill && if_brush){
      undo_list.push({"before":e.target.style.backgroundColor,"coordinates":index})
      brush_collection++;
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
  if_brush = set_tool();
 })

//*? ------------------------------------------ *//



//*? right buttom options*//
function removeSpaces(string) {
  return string.split(' ').join('');
 }

save.addEventListener("click", function(){  
  try{
    var close_close = document.querySelector(".close_menu");
    var menu_close = document.querySelector(".options");
    close_close.remove();
    menu_close.remove();
  }
  catch(TypeError) {
  }
  var menu = document.createElement("div");
  var close_menu = document.createElement("div");
  menu.classList.add('options');
  close_menu.classList.add("close_menu");
  close_menu.addEventListener("click", function(e){
    close_menu.remove();
    menu.remove();
  })
  var save_area = document.createElement("input");   
  save_area.setAttribute("onblur", "this.value=removeSpaces(this.value);")
  save_area.classList.add('save_area');
  var submit = document.createElement("input");
  submit.setAttribute("type", "button");
  submit.setAttribute("value", "save");
  submit.classList.add('submit');
  submit.addEventListener("click", function(){
    var line = [];
    bricks.forEach(function(e){
      line.push([e.style.backgroundColor]);
    })
    myStorage.setItem(save_area.value, JSON.stringify(line));
    console.log(myStorage[save_area.value]);
    menu.remove();
    close_menu.remove();
  })
  menu.appendChild(save_area);
  menu.appendChild(submit);
  document.body.appendChild(close_menu);
  document.body.appendChild(menu);
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

load.addEventListener("click", function(){
  try{
    var close_close = document.querySelector(".close_menu");
    var menu_close = document.querySelector(".options");
    var buttons_load_close = document.querySelector(".buttons_load");
    close_close.remove();
    menu_close.remove();
    buttons_load_close.remove();
  }
  catch(TypeError) {
  }
  var menu = document.createElement("div");
  var close_menu = document.createElement("div");
  menu.classList.add('options');
  close_menu.classList.add("close_menu");
  document.body.appendChild(menu);
  document.body.appendChild(close_menu);
  for (var i = 0; i < myStorage.length; i++) {
    var option = document.createElement("div");
    option.textContent = myStorage.key(i);
    option.classList.add("option");
    option.addEventListener("click", function(e){
      try{
        var buttons_load_close = document.querySelector(".buttons_load");
        buttons_load_close.remove();
      }
      catch(TypeError) {
      }
      var buttons_load = document.createElement('div');
      buttons_load.classList.add("buttons_load");
      document.body.appendChild(buttons_load);
      var load_button = document.createElement('input');
      var delete_button = document.createElement("input");
      load_button.setAttribute("type", "button");
      load_button.setAttribute("value", "load");
      load_button.classList.add('submit');
      delete_button.setAttribute("type", "button");
      delete_button.setAttribute("value", "delete");
      delete_button.classList.add('submit');
      buttons_load.appendChild(load_button);
      buttons_load.appendChild(delete_button);

      load_button.addEventListener("click", function(){
        const json = myStorage[e.target.textContent];
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
          else{
            bricks[i].style.backgroundColor = "";
            bricks[i].style.height = "10px";
            bricks[i].style.width = "10px";
            bricks[i].style.marginRight = "3px";
            bricks[i].style.marginLeft = "";
            bricks[i].style.marginTop = "-1px";
          }
        }
      })
      delete_button.addEventListener("click", function(){
        myStorage.removeItem(e.target.textContent);
        buttons_load.remove();
        menu.remove();
        close_menu.remove();
      })
      
    })
    menu.appendChild(option);
  }
  close_menu.addEventListener("click", function(e){
    var buttons_load_close = document.querySelector(".buttons_load");
    close_menu.remove();
    menu.remove();
    try{
      buttons_load_close.remove();
    }
    catch{
    }
  })
})


//*? ------------------------------------------ *//

//*? TOOLS panel without brush*//

var set_tool = function(){
  if_fill = false;
  if_clean = false;
  if_brush = false;
  if_drop = false;
  return true;
}

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

fill.addEventListener("click", function(){
  setCursorByID("blocks", "crosshair ");
  if_fill = set_tool();
})

function setCursorByID(id,cursorStyle) {
  var elem;
  if (document.getElementById &&
     (elem=document.getElementById(id)) ) {
   if (elem.style) elem.style.cursor=cursorStyle;
  }
 }

 var fill_function = function(index, field_color){
  brush_collection++;
  undo_list.push({"before":bricks[index].style.backgroundColor,"coordinates":parseInt(index)});
  bricks[index].style.backgroundColor = color;
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
  if_clean = set_tool();
 })

 undo_button.addEventListener("click", function(){
  var pixels = count_collection.pop();
  var length = undo_list.length;

  for(var i=length-1; i>=(length)-pixels; i--){
    var pixel = undo_list.pop();
    if(pixel["before"]!=""){
      bricks[pixel["coordinates"]].style.backgroundColor = pixel["before"];
      bricks[pixel["coordinates"]].style.height = "14px";
      bricks[pixel["coordinates"]].style.width = "14px";
      bricks[pixel["coordinates"]].style.marginRight = "2px";
      bricks[pixel["coordinates"]].style.marginLeft = "-3px";
      bricks[pixel["coordinates"]].style.marginTop = "-5px";
    }
    else{
      bricks[pixel["coordinates"]].style.backgroundColor = "";
      bricks[pixel["coordinates"]].style.height = "10px";
      bricks[pixel["coordinates"]].style.width = "10px";
      bricks[pixel["coordinates"]].style.marginRight = "3px";
      bricks[pixel["coordinates"]].style.marginLeft = "";
      bricks[pixel["coordinates"]].style.marginTop = "-1px";
    }
  }
 })

 eye_dropper.addEventListener("click", function(){
  setCursorByID("blocks", "help");
  if_drop = set_tool();
 })
 //*? ------------------------------------------ *//