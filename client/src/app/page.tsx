'use client'

import {MdEmail, MdPassword} from "react-icons/md";
import {useRouter} from 'next/navigation';

export default function Home() {
  const isLoggedIn = true;
  const router = useRouter();

  return (
    <main className='h-[100vh] w-[100vw] main flex items-center justify-end '>
      <div className='h-full w-[400px] flex flex-col justify-center bg-white rounded-3xl shadow-lg p-5 py-10'>
      <p
          className='text-2xl font-extrabold text-center text-[#16a085]'
        >CROPTRACE</p>
        <p
          className='text-lg font-medium'
        >Login</p>
        <div
          className='flex items-center gap-4 h-16 border-[1px] border-neutral-400 px-2 mt-4 rounded-md'
        >
          <MdEmail className='text-[#16a085] text-2xl'/>
          <input type='text' placeholder='Username' className='h-full w-full outline-none'/>
        </div>
        <div
          className='flex items-center gap-4 h-16 border-[1px] border-neutral-400 px-2 mt-4 rounded-md'
        >
          <MdPassword className='text-[#16a085] text-2xl'/>
          <input type='password' placeholder='Password' className='h-full w-full outline-none'/>
        </div>
        <button
          className='bg-[#16a085] h-16 w-full rounded-md mt-4 text-white font-bold'
        >LOGIN</button>
      </div>
    </main>
  )
}
