import { Eye, Mail, Pencil, Save } from 'lucide-react'
import React from 'react'

const EmailContent = () => {
  return (
    <div className='grid grid-cols-1 lg:grid-cols-3 gap-6 p-6'>
      <div className='bg-white rounded-2xl border shadow p-4'>
        <div className='flex items-center gap-2 mb-5'>
          <Mail className= "w-5 h-5"/>
          <h2>Email Templates</h2>
        </div>
        
        {/* add loader */}
       <div className='space-y-3'>
       
        {/* add map    */}
         <div className='flex items-center justify-between'>
          <div>
             <h3 className='font-semibold'>
              name:
             </h3>
             <p className='text-sm text-gray-500'>
              key
             </p>
          </div>
              <Pencil className='w-4 h-4' />
         </div>
       </div>
 
      </div>
       <div className='lg:col-span-2 bg-white rounded-2xl border shadow p-6'>
        {/* add temp */}
        <div className='flex items-center justify-between'>
          <div>
            <h2 className='text-2xl font-bold'> Edit Template</h2>
            <p className='text-gray-500'>
              key
            </p>
          </div>
         <button className='flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-xl'>
          <Save className='w-4 h-4'/>
            {/* {saving ? "Saving..." :"Save"} */}
         </button>
        </div>
        <div>
          <label htmlFor="" className='block mb-2 font-medium'>
            Subject
          </label>
          <input
           type='text'
           className='w-full border rounded-xl p-3 outline-none focus: ring-2 focus:ring-blue-500 '
          />
        </div>
         <div >
          <label htmlFor="" className='block mb-2 font-medium'>
            HTML Content
            
          </label>
          <textarea name="" id="" rows={18} value="" 
           className='w-full border rounded-xl p-3 font-mono text-sm outline-none focus:ring-2 focus:ring-blue-500'
          />
         </div>
          <div>
            <div className='flex items-center gap-2 mb-3'>
              <Eye className='w-4 h-4'/>
              <h3 className='font-semibold'>Live Preview</h3>

            </div>
            <div className='border rounded-xl p-5 bg-gray-50 overflow-auto'>

            </div>
          </div>

        </div> 
    </div>
  )
}

export default EmailContent
