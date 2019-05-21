// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.


// Open the test page, method 1
// var ipc=require('electron').ipcRenderer
// function bclick(){
//   alert('click')
//   ipc.send('button-click',7)
// }

// Open the test page, method 2
function openPage(page){
    var remote=require('electron').remote
    var BrowserWindow=remote.BrowserWindow
    var win=new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
          nodeIntegration: true
        }
      })
    win.loadFile('./src/'+page)
    win.webContents.openDevTools()
}


// Record
var currentNote=null
var startTime=null
var stopTime=null
function toggleRecord(note='default'){
    if(!note) return
    if(currentNote!=note){
        currentNote=note
        startTime=new Date()
    }else{
        stopTime=new Date()
        console.log(startTime)
        console.log(stopTime)
        updateToJson()
    }
}
function updateToJson(){

}

// Search and highlight
function searchAndHighlight(){
    var content=document.getElementById("text")
    var keyword=document.getElementById("keyword").value
    if(!keyword) return
    contents=content.innerHTML.split(keyword)
    content.innerHTML=contents.join('<span style="background:yellow;">'+keyword+'</span>')
}

function stripHtml(htmlstr){
    htmlstr=htmlstr.replace(/<br>/g,"\n")
    htmlstr=htmlstr.replace(/<\/br>/g,"\n")
    htmlstr=htmlstr.replace(/<[^>&^<]+>/g,"")
    return htmlstr
}

function test(){
    var keyword=document.getElementById('keyword').value
    console.log(keyword)
    console.log(stripHtml(keyword))
}