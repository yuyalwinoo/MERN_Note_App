import axiosInstance from "../utils/axiosInstance"

export const fetchNotes = async(page = 1)=>{
    const notes =  await axiosInstance.get("/notes?page="+ page);
    //console.log("notes api",notes)
    return notes;
}

export const fetchNoteById = async(id)=>{
    const note =  await axiosInstance.get(`/notes/${id}`);
    return note;
}

export const saveNote = async(note)=>{
    const notes =  await axiosInstance.post("/notes",note);
    return notes;
}

export const updateNote = async({id,data})=>{
    const notes =  await axiosInstance.put(`/notes/${id}`,data);
    return notes;
}

export const deleteNote = async(id)=>{ //console.log("id",id)
    const notes =  await axiosInstance.delete(`/notes/${id}`);
    return notes;
}