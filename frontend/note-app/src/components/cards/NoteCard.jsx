import React from 'react'
import { MdCreate, MdDelete, MdOutlinePushPin } from 'react-icons/md'
import { dateFormatter } from '../../utils/utils'

const NoteCard = ({id, title, date, content, tags, isPinned, onEdit, onDelete, onPinNote}) => {

    const updDate = dateFormatter(date);
    return (
        <div className='border rounded-md p-4 bg-white hover:shadow-xl transition-all ease-in-out'>
            <div className='flex items-center justify-between'>
                <div>
                    <h6 className='text-lg font-medium capitalize'>{title}</h6>
                    <p className='text-xs text-slate-500 italic'>{updDate}</p>
                </div>

                <MdOutlinePushPin className={`icon-btn ${isPinned ? 'text-primary' : 'text-slate-500'}`}
                                onClick={onPinNote}/>
            </div>
            <p className='text-sm text-slate-400 mt-2'>{content.length > 30 ? `${content.slice(0,40)} ...` : content}</p>

            <div className='flex justify-between items-center mt-2'>
                {/* <div className='text-xs text-slate-500'>{tags}</div> */}

                <div className='flex items-center gap-2'>
                    <MdCreate className='icon-btn hover:text-green-500' onClick={()=>onEdit(id)}/>
                    <MdDelete className='icon-btn hover:text-red-500' onClick={()=>onDelete(id)}/>
                </div>
            </div>
        </div>
    )
}

export default NoteCard