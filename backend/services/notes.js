const Note = require('../models/Notes');

const addNote = async(note,userId)=>{
    //console.log("newnote",note)
    let newNote = new Note({...note,userId});
    //console.log("newnote111",newNote)
    return newNote.save();
}

const updateNote = async(id,userId,note)=>{
    // console.log("newnote",id, ' ',userId, ' ',note)
    let existingNote = await Note.findById(id);

    if(!existingNote)
    {
        throw new Error('Note id '+id+' not found')
    }
    else
    {
        const updateNote = {
            ...note,
            userId
        }
        // console.log("upd",updateNote)
        return Note.findByIdAndUpdate(id,updateNote,{new :true})
    }
}

async function getNoteById(id)
{
    let note = await Note.findById(id);
    if (!note) {
        throw new Error('Note id ' + id + ' not found');
      }
      return note;
}

const deletNote = async(id)=>{
    // console.log("newnote",id, ' ',userId, ' ',note)
    let existingNote = await Note.findById(id);

    if(!existingNote)
    {
        throw new Error('Note id '+id+' not found')
    }
    else
    {
        return Note.findByIdAndDelete(id)
    }
}

const getAllNote = async(userId,skip,limit)=>{
    const filter = {
        userId: userId
    };
    //console.log("skip ",skip, ' limit ',limit)
    // console.log(await Note.find(filter).sort({'updatedAt':-1}))
    const totalNotes = await Note.countDocuments(filter); 
    // console.log("total",totalNotes)
    const pageCount = Math.ceil(totalNotes / limit);
    const notes = await Note.find(filter)
                    .skip(skip)
                    .limit(limit)
                    .sort({'updatedAt':-1});
    if(!notes)
    {
        throw new Error('Data Not found')
    }
    else
    {
        return {notes,pageCount}
    }
}

const updateIsPinned = async(id)=>{
    let existingNote = await Note.findById(id);

    if(!existingNote)
    {
        throw new Error('Note id '+id+' not found')
    }
    else
    {  
        const updatedNote = {
            isPinned: !existingNote.isPinned, 
        };

        return Note.findByIdAndUpdate(id,updatedNote,{new :true})
    }
}

const deleteSelectedNotes = async(ids)=>{
    return await Note.deleteMany({ _id: { $in: ids } });
}

module.exports = {
    addNote,
    updateNote,
    getNoteById,
    deletNote,
    getAllNote,
    updateIsPinned,
    deleteSelectedNotes
}