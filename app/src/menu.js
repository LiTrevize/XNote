// require("FileSystem")
const ipcRenderer = require('electron').ipcRenderer;

var template = [
    {
        label: 'File',
        submenu:[
                    {
                        label:'New',
                        click:function(){
                            console.log(ipcRenderer.sendSync('newNote'))
                        }
                    },
                    {
                        label:'Open',
                        click:function(){
                            console.log(ipcRenderer.sendSync('openNote'));
                        }
                    },
                    {
                        label:'Save',
                        click:function(){
                            console.log(ipcRenderer.sendSync('saveNote'))
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
        label:'Edit'
    },
    {
        label:'View'
    },
    {
        label:'Help'
    }
];

var remote = require('electron').remote;
var Menu = remote.Menu;
var menu = Menu.buildFromTemplate(template);
Menu.setApplicationMenu(menu);
