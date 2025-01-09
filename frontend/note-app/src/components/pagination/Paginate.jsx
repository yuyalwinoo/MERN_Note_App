import React, { useEffect, useState } from 'react'
import { getRange } from '../../utils/utils';

const Paginate = ({page,pageCount,setPage}) => {

    const count = +pageCount;
    const pageNumber = + page;
    const showCount = 3;
    const [paginateNumber, setPaginateNumber] = useState([]);

    useEffect(()=>{
        if(pageNumber === count)
        {
            setPaginateNumber(getRange(pageNumber-2,pageNumber))
        }
        else if(pageNumber >= showCount && pageNumber <= count)
        {
            setPaginateNumber(getRange(pageNumber-1,pageNumber+1))            
        }
        else{
            setPaginateNumber(getRange(1,Math.min(count, showCount)))
        }
        
    },[page])


    const prev = ()=>{
        const prevPage = pageNumber-1;
        setPage(prevPage);
    }

    const next = ()=>{
        const nextPage = pageNumber+1;
        setPage(nextPage);
        
    }

    const clickCurrent = (current)=> {
        setPage(current);
    }
   
    return (
        <div className="flex items-center gap-4 fixed py-8 bottom-0 left-1/2 transform -translate-x-1/2 mx-auto">
            <button type='button'
                    className="flex items-center gap-2 rounded-md bg-slate-400 py-2 px-4"
                    onClick={prev}
                    disabled={pageNumber === 1}>
                        Previous
            </button>

            <div className="flex items-center gap-2">
                {
                    paginateNumber.length > 1 &&
                    paginateNumber?.map((item,index)=>(
                        <button type='button'
                                className={`${+item === pageNumber && 'bg-slate-600'} flex items-center gap-2 rounded-md bg-slate-400 py-2 px-4`}
                                onClick={()=>clickCurrent(+item)}
                                key={index}
                                >
                                    {item}
                        </button>
                    ))
                }
            </div>

            <button type='button'
                    className="flex items-center gap-2 rounded-md bg-slate-400 py-2 px-4"
                    onClick={next}
                    disabled={pageNumber === count}
                    >
                        Next
            </button>
        </div>
    )
}

export default Paginate