"use client"
import React, { useEffect } from 'react'
import DashboardStatCard from './DashboardStatCard'
import { Shield, ShieldCheck, User } from 'lucide-react';
import { useAdminsStore } from '../admins/stores/adminStore';
import DashboardRecentAddedList from './DashboardRecentAddedList';
import { useTeacherStore } from '../teacher/stores/teacherStore';
import { useRouter } from 'next/navigation';

const DashboardContent = () => {
    const {admins, fetchAdmins, loading}= useAdminsStore()
    const {teacher, fetchTeachers  }= useTeacherStore()
    const router= useRouter()
    useEffect(()=>{
        fetchAdmins()
    },[])

    const totalAdmins= admins.length;
    const totalTeacher= teacher.length;
     const totalUsers= (admins.length + teacher.length)
    
    
  return (
    <div className='p-2 space-y-6 md:p-6 lg:p-0'>
     <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 cursor-pointer'>
       <DashboardStatCard onClick={()=>router.push("/superadmin/admins")} title="Total Admin" value={totalAdmins} icon={ShieldCheck} />
       <DashboardStatCard onClick={()=>router.push("/superadmin/teachers")} title="Teacher" value={totalTeacher}  icon={User}/> 
       <DashboardStatCard title="Total Users" value={totalUsers} icon={User}/>  
     </div>
 <div className='grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6'>
  <DashboardRecentAddedList 
    title='Recent Admins'
    data={admins}
    loading={loading}
    route="/superadmin/admins"
  />  

  <DashboardRecentAddedList 
    title='Recent Teacher'
    data={teacher}
    loading={loading}
    route="/superadmin/teachers"
  /> 
</div>

    </div>
  )
}

export default DashboardContent
