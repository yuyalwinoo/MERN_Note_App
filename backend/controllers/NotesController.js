
const noteService = require('../services/notes');

const addNote = async(req,res,next) => {
    // res.json(req.user.id)
    console.log("body",req.body)

    const userId = req.user.id;
    try
    {
        let newNote = await noteService.addNote(req.body,userId);
        res.status(201).json({
            data:newNote,
            success:'Successfully Added.'
        })
    }
    catch (err) {
        console.log(err)
        res.status(404).send({message:"Something went wrong"});
    }
}

const updateNote = async(req,res,next) => {
    const id = req.params.id;
    const userId = req.user.id;
    try
    {
        let updateNote = await noteService.updateNote(id,userId,req.body)
        res.status(200).json({
            data:updateNote,
            success:'Successfully Updated.'
        })
    }
    catch (err) {
        console.log(err)
        res.status(404).send({message:"Something went wrong"});
    }
}

const getNoteById = async(req,res,next)=>{
    const id = req.params.id;
    try
    {
        let note = await noteService.getNoteById(id);
        res.status(200).json(note);
    }
    catch (err)
    {
        res.status(404).json({
            errorMessage : "Id "+id+" not found"
        })
    }
}

const deleteNote = async(req,res,next)=>{
    const id = req.params.id;
    try
    {
        let deletedNote = await noteService.deletNote(id);
        res.status(200).json({
            success:'Successfully Deleted.',
            data:deletedNote
        });
    }
    catch(err)
    {
        res.status(400).json({
            errorMessage : err.toString()
        });
    }
}

const getAllNote = async(req,res,next)=>{
    //console.log("getallnotes")
    
    const userId = req.user.id;
    const page = req.query.page || 1;
    const limit = req.query.limit || 1;
    const skip = (page - 1) * limit;
   
    try{
        
        const {notes,pageCount} = await noteService.getAllNote(userId,skip,limit);
        
        res.status(200).json({
            page,
            pageCount,
            notes
        });
    }
    catch(err)
    {
        res.status(404).json({
            errorMessage : err.toString()
        });
    }
}

const updateIsPinned = async (req,res,next)=>{
    const id = req.params.id;
    try{
        const updatedPin = await noteService.updateIsPinned(id);
        res.status(200).json({
            success:'Successfully updated Pin.',
            data : updatedPin
        })
    }catch(err)
    {
        res.status(404).json({
            errorMessage : err.toString()
        });
    }
}

const deleteSelectedNotes = async(req,res,next)=>{
    const {ids} = req.body;
    //console.log("ids",ids)

    try
    {
        let deletedNotes = await noteService.deleteSelectedNotes(ids);
        res.status(200).json({
            success:'Successfully Deleted.',
            data:deletedNotes
        });
    }
    catch(err)
    {
        res.status(400).json({
            errorMessage : err.toString()
        });
    }
}

module.exports = {
    addNote,
    updateNote,
    getNoteById,
    deleteNote,
    getAllNote,
    updateIsPinned,
    deleteSelectedNotes
}