const myclass=require('./myclass')
const ipcRenderer=require('electron').ipcRenderer

function openNote(noteid){
  console.log("open note")
  ipcRenderer.send("openNote",noteid)
}
function setInfo(noteid){
  console.log("setInfo")
  var item = document.getElementById(noteid).getElementsByClassName("member-infos")[0]
  var name = item.getElementsByClassName("member-title")[0]
  var intro = item.getElementsByClassName("member-introduction")[0]
  name.setAttribute("contenteditable","true")
  intro.setAttribute("contenteditable","true")
  var icon = item.getElementsByClassName("options entypo-cog")[0]
  //console.log(icon)
  icon.setAttribute("onclick", "confirmSet("+noteid+")")
  //console.log(icon)
}


function confirmSet(noteid){
  console.log("confirmSet")
  //ipcRenderer.send("confirmSet",noteid)
  var item = document.getElementById(noteid).getElementsByClassName("member-infos")[0]
  var name = item.getElementsByClassName("member-title")[0]
  var intro = item.getElementsByClassName("member-introduction")[0]
  name.setAttribute("contenteditable","false")
  intro.setAttribute("contenteditable","false")
  var icon = item.getElementsByClassName("options entypo-cog")[0]
  //console.log(icon)
  icon.setAttribute("onclick", "setInfo("+noteid+")")
  //console.log(icon)
  console.log(name.innerHTML,intro.innerHTML)
  ipcRenderer.send("confirmSet",noteid,name.innerHTML,intro.innerHTML)
}

ipcRenderer.on('loadtl',function(event,mybook=new myclass.NoteList()){
  // console.log('load timeline')
  document.getElementById("TL").innerHTML=""
  var myBook=new myclass.NoteList()
  myBook.notes=mybook.notes
  for(var i=0; i < myBook.notes.length;i++){
    document.getElementById("TL").innerHTML+='<li id=\"'+ i + '\" class=\"event\" data-date=\" '+myBook.toStrTime(myBook.notes[i].lastOpen)+"\"><div class=\"member-infos\"><h1 class=\"member-title\" contenteditable=\"false\">"+myBook.notes[i].title+"<\/h1><h2 class=\"member-introduction \" contenteditable=\"false\" ><\/span>"+myBook.notes[i].desc+"<br><br><\/h2><ul class=\"member-contact\"><li class=\"member-hire\"><a class=\"entypo-mail\" target=\"_blank\" href=\"mailto:\/\/barney@barneyparker.com\"><\/a><\/li><\/ul><div class=\"member-parameters\"><span class=\"follow entypo-plus \""+"onclick='openNote("+i+")'"+"><\/span><span class=\"options entypo-cog\" onclick=\"setInfo("+i+")\"><\/span><ul class=\"member-socials\"><li class=\"member-words-number\"><a>"+myBook.notes[i].words+"<\/a><span class=\"words-number\">words<\/span><\/li><li class=\"member-follower\"><a>"+(myBook.notes[i].TotalTime/60000).toFixed(2)+"<\/a> <span class=\"followers\">minutes<\/span><\/li><\/ul><\/div><\/div><\/li>";
  }
  document.getElementById("slide").innerHTML="$('.member-title').click(function(e) {console.log('Clicked');$(this).next().slideToggle();$(this).next().next().next().slideToggle();})"
})

ipcRenderer.on('reload',function(event){
  window.location.replace('home.html')
})