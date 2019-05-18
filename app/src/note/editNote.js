const myclass=require('../myclass')

const ipcRenderer = require('electron').ipcRenderer;
mynote=new myclass.Note()
ipcRenderer.on('loadNote',function(event,note){
    console.log(note.content)
    console.log('fjdsklfj')
    document.getElementById('content').innerHTML=note.content
    mynote=note
})

$('.search-button').click(function(){
    $(this).parent().toggleClass('open');
  });