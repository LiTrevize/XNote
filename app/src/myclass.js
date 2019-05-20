module.exports = {
    Note: function(){
        // var title="" private
        this.title="" // public
        this.lastOpen=0
        this.TotalTime=0
        this.words=0
        this.path=""
        this.content=""
        this.getCounts=function(){
            getCounts
        }
    },
    NoteList: function(){
        this.notes=new Array()
        this.addNote=function (mynote=new Note()){
            this.notes.push(mynote)
        }
        this.updateNote=function(mynote){
            if(this.indexOf(mynote)!=-1){
                myBook[i].title=mynote.title
                myBook[i].words=mynote.words
                // myBook[i].TotalTime=mynote.TotalTime
            }else this.notes.push(mynote);
        }
        this.indexOf=function(mynote){
            for(var i=0;i<this.length;i++){
                if(this.notes[i].path==mynote.path){
                  return i
                }
            }
            return -1
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