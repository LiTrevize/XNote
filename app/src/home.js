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
    win.loadFile(page)
    win.webContents.openDevTools()
}