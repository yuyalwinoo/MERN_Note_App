import React, { useEffect, useState } from 'react'
import { getRange } from '../../utils/utils';

const Paginate = ({page,pageCount,setPage}) => {

    const count = +pageCount;

    const [showNumber, setShowNumber] = useState({
        start: 1,
        end: Math.min(count, 5),
    }) 
    const [paginateNumber, setPaginateNumber] = useState([]);

    useEffect(()=>{
        setPaginateNumber(getRange(showNumber.start,showNumber.end))
    },[showNumber])

    const prev = ()=>{
        console.log("prev")
        const prevPage = +page-1;
        setPage(prevPage);
        fixShowNumber(prevPage);
    }

    const next = ()=>{
        //console.log("next")
        const nextPage = +page+1;
        setPage(nextPage);
        fixShowNumber(nextPage);
        
    }

    const clickCurrent = (current)=> {
        setPage(current);
        fixShowNumber(current)
    }

    const fixShowNumber = (current)=>{
        if(+current < count && +current === showNumber.end)
        {
            setShowNumber({
                start:showNumber.start+1,
                end:showNumber.end+1
            })
        }

        if(+current > 1 && +current === showNumber.start)
            {
                setShowNumber({
                    start:showNumber.start-1,
                    end:showNumber.end-1
                })
            }
    }
    console.log("showNumber",showNumber)
    console.log("count",count)
    console.log("page",page)
    return (
        <div className="flex items-center gap-4 fixed py-8 bottom-0 left-1/2 transform -translate-x-1/2 mx-auto">
            <button type='button'
                    className="flex items-center gap-2 rounded-md bg-slate-400 py-2 px-4"
                    onClick={prev}
                    disabled={+page === 1}>
                        Previous
            </button>

            <div className="flex items-center gap-2">
                {
                    paginateNumber.length > 1 &&
                    paginateNumber?.map((item,index)=>(
                        <button type='button'
                                className={`${+item === +page && 'bg-slate-600'} flex items-center gap-2 rounded-md bg-slate-400 py-2 px-4`}
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
                    disabled={+page === count}
                    >
                        Next
            </button>
        </div>
    )
}

export default Paginate