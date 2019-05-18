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
