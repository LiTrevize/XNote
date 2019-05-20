module.exports = {
    Note: function(){
        // var title="" private
        this.title="" // public
        this.lastOpen=0
        this.TotalTime=0
        this.words=0
        this.path=""
        this.content=""

        this.getCounts=function()
        {
        	var x=document.getElementById("content").value
        	return x.length
        }
    },
    NoteList: function(){
        this.notes=new Array()
        this.addNote=function (mynote=new Note()){
            this.notes.push(mynote)
        }
        this.updateNote=function(mynote){
            if(!mynote) return
            i=this.indexOf(mynote)
            if(i>=0){
                this.notes[i].title=mynote.title
                this.notes[i].content=mynote.content
                this.notes[i].words=mynote.words
                // myBook[i].TotalTime=mynote.TotalTime
            }else this.notes.push(mynote);
        }
        this.indexOf=function(mynote){
            for(var i=0;i<this.notes.length;i++){
                if(this.notes[i].path==mynote.path){
                  return i
                }
            }
            return -1
        }
        this.parse=function(str){
            console.log(str)
            this.notes=JSON.parse(str).notes
        }
        this.sort=function(){
            
        }
    }
}

// // class Record
// function Record(){
//     this.lastOpen=0
//     this.TotalTime=0
//     this.record=new Array()
// }

// // class Note
// function Note(){
//     // var title="" private
//     this.title="" // public
//     this.path=""
//     this.content=""
//     this.record=new Record()
// }

// // class NoteList
// function NoteList(){
//     this.notes=new Array()
//     this.addNote=function (note=new Note()){
//         this.notes.push(note)
//     }
//     this.sort=function(){
        
//     }
// }

// // 