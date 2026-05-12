import React from 'react'

const DashboardStatCard = ({title, value, icon:Icon, onClick}) => {
    
  return (
    <div onClick={onClick} className='bg-white p-4 rounded-2xl shadow-md border border-gray-100 flex items-center justify-between'>
      <div>
        <p className='text-sm text-gray-500'>
         {title}
        </p>
        <h3 className='text-xl font-semibold text-gray-800 mt-1'>{value}</h3>
      </div>
      <div className='p-2 rounded-xl bg-blue-50 text-blue-600'>
        <Icon size={20}/>

      </div>
    </div>
  )
}

export default DashboardStatCard
