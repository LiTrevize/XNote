// require("FileSystem")


var template = [
    {
        label: 'File',
        submenu:[
            {
                label:'New',
                click:function(){
                    const ipcRenderer = require('electron').ipcRenderer;
                    console.log(ipcRenderer.sendSync('newNote'))
                }
            },
            {
                label:'Open',
                click:function(){
                    const ipcRenderer = require('electron').ipcRenderer;
                    console.log(ipcRenderer.sendSync('openNote'));
                }
            },
            {
                label:'Save',
                click:function(){
                    const ipcRenderer = require('electron').ipcRenderer;
                    console.log(ipcRenderer.sendSync('saveNote',mynote))
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
            }
        ]
    }
];

var remote = require('electron').remote;
var Menu = remote.Menu;
var menu = Menu.buildFromTemplate(template);
Menu.setApplicationMenu(menu);
