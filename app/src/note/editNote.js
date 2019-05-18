const ipcRenderer = require('electron').ipcRenderer;
ipcRenderer.on('loadNote',function(event,content){
    console.log(content)
    console.log('fjdsklfj')
    document.getElementById('text').innerHTML=content
})