import React, { useState } from 'react'
import { useFormContext } from 'react-hook-form';
import { MdAdd, MdClose } from 'react-icons/md'

const TagInput = ({tags,setTags}) => {

    const { register } = useFormContext();
    const [inputValue, setInputValue] = useState('');
    const onChangeHandler = (e) =>{
        setInputValue(e.target.value);
    }

    const addNewTag = () => {
        if(inputValue.trim() !== '')
        {
            setTags([...tags,inputValue.trim()]);
            setInputValue('');
        }
    }
    const handleKeyDown = (e)=>{
        if(e.key === 'Enter')
        {
            addNewTag();
        }
    }
    const handleRemoveTag = (removeTag) =>{
        setTags(tags.filter(tag=>tag !== removeTag))
    }
    return (
        <div>
            {
                tags?.length > 0 && (
                    <div className='flex items-center gap-2 flex-wrap mt-2'>
                        {
                            tags.map((tag,index)=>(
                                <span key={index} className='flex items-center gap-2 text-sm text-slate-900 bg-slate-100 px-3 py-2 rounded-md'>
                                    # {tag}
                                    <button type='button' onClick={()=>handleRemoveTag(tag)}>
                                        <MdClose/>
                                    </button>
                                </span>
                            ))
                        }
                    </div>
                )
            }
            <div className='flex items-center gap-4 mt-3'>
                <input type='text' 
                    className='text-sm bg-transparent border px-3 py-2 rounded-md outline-none' 
                    placeholder='Add tags'
                    value={inputValue}
                    onChange={onChangeHandler}
                    onKeyDown={handleKeyDown}
                    // {...register("tags")}
                    />

                <button type='button'
                        onClick={addNewTag}
                        className=' h-8 w-8 flex justify-center items-center border border-blue-700 hover:bg-blue-700 rounded-md'>
                    <MdAdd className='text-2xl text-blue-700 hover:text-white'/>
                </button>
            </div>
        </div>
    )
}

export default TagInput