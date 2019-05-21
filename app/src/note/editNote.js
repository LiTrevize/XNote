const myclass=require('../myclass')

const ipcRenderer = require('electron').ipcRenderer;
mynote=new myclass.Note()
ipcRenderer.on('loadNote',function(event,note){
    console.log(note.content)
    console.log('fjdsklfj')
    document.getElementById('content').value=note.content
    mynote=note
})

ipcRenderer.on('fetchNote',function(event){
    saveMyNote()
})
ipcRenderer.on('fetchMindmap',function(event){
    saveNotebuffer()
})



function saveMyNote(){
    mynote.content=document.getElementById('content').value
    // console.log(document.getElementById('content').value)
    // console.log(mynote.content)
    // console.log('save')
    mynote.words=mynote.content.split(' ').join('').length
    ipcRenderer.sendSync('saveNote',mynote)
}

function saveNotebuffer(){
    mynote.content=document.getElementById('content').value
    mynote.words=mynote.content.split(' ').join('').length
    ipcRenderer.sendSync('showMindmap',mynote)
}