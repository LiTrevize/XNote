// class Record
function Record(){
    this.lastOpen=0
    this.TotalTime=0
    this.record=new Array()
}

// class Note
function Note(){
    // var title="" private
    this.title="" // public
    this.path=""
    this.content=""
    this.record=new Record()
}

// class NoteList
function NoteList(){
    this.notes=new Array()
    this.addNote=function (note=new Note()){
        this.notes.push(note)
    }
    this.sort(){
        
    }
}

// 