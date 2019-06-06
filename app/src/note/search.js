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
    console.log(lastkeyword)
    console.log(keywordval)
    var contents = content.innerHTML;
    contents=contents.replace(new RegExp("<span style=\"background:yellow;\">"+lastkeyword+"<\/span>",'g'),lastkeyword);
    if(keywordval){
        contents=contents.replace(new RegExp(keywordval,"g"),'<span style="background:yellow;">' + keywordval + '</span>')
        // console.log(contents)    
    }
    content.innerHTML = contents;
    lastkeyword=keywordval
};
