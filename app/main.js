// Modules to control application life and create native browser window
const {app, BrowserWindow, webContents} = require('electron');
const myclass=require('./src/myclass')
var globalShortcut = require('electron').globalShortcut

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow
var myBook=new myclass.NoteList()
var win2note=[-1]
var curWinId=null
var preWinId

// file system
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
function loadJson(filename="saves/record.json"){
    content=fs.readFileSync(filename,"utf-8")
    // console.log('load json')
    // console.log(JSON.parse(content))
    return JSON.parse(content)
}

// test
// var event1 = new myclass.Note;
// event1.title = "XXXXNOTE!";
// event1.lastOpen = 7;

// var event2 = new myclass.Note;
// event2.title = "SOFTWARE ENGINEERING!!!!";
// event2.lastOpen = 12;

// var event3 = new myclass.Note;
// event3.title = "!!!!!!!!!!!!!!!!!!!!";
// event3.lastOpen = 17;

// myBook.addNote(event1);
// myBook.addNote(event2);
// myBook.addNote(event3);


// init
myBook.parse(loadFile('saves/record.json'))


var template = [
  {
      label: 'File',
      submenu:[
          {
              label:'New',
              click:function(){
                  createNotePage(new myclass.Note());
              }
          },
          {
              label:'Open',
              click:function(){
                var path=openFileDialog()[0]
                var content=loadFile(path)
                // console.log(path)
                var note= new myclass.Note()
                note.content=content
                note.path=path
                var i=myBook.indexOf(note)
                if(i>=0){
                  note.title=myBook.get(i).title
                  note.TotalTime=myBook.get(i).TotalTime
                  note.lastOpen=getCurrentTime()
                  myBook.get(i).lastOpen=note.lastOpen
                }else{
                  var title=path.split('\\')
                  title=title[title.length-1]
                  title=title.split('.')
                  title=title[0]
                  note.title=title
                  note.lastOpen=getCurrentTime()
                  if(!note.TotalTime) note.TotalTime=0;
                  myBook.updateNote(note)
                }
                // title
                createNotePage(note)
              }
          },
          {
              label:'Save',
              click:function(){
                // console.log('receive save')
                // console.log(BrowserWindow.getFocusedWindow().webContents)
                BrowserWindow.fromId(curWinId).webContents.send('fetchNote')
              }
          },
          {
              label:'SaveAll'
          },
          {
              type: 'separator'
          },
          {
              label:'Export'
          },
          {
              type: 'separator'
          },
          {
              label:'Exit'
          }
      ],
  },
  {
      label:'Edit',
      submenu:[
          {
              role:'undo'
          },
          {
              role:'redo'
          },
          {
              type:'separator'
          },
          {
              role:'cut'
          },
          {
              role:'copy'
          },
          {
              role:'paste'
          },
          {
              type:'separator'
          },
          {
              role:'selectall'
          },
          {
              role:'minimize'
          },
          {
              role:'close'
          }
      ]
  },
  {
      label:'View'
  },
  {
      label:'Help',
      submenu:[
          {
              label:'test',
              click:function(){
                  console.log('test')
                  console.log(document.head.innerText)
              }
          },
          {
              label:'timeline',
              click:function(){
                  const ipcRenderer = require('electron').ipcRenderer;
                  console.log(ipcRenderer.sendSync('timeline'))
              }
          },
          {
            label:'mindmap',
            click:function(){
                BrowserWindow.fromId(curWinId).webContents.send('fetchMindmap')
            }
          }
      ]
  }
];


var Menu = require('electron').Menu;
var menu = Menu.buildFromTemplate(template);
Menu.setApplicationMenu(menu);




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

  mainWindow.loadFile('src/home.html')
  // mainWindow.loadFile('index.html')

  // Open the DevTools.
  mainWindow.webContents.openDevTools()

  win2note[mainWindow.id]=-1
  curWinId=mainWindow.id

  // console.log(webContents.getFocusedWebContents())
  // load timeline
  mainWindow.webContents.on('did-finish-load',function(){
    mainWindow.webContents.send('loadtl',myBook)
  })
  
  
  mainWindow.on('focus',function(){
    console.log(mainWindow.id)
  })

  // mainWindow.on('did-finish-load',myclass.UpdateTimeLine(notelist))

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
app.on('ready', function(){
  var ret = globalShortcut.register('ctrl+s',function(){
    console.log('ctrl+s')
    BrowserWindow.fromId(curWinId).send("fetchNote")
  })

  createWindow()
})

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  saveToJson("saves/record.json",myBook)
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

