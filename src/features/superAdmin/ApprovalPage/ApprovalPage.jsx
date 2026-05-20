"use client"
import React, { useEffect, useState } from 'react'

const ApprovalPage = () => {
    const [users,setUsers]= useState([]);
    const fetchUsers = async()=>{
        const res=await fetch("/api/auth")
        const data = await res.json()
       setUsers(data);
    }
    useEffect(()=>{
        fetchUsers();
    },[])
    const handleAction = async(id,action)=>{
        await fetch("api/auth",{
            method: "PUT",
            body: JSON.stringify({userId:id, action})

        })
        fetchUsers()
    }
  return (
    <div>
       <div className='p-6'>
        <h1 className='text-xl font-bold mb-4'>Pending Teacher</h1>
        <div className='space-y-3'>
         {users.map((user)=>(
            <div key={user.id}
            className='flex justify-between items-center border p-3 rounded-lg'
            >
             <div>
                <p className='font-medium'>{user.name}</p>
                <p className='text-sm text-gray-500'> {user.email}</p>
             </div>
             <div className='flex gap-2'>
              <button onClick={()=>handleAction(user.id, "APPROVE")}
                className='px-3 py-1 bg-green-500 text-white rounded'
                >
                Approve
              </button>
              <button onClick={()=>handleAction(user.id, "REJECT")}
                className='px-3 py-1 bg-red-500 text-white rounded'
                >
               Reject
              </button>
             </div>
             </div>
         ))}
        </div>

       </div>
    </div>
  )
}

export default ApprovalPage
