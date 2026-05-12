"use client"
import React, { useState } from 'react'
import { User, Mail, Phone, School, Lock, Eye, EyeOff } from "lucide-react";
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '../../features/auth/stores/authStore';
import { toast } from 'sonner';


const LoginForm = () => {
  const router = useRouter();
  const { login, loading, error } = useAuthStore()
  const [showPassword, setShowPassword] = useState(false)
  const [form, setForm] = useState({
    identifier: "",
    password: ""
  })
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await login(form)
      console.log("login frontend", res)
      toast.success(res.message || "login successfull")
      const role = res.data.role?.toString().trim().toUpperCase()
      console.log("roleeeeeeeeeee", role)
      if (role === "TEACHER") {
        router.push("/teacher/dashboard")
      } else if (role === "SUPERADMIN") {
        router.push("/superadmin/dashboard")
      }

    } catch (error) {

      console.log(error)
      return toast.error(error.message || "login failed")
    }
  }
  return (
    <div className='flex items-center justify-center min-h-screen bg-slate-50'>
      <div className='w-full max-w-md bg-white p-8 rounded-xl shadow-lg'>
        <h2 className='text-2xl font-bold text-center text-blue-600 mb-6'>EduBlueprint AI</h2>
        <p className="text-center text-sm text-gray-500 mb-6">
          Sign in to your account
        </p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex items-center border rounded-lg px-3 py-2">
            <Mail size={18} className="text-gray-400" />
            <input
              type="text"
              name="identifier"
              placeholder="Enter email or phone"
              className="w-full ml-2 outline-none"
              onChange={handleChange}
              required
            />
          </div>
          <div className='flex items-center border rounded-lg px-3 py-2'>
            <Lock size={18} className='text-gray-400' />
            <input
              type={showPassword ? "text" : "password"}
              name='password'
              placeholder='Enter your password'
              className='w-full ml-2 outline-none'
              onChange={handleChange}
              required
            />
             <button type='button'
             onClick={()=>setShowPassword(!showPassword)}
             className='text-gray-400 hover:text-gray-600'
             >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
             </button>
          </div>
          {
            error && (
              <p className='text-red-500 text-sm'>{error}</p>
            )
          }
          <button type='submit'
            disabled={loading}
            className='w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition cursor-pointer'>
            {loading ? "Logging in..." : "Login"}</button>
        </form>
        <p className="m-3 text-sm text-gray-500 text-center">
          Don't have an account?{" "}
          <Link
            href="/signup"
            className="text-blue-600 cursor-pointer font-medium"
          >
            Signup
          </Link>
        </p>

      </div>
    </div>
  )
}

export default LoginForm
