module.exports = {
    Note: function(){
        // var title="" private
        this.title="" // public
        this.lastOpen=0
        this.TotalTime=0
        this.words=0
        this.path=""
        this.content=""
        this.desc="No description."

        this.getCounts=function()
        {
        	return this.content.length
        }
        this.toStrTime=function(time){
            if(!time) time=this.lastOpen
            var t=new Date(time)
            var ret=t.getMonth()+' '+t.getDate()+' '+t.getHours()+' '+t.getMinutes()
            console.log(ret)
            return ret
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
                this.notes[i].content=""
                this.notes[i].words=mynote.words
                this.notes[i].lastOpen=mynote.lastOpen
                this.notes[i].TotalTime=mynote.TotalTime
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
        this.get=function(i=0){
            if(i<=this.notes.length)
                return this.notes[i]
            else
                return null
        }
        this.parse=function(str){
            // console.log(str)
            this.notes=JSON.parse(str).notes
        }
        this.toStrTime=function(time){
            var t=new Date(time)
            var month=t.getMonth()
            switch(month){
                case 1:month='Jan';break;
                case 2:month='Feb';break;
                case 3:month='Mar';break;
                case 4:month='Apr';break;
                case 5:month='May';break;
                case 6:month='Jun';break;
                case 7:month='Jul';break;
                case 8:month='Aug';break;
                case 9:month='Sep';break;
                case 10:month='Oct';break;
                case 11:month='Nov';break;
                case 12:month='Dec';break;
            }
            var ret=month+' '+t.getDate()+' '+t.getHours()+':'+t.getMinutes()
            console.log(ret)
            return ret
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