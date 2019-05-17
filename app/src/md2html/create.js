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

    $("#content").on("input  propertychange", function() {
        var val = $(this).val();
        $("#show").html(marked(val));
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

	function downloadPDF(){
	  html2canvas(document.body, {
	  	onrendered:function(canvas) {

		  var contentWidth = canvas.width;
		  var contentHeight = canvas.height;

		  //一页pdf显示html页面生成的canvas高度;
		  var pageHeight = contentWidth / 592.28 * 841.89;
		  //未生成pdf的html页面高度
		  var leftHeight = contentHeight;
		  //页面偏移
		  var position = 0;
		  //a4纸的尺寸[595.28,841.89]，html页面生成的canvas在pdf中图片的宽高
		  var imgWidth = 595.28;
		  var imgHeight = 592.28/contentWidth * contentHeight;

		  var pageData = canvas.toDataURL('image/jpeg', 1.0);
		  var pdf = new jsPDF('', 'pt', 'a4');

		  //有两个高度需要区分，一个是html页面的实际高度，和生成pdf的页面高度(841.89)
		  //当内容未超过pdf一页显示的范围，无需分页
		  if (leftHeight < pageHeight) {
		  pdf.addImage(pageData, 'JPEG', 0, 0, imgWidth, imgHeight );
		  } else {
			  while(leftHeight > 0) {
				  pdf.addImage(pageData, 'JPEG', 0, position, imgWidth, imgHeight)
				  leftHeight -= pageHeight;
				  position -= 841.89;
				  //避免添加空白页
				  if(leftHeight > 0) {
					pdf.addPage();
				  }
			  }
		  }

		  pdf.save('content.pdf');
	  	}
		})
	}

	
	function downloadPNG(){
	  html2canvas(document.body, {
	    onrendered:function(canvas) {
	  	  var pageData = canvas.toDataURL('image/png', 1.0).replace("image/png", "image/octet-stream"); 
	  	  var saveFile = function (data, filename) {
          var link = document.createElement('a');
          link.href = data;
          link.download = filename;
    	  var event = document.createEvent('MouseEvents');
          event.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
          link.dispatchEvent(event);
      }
      saveFile(pageData, "content.png");
	  save_href.href = pageData;
      save_img.src = pageData;
	  }
      })
	}