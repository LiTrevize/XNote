const myclass=require('../myclass')

const ipcRenderer = require('electron').ipcRenderer;



mynote=new myclass.Note()
ipcRenderer.on('loadNote',function(event,note){
    // console.log(note.content)
    // console.log('fjdsklfj')
    // document.getElementById('content').value=note.content
    document.getElementById('content').innerText=note.content
    mynote=note
})

ipcRenderer.on('fetchNote',function(event){
    saveMyNote()
})
ipcRenderer.on('fetchMindmap',function(event){
    saveNotebuffer()
})


function stripHtml(htmlstr=""){
    htmlstr=htmlstr.replace(/<br>/g,"\n")
    htmlstr=htmlstr.replace(/<\/br>/g,"\n")
    htmlstr=htmlstr.replace(/<[^>&^<]+>/g,"")
    return htmlstr
}

// on md2html.js
// ipcRenderer.on('exportTo')

function saveMyNote(){
    mynote.content=document.getElementById('content').innerHTML
    mynote.content=stripHtml(mynote.content)
    // console.log(document.getElementById('content').value)
    // console.log(mynote.content)
    // console.log('save')
    mynote.words=mynote.content.split(' ').join('').length
    ipcRenderer.sendSync('saveNote',mynote)
}

function saveNotebuffer(){
    mynote.content=document.getElementById('content').innerHTML
    mynote.content=stripHtml(mynote.content)
    mynote.words=mynote.content.split(' ').join('').length
    ipcRenderer.sendSync('showMindmap',mynote)
}

