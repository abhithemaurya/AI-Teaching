"use client"
import { User, Mail, Phone, School, Lock, EyeOff, Eye } from "lucide-react";
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from "react";
import { useAuthStore } from "./stores/authStore";
import { toast } from 'sonner'
    

const SignupForm = () => {
    const router = useRouter();
    const {register, loading, error} = useAuthStore()
    const [showPassword, setShowPassword]= useState(false)
    const [form, setForm]= useState({
        name:"",
        email:"",
        phone:"",
        school:"",
        password:"",
        role: "TEACHER",  
    });
    const handleChange=(e)=>{
        setForm({...form, [e.target.name]: e.target.value})
    }
    const handleSubmit = async(e)=>{
        e.preventDefault();
        try {
           const res= await register(form)
           toast.success(res.message || "Register successful")
            router.push("/login")
        } catch (error) {
            console.log(error)
        }
    }

  return ( 
    <div className='flex items-center justify-center min-h-screen bg-slate-50'>
      <div className='w-full max-w-md bg-white p-8 rounded-xl shadow-lg'>
        <h2 className='text-2xl font-bold text-center text-black-600 mb-6'>EduBlueprint AI</h2>
        <p className='text-center text-sm text-gray-500 mb-6'>Create your account</p> 
        <form onSubmit={handleSubmit} className="space-y-4" >
        <div className="flex items-center border rounded-lg px-3 py-2">
            <User size={18} className="text-gray-400" />
            <input
              type="text"
              name="name"
              placeholder="Enter your name"
              className="w-full ml-2 outline-none" 
              onChange={handleChange}      
              required
            />
          </div>
          <div className="flex items-center border rounded-lg px-3 py-2">
            <Mail size={18} className="text-gray-400" />
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              className="w-full ml-2 outline-none"
              onChange={handleChange}
              required
            />
          </div>
           <div className='flex items-center border rounded-lg px-3 py-2'>
             <Phone size={18} className='text-gray-400'/>
             <input 
             type='text'
             name='phone'
             placeholder='Enter your number'
             className='w-full ml-2 outline-none'
             onChange={handleChange}
             required
             />
           </div>
           <div className='flex items-center border rounded-lg px-3 py-2'>
             <School size={18} className='text-gray-400' />
             <input 
             type='text'
             name='school'
             placeholder='Enter school name'
             className='w-full ml-2 outline-none'
             onChange={handleChange}
             required
             />
           </div>
           <div className='flex items-center border rounded-lg px-3 py-2'>
            <Lock size={18} className='text-gray-400'/>
            <input 
             type={showPassword ? "text" : "password"}
             name='password'
             placeholder='Enter your password'
             className='w-full ml-2 outline-none'
             onChange={handleChange}
             required
            />
            <button 
            type="button"
            onClick={()=>setShowPassword(!showPassword)}
            className="text-gray-400 hover:text-gray-600"
            >
            {showPassword ? <EyeOff /> : <Eye size= {18}/>}  
            </button>
           </div>
         {
            error && (
                <p className="text-red-500 text-sm">{error}</p>
            )
         }
        <button type='submit' 
        disabled={loading}
        className='w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition cursor-pointer'>
            {loading ? "Registering...": "Register"}
            </button>        
      </form>
           <p className="m-3 text-sm text-gray-500 text-center">
         Already have an account? {" "}
           <Link
            href="/login"
            className="text-blue-600 cursor-pointer font-medium"
        >
            Login
        </Link>
        </p>       
     </div>   
    </div>  
  )
}

export default SignupForm

