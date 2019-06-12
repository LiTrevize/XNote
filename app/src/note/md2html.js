new_element = document.createElement("script");
new_element.setAttribute("type","text/javascript");
new_element.setAttribute("src", "https://cdnjs.cloudflare.com/ajax/libs/jspdf/1.0.272/jspdf.debug.js");
document.body.appendChild(new_element);


var md = require('../../node_modules/markdown-it')(),
    mk = require('../../node_modules/markdown-it-katex');
md.use(mk);


marked.setOptions({
        renderer: new marked.Renderer(),
        gfm: true,
        tables: true,
        escaped : true,
        breaks: false,
        pedantic: false,
        sanitize: false,
        smartLists: true,
        smartypants: false,
        highlight: function (code, lang) {
        return hljs.highlightAuto(code).value;
      }
    });

    function JsExecCmd(value) {
      var  cmd = new ActiveXObject("WScript.Shell");
      
      /*
      命令参数说明
      cmd.exe /c dir 是执行完dir命令后关闭命令窗口。
      cmd.exe /k dir 是执行完dir命令后不关闭命令窗口。
      cmd.exe /c start dir 会打开一个新窗口后执行dir指令，原窗口会关闭。
      cmd.exe /k start dir 会打开一个新窗口后执行dir指令，原窗口不会关闭。
      */
      //执行完cmd命令后不关闭命令窗口。
      cmd.run("cmd.exe /k "+value);
      
      //执行完cmd命令后不关闭命令窗口。
      //cmd.run("cmd.exe /k "+value);
      
      cmd = null;
    }

    function stripHtml(htmlstr=""){
      htmlstr=htmlstr.replace(/<br>/g,"\n")
      htmlstr=htmlstr.replace(/<\/br>/g,"\n")
      htmlstr=htmlstr.replace(/<[^>&^<]+>/g,"")
      return htmlstr
    }


    // textarea
    // $("#content").on("input  propertychange", function() {
    //     var val = $(this).val();
    //     $("#show").html(md.render(val));
    // });
    // div

    // var val = $(this).html();
    // val=stripHtml(val)
    // $("#show").html(md.render(val));

    $("#content").on("keyup", function() {
      var val = $(this).html();
      val=stripHtml(val)
      $("#show").html(md.render(val));
    });

    function downloadFile(fileName, content){

        var aLink = document.createElement('a');
  
        var blob = new Blob([content]);
  
        var evt = document.createEvent("HTMLEvents");
  
        aLink.download = fileName;
  
        aLink.href = URL.createObjectURL(blob);
  
        aLink.click();
  
      }
  
  
  
  
  
      function downloadHTML(){
  
        var tpl = new Template($('#tpl').html());
  
        var s = tpl.render({
  
            title: "markdown",
  
            style:$("style").html(),
  
            content:$("#show").html()
  
        });
  
        downloadFile("markdown.html",s);
  
      }


  	function Template(tpl) {
      var
          fn,
          match,
          code = ['var r=[];\nvar _html = function (str) { return str; };'],
          re = /\{\s*([a-zA-Z\.\_0-9()]+)(\s*\|\s*safe)?\s*\}/m,
          addLine = function (text) {
              code.push('r.push(\'' + text.replace(/\'/g, '\\\'').replace(/\n/g, '\\n').replace(/\r/g, '\\r') + '\');');
          };
      while (match = re.exec(tpl)) {
          if (match.index > 0) {
              addLine(tpl.slice(0, match.index));
          }
          if (match[2]) {
              code.push('r.push(String(this.' + match[1] + '));');
          }
          else {
              code.push('r.push(_html(String(this.' + match[1] + ')));');
          }
          tpl = tpl.substring(match.index + match[0].length);
      }
      addLine(tpl);
      code.push('return r.join(\'\');');
      fn = new Function(code.join('\n'));
      this.render = function (model) {
          return fn.apply(model);
      };
    }

  // function test(){
  //   var ipcRenderer=require('electron').ipcRenderer
  //   ipcRenderer.sendSync('pdf','testtesttesttest')
  // }


	function downloadPDF(){
    var tpl = new Template($('#tpl').html());
  
        var s = tpl.render({
  
            title: "markdown",
  
            style:$("style").html(),
  
            content:$("#show").html()
  
        });

    var wkhtmltopdf = require('wkhtmltopdf');  
    var fs = require("fs");  

    wkhtmltopdf(s, { output: 'saves/out.pdf' });  
      
  }

	
	function downloadPNG(){
    var tpl = new Template($('#tpl').html());

    var s = tpl.render({

        title: "markdown",

        style:$("style").html(),

        content:$("#show").html()

    });

var wkhtmltoimage = require('wkhtmltoimage');  
var fs = require("fs");  

wkhtmltoimage(s, { output: 'out.png' });  
}


function Exporter(type){
  this.type=type
  this.export=function(){
      if(type=='html') downloadHTML()
      if(type=='pdf') 
        {
          // var win = new BrowserWindow({ width: 800, height: 600, show: false });
          // win.on('closed', function() {
          // win = null;
          // });
        
          // win.loadURL('http://www.baidu.com');
          // win.show();
          downloadPDF()
        }
      if(type=='png') downloadPNG()
  }
}
const BrowserWindow = require('electron').remote.BrowserWindow;



ipcRenderer.on('exportTo',function(event,type){
  var exporter=new Exporter(type)
  exporter.export()
})