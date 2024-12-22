import React from 'react'
import { placeholderInitialName } from '../../utils/utils'
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { fetchUserInfo } from '../../api/auth';

const ProfileInfo = ({logoutHandler,username}) => {

    const initialName = placeholderInitialName(username);
    return (
        <div className='flex items-center gap-3'>
            <div className='w-12 h-12 flex justify-center items-center rounded-full text-slate-950 font-medium bg-slate-300 capitalize'>{initialName}</div>

            <div>
                <p className='text-sm font-medium'>{username}</p>
                <button type='button' 
                    className='text-sm text-slate-700 underline'
                    onClick={logoutHandler}>Logout</button>
            </div>
        </div>
    )
}

export default ProfileInfo