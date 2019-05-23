// Search and highligh

var content = document.getElementById("content");
var keyword = document.getElementById("keyword");
var lastkeyword=""
function SearchKeywords()
{
    return
    var keywordval=keyword.value
    var contents=content.innerHTML
    var re = new RegExp(keywordval,'g');
    re.exec(contents);
    document.write("contents："+contents);
    document.write("text"+keywordval);
    document.write("位置在："+re.lastIndex);
}
keyword.onkeyup= function() {
    var keywordval = keyword.value;
    // console.log(keywordval)
    var contents = content.innerHTML;
    contents.replace("/<span style=\"background:yellow;\">"+lastkeyword+"<\/span>/g",'');
    contents=contents.split(keywordval)
    // console.log(contents)
    content.innerHTML = contents.join('<span style="background:yellow;">' + keywordval + '</span>');
    lastkeyword=keywordval
};
