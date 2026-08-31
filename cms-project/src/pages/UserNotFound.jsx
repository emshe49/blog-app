import React from 'react'
import { useNavigate } from 'react-router-dom'

const UserNotFound = () => {
    const navigate = useNavigate();
  return (
    <div>
        <h2 className='text-2xl text-center mt-80'>404 ! user is not found</h2>
        <button className='bg-blue-500 text-white px-4 py-2 rounded justify-center' onClick={() => navigate('/')}>Go To Home Page</button>
    </div>
  )
}

export default UserNotFound