// ipc.on('openNote',function(event){
//   var path=openFileDialog()[0]
//   var content=loadFile(path)
//   console.log(path)
//   var note= new myclass.Note()
//   note.content=content
//   note.title='testNote'
//   note.lastOpen=getCurrentTime()
//   note.path=path
//   createNotePage(note)
// })

// ipc.on('newNote',function(event){
//   createNotePage(new myclass.Note())
// })

ipc.on('saveNote',function(event,mynote){
  // console.log(BrowserWindow.getFocusedWindow().webContents)
  // BrowserWindow.fromId(curWinId).webContents.send('save')
  if(!mynote.path){
    var path=openSaveDialog()
    if(path) mynote.path=path
    else return
  }
  saveToFile(mynote.path,mynote.content);
  myBook.updateNote(mynote)
  saveToJson("saves/record.json",myBook)
})


ipc.on('showMindmap',function(event,mynote){
  saveToFile('./saves/buffer.md',mynote.content)
  createMindmap()
})





// ipc.on('timeline',function(event){
//   createPage('src/record/timeline.html')
// })

function openFileDialog(){
  const dialog=require('electron').dialog
  var path=dialog.showOpenDialog({
    filters: [
      { name: 'Markdown', extensions: ['md', 'txt'] },
      { name: 'All Files', extensions: ['*'] }
    ],
    properties: ['openFile']
  })
  return path
}
function openSaveDialog(){
  const dialog=require('electron').dialog
  var path=dialog.showSaveDialog({
    filters: [
      { name: 'Markdown', extensions: ['md', 'txt'] },
      { name: 'All Files', extensions: ['*'] }
    ],
    properties: ['openDirectory']
  })
  return path
}

function createMindmap(){
  var mindMap=new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      webSecurity: false
    }
  })
  mindMap.loadFile('src/mindmap/mindmap.html')
  //windows.push(mindMap)
  curWin=mindMap
  // Open the DevTools.
  mindMap.webContents.openDevTools()


  // focus
  mindMap.on('focus',function(){
    curWin=mindMap
  })

  // Emitted when the window is closed.
  mindMap.on('closed', function () {
      // Dereference the window object, usually you would store windows
      // in an array if your app supports multi windows, this is the time
      // when you should delete the corresponding element.
      mindMap = null
  })

}



function createNotePage(note=new myclass.Note()){
  var winNote=new BrowserWindow({
    width: 800,
    height: 600,
    title: note.title,
    webPreferences: {
      nodeIntegration: true,
      webSecurity: false
    }
  })
  winNote.loadFile('src/note/editNote.html')
  // windows.push(winNote)
  curWinId=winNote.id
  win2note[curWinId]=myBook.indexOf(note)
  // Open the DevTools.
  winNote.webContents.openDevTools()


  // send message to load note
  winNote.webContents.on('did-finish-load',function(){
      // console.log("ready to show")
      winNote.webContents.send('loadNote',note)
  })

  // focus
  winNote.on('focus',function(){
    console.log(winNote.id)
    curWinId=winNote.id
    thisNote=myBook.notes[win2note[curWinId]]
    thisNote.lastOpen=getCurrentTime()
  })
  winNote.on('blur',function(){
    var curtime=getCurrentTime()
    thisNote=myBook.get(win2note[curWinId])
    thisNote.TotalTime += (curtime-thisNote.lastOpen)
  })

  winNote.on('close', function () {
    var curtime=getCurrentTime()
    thisNote=myBook.get(win2note[curWinId])
    thisNote.TotalTime += (curtime-thisNote.lastOpen)
    // console.log(thisNote.TotalTime)
    winNote = null
  })

  // Emitted when the window is closed.
  winNote.on('closed', function () {
      // Dereference the window object, usually you would store windows
      // in an array if your app supports multi windows, this is the time
      // when you should delete the corresponding element.
      var curtime=getCurrentTime()
      thisNote=myBook.get(win2note[preWinId])
      thisNote.TotalTime += (curtime-thisNote.lastOpen)
      console.log(thisNote.TotalTime)
      winNote = null
  })
}


function createPage(htmlpath=""){
  var winNote=new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      webSecurity: false
    }
  })
  winNote.loadFile(htmlpath)
  // win2note.push(winNote)
  // Open the DevTools.
  winNote.webContents.openDevTools()


  // send message to load note
  // winNote.webContents.on('did-finish-load',function(){
  //     console.log("ready to show")
  //     winNote.webContents.send('loadNote',note)
  // })

  // Emitted when the window is closed.
  winNote.on('closed', function () {
      // Dereference the window object, usually you would store windows
      // in an array if your app supports multi windows, this is the time
      // when you should delete the corresponding element.
      // winNote = null
  })

}

// time record
function getCurrentTime(){
  var cur=new Date()
  return cur.getTime()
}
