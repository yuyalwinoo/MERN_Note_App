import React, { useEffect, useState } from 'react'
import ProfileInfo from '../cards/ProfileInfo'
import { useNavigate } from 'react-router-dom'
import SearchBar from '../searchBar/SearchBar';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { fetchUserInfo } from '../../api/auth';

const NavBar = () => {

    const navigate = useNavigate();
    const queryClient = useQueryClient()

    const [searchQuery, setSearchQuery] = useState('');

    const { isPending, isError, data:userInfo, error } = useQuery({
        queryKey: ['user'],
        queryFn: fetchUserInfo,
    })

    //console.log("userInfo",userInfo)
    if (isPending) {
        return <span>Loading...</span>
    }

    if (isError) {
        return <span>Error: {error.message}</span>
    }

    const searchQueryOnChangeHandler=(e)=>{
        setSearchQuery(e.target.value);
    }
    const logoutHandler=()=>{
        navigate('/login');
        localStorage.clear();
        queryClient.invalidateQueries(['user']);
    }

    const handleSearch=()=>{

    }
    const onClearSearch=()=>{
        setSearchQuery('');
    }
    return (
        <div className=' flex items-center justify-between px-5 py-2 drop-shadow'>
            <h2 className='text-xl font-medium text-black py-2'>Notes</h2>

            
            {
                userInfo?.data?.username && (
                    <>
                        <SearchBar value={searchQuery}
                        onChange={searchQueryOnChangeHandler}
                        handleSearch={handleSearch}
                        onClearSearch={onClearSearch}/>

                        <ProfileInfo logoutHandler={logoutHandler} username={userInfo?.data?.username}/>
                    </>
                )
            }
            
        </div>
    )
}

export default NavBar