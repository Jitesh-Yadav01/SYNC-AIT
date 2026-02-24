import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";
// import { useView } from '../../context/ViewContext';
import { ArrowLeft } from 'lucide-react';
import { Button } from "@/components/ui/button";

const Login = () => {

  const [year, setYear] = useState('')
  // const { setCurrentView } = useView();

  const navigate = useNavigate()
  const handleSubmit = (e)=>{
    e.preventDefault()
    // setCurrentView('default');
     navigate(`/profile/${year}`, { state: { fromLogin: true } });
  }



  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4" style={{ 
      backgroundImage: `url("/background.svg")`,
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center top',
      backgroundSize: 'cover'
    }}>
        <div className="w-full max-w-md bg-transparent md:backdrop-blur-xl border border-slate-700/70 rounded-2xl shadow-2xl px-8 py-10 relative">
          <Button 
            variant="ghost" 
            size="icon" 
            className="absolute top-4 left-4 text-slate-400 hover:text-slate-900 dark:hover:text-white"
            onClick={() => setCurrentView('default')}
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>

          {/* Header */}
          <div className="mb-8 text-center pt-2">
            <h1 className="text-2xl font-semibold tracking-tight">
              Welcome back 
            </h1>
            <p className="mt-2 text-sm text-slate-400">
              Login with your college credentials
            </p>
          </div>

          {/* Form */}
          <form className="space-y-5" onSubmit={(e)=>handleSubmit(e)}>
            {/* Email */}
            <div className="space-y-1">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-slate-900 dark:text-gray-200"
              >
                Email address
              </label>
              <input
                id="email"
                type="email"
                required
                className="w-full mt-1 px-3 py-2 rounded-xl bg-slate-50 border border-slate-300 dark:bg-slate-800 dark:border-slate-700 text-slate-900 dark:text-slate-100 text-sm placeholder:text-slate-500 outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                placeholder="you@college.com"
              />
            </div>

            {/* Password */}
            <div className="space-y-1">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-slate-900 dark:text-gray-200"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                required
                className="w-full mt-1 px-3 py-2 rounded-xl bg-slate-50 border border-slate-300 dark:bg-slate-800 dark:border-slate-700 text-slate-900 dark:text-slate-100 text-sm placeholder:text-slate-500 outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                placeholder="••••••••"
              />
            </div>

            {/* Position dropdown */}
            <div className="space-y-1">
              <label
                htmlFor="position"
                className="block text-sm font-medium text-slate-900 dark:text-gray-200"
              >
                Position / Year
              </label>
              <select
                id="position"
                required
                className="w-full mt-1 px-3 py-2 rounded-xl bg-slate-100 border border-slate-300 dark:bg-slate-800 dark:border-slate-700 text-slate-900 dark:text-slate-100 text-sm outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                value={year}
                onChange={(e)=>setYear(e.target.value)}
              >
                <option value="" disabled>
                  Select position
                </option>
                <option value="FE">FE</option>
                <option value="SE">SE</option>
                <option value="TE">TE</option>
              </select>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full mt-2 py-2.5 rounded-xl bg-indigo-500 hover:bg-indigo-400 active:bg-indigo-600  text-sm font-medium shadow-lg shadow-indigo-500/30 transition-transform transform hover:-translate-y-0.5"
            >
              Login
            </button>
          </form>

          {/* Extra */}
          <p className="mt-6 text-[11px] text-center text-slate-500 dark:text-slate-400">
            By continuing, you agree to our{" "}
            <span className="text-slate-900 dark:text-white underline underline-offset-2 cursor-pointer">
              Terms
            </span>{" "}
            &{" "}
            <span className="text-slate-900 dark:text-white underline underline-offset-2 cursor-pointer">
              Privacy Policy
            </span>
            .
          </p>
        </div>
    </div>
  )
}

export default Login