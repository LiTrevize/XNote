const myclass=require('../myclass')

const ipcRenderer = require('electron').ipcRenderer;
mynote=new myclass.Note()
ipcRenderer.on('loadNote',function(event,note){
    console.log(note.content)
    console.log('fjdsklfj')
    document.getElementById('content').innerHTML=note.content
    mynote=note
})

ipcRenderer.on('saveNote',function(event){
    mynote.content=document.getElementById()
})