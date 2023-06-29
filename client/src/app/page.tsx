'use client'

import {MdEmail, MdPassword} from "react-icons/md";
import {useRouter} from 'next/navigation';

export default function Home() {
  const isLoggedIn = true;
  const router = useRouter();

  return (
    <main className='h-[100vh] w-[100vw] main flex items-center justify-end'>
      <div className='h-full w-1/2 flex flex-col justify-center items-center bg-white shadow-lg p-5 py-10'>
        <div className="w-[500px]">
          <p
            className='text-[36px] font-[700]'
          >Log In</p>
          <p className="text-[#8692A6] text-[18px] py-6">
            If you are already a member you can login with your email address and password.
          </p>
          <p className="text-[#333F51] font-[500]">Email address</p>
          <div
            className='flex input items-center gap-4 h-[44px] mb-6 border-[1px] border-neutral-[#D5DAE1] px-4 mt-4 rounded-[6px]'
          >
            <input type='text' placeholder='Username' className='h-full w-full outline-none'/>
          </div>
          <p className="text-[#333F51] font-[500]">Password</p>
          <div
            className='flex input items-center gap-4 h-[44px] mb-4 border-[1px] border-neutral-[#D5DAE1] px-4 mt-4 rounded-[6px]'
          >
            <input type='password' placeholder='Password' className='h-full w-full outline-none'/>
          </div>
          <button
            className='bg-[#16A34A] h-16 w-full rounded-md mt-4 text-white font-bold'
          >Log In</button>
          <div
            className="py-6"
          >
            <p className="text-[#696F79] font-[500]">Don't have an account? <span className="text-[#16A34A]">Sign up here</span></p>
          </div>
        </div>
      </div>
    </main>
  )
}
