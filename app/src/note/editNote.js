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



// on md2html.js
// ipcRenderer.on('exportTo')

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

// Search and highligh


function SearchKeywords()
{
    var contents = document.getElementById("content").value;
    var text = document.getElementById("Keyword").value;
    var re = new RegExp(text,'g');
    re.exec(contents);
    document.write("contents："+contents);
    document.write("text"+text);
    document.write("位置在："+re.lastIndex);
}
function highlight(){
    var typingContent = document.getElementById("content");
    var contents = typingContent.innerHTML;
    var text = document.getElementById("text");
    text.onkeyup= function() {
        var value = text.value;
        var values = contents.split(value);
        typingContent.innerHTML = values.join('<span style="background:red;">' + value + '</span>');
    };
}
    
