// Modules to control application life and create native browser window
const {app, BrowserWindow} = require('electron')
const myclass=require('./src/myclass')
// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow
var notelist=new myclass.NoteList()

function createWindow () {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }
  })

  // and load the index.html of the app.

  // mainWindow.loadFile('src/home.html')
  mainWindow.loadFile('index.html')

  // Open the DevTools.
  mainWindow.webContents.openDevTools()


  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
  })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') app.quit()
})

app.on('activate', function () {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) createWindow()
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.

// Listening to Events
var ipc=require('electron').ipcMain;

ipc.on('openNote',function(event){
  var path=openFileDialog()[0]
  var content=loadFile(path)
  console.log(path)
  createNotePage(content)
})

ipc.on('newNote',function(event){
  createNotePage('')
})


function openFileDialog(){
  const dialog=require('electron').dialog
  var path=dialog.showOpenDialog({
    filters: [
      { name: 'Markdown', extensions: ['md', 'txt'] },
      { name: 'All Files', extensions: ['*'] }
    ],
    properties: ['openFile']
  })
  // can add a filter
  return path
}

function createNotePage(content=""){
  var winNote=new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      webSecurity: false
    }
  })
  winNote.loadFile('src/note/editNote.html')

  // Open the DevTools.
  winNote.webContents.openDevTools()


  // send message to load note
  winNote.webContents.on('did-finish-load',function(){
      console.log("ready to show")
      winNote.webContents.send('loadNote',content)
  })

  // Emitted when the window is closed.
  winNote.on('closed', function () {
      // Dereference the window object, usually you would store windows
      // in an array if your app supports multi windows, this is the time
      // when you should delete the corresponding element.
      winNote = null
  })

 

}


var fs=require("fs")

function saveToFile(filename="saves/test.txt",content="This is a test"){
    fs.writeFile(filename,content,function(err){
        if(err) console.log("Fail to save the file")
    })
}
function loadFile(filename="saves/test.txt"){
    var content=fs.readFileSync(filename,"utf-8")
    // console.log(content)
    return content
}
function saveToJson(filename="saves/test.json",jsonData={"name":"test","num":[1,2,3]}){
    fs.writeFile(filename,JSON.stringify(jsonData),function(err){
        if(err) console.log("Fail to save the file")
    })
}
function loadJson(filename="saves/test.json"){
    content=fs.readFileSync(filename,"utf-8")
    return content
}
