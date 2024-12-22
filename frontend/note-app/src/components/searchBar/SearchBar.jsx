import { FaMagnifyingGlass } from "react-icons/fa6";
import { IoMdClose } from "react-icons/io";

const SearchBar = ({value, onChange, handleSearch, onClearSearch}) => {
  return (
    <div className='w-80 bg-slate-200 rounded-md flex px-4 items-center'>
        <input type='text'
            placeholder='Search Notes...'
            className='w-full text-xs py-[11px] outline-none bg-slate-200'
            value={value}
            onChange={onChange}/>
        {
            value && <IoMdClose className="text-slate-500 cursor-pointer hover:text-black mr-5" onClick={onClearSearch}/>
        }
        <FaMagnifyingGlass size={14} className="text-slate-400 cursor-pointer hover:text-black" onClick={handleSearch}/>
    </div>
  )
}

export default SearchBar