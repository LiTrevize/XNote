$('.member-title').click(function(e) {
  console.log("Clicked");
  $(this).next().slideToggle();
  $(this).next().next().next().slideToggle();
})

const ipcRenderer=require('electron').ipcRenderer
ipcRenderer.on('loadtl',function(event,myBook){
  // console.log('load timeline')
  for(var i=0; i < myBook.notes.length;i++){
    document.getElementById("TL").innerHTML+="<li class=\"event\" data-date="+myBook.notes[i].lastOpen+"><div class=\"member-infos\"><h1 class=\"member-title\">"+myBook.notes[i].title+"<\/h1><h2 class=\"member-introduction \"><\/span>文件介绍<br><br><\/h2><ul class=\"member-contact\"><li class=\"member-hire\"><a class=\"entypo-mail\" target=\"_blank\" href=\"mailto:\/\/barney@barneyparker.com\"><\/a><\/li><\/ul><div class=\"member-parameters\"><span class=\"follow entypo-plus\"><\/span><span class=\"options entypo-cog\"><\/span><ul class=\"member-socials\"><li class=\"member-words-number\"><a>"+myBook.notes[i].words+"<\/a><span class=\"words-number\">words<\/span><\/li><li class=\"member-follower\"><a>"+myBook.notes[i].TotalTime+"<\/a> <span class=\"followers\">hours<\/span><\/li><\/ul><\/div><\/div><\/li>";
  }
  document.getElementById("slide").innerHTML="$('.member-title').click(function(e) {console.log('Clicked');$(this).next().slideToggle();$(this).next().next().next().slideToggle();})"
})