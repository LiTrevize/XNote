var template = [
    {
        label: 'File',
        submenu:[
                    {
                        label:'New',
                        click:function(){}
                    },
                    {
                        label:'Open'
                    },
                    {
                        label:'Save'
                    },
                    {
                        label:'SaveAll'
                    },
                    {
                        label:'Export'
                    },
                    {
                        type: 'separator'
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