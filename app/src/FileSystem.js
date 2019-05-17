var fs=require("fs")

function saveToFile(filename="test.txt",content="This is a test"){
    fs.writeFile("saves/"+filename,content,function(err){
        if(err) console.log("Fail to save the file")
    })
}
function loadFile(filename="test.txt"){
    fs.readFile("saves/"+filename,"utf-8",function(err,data){
        if(err) console.log("Fail to load file")
        else{
            console.log(data)
            return data
        }
    })
}
function saveToJson(filename="test.json",jsonData={"name":"test","num":[1,2,3]}){
    fs.writeFile("saves/"+filename,JSON.stringify(jsonData),function(err){
        if(err) console.log("Fail to save the file")
    })
}
function loadJson(filename="test.json"){
    fs.readFile("saves/"+filename,"utf-8",function(err,data){
        if(err) console.log("Fail to load file")
        else{
            console.log(data)
            return JSON.parse(data)
        }
    })
}