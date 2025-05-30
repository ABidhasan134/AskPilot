'use client'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import logo from '@/../../public/logo.svg'
import { useSession } from 'next-auth/react';

const Navbar = () => {
  const session= useSession()
  // console.log("this user from the navbar",session?.data?.user);
  const userInfo=session?.data?.user;
  return (
    <nav className=''>
      <Link href='/' className='flex text-center items-center gap-3'>
      <Image src={logo} alt='logo' width='280px' height='350px'></Image>
      <p className='text-primary text-2xl'>Ask Pilot</p>
      </Link>
    </nav>
  )
}

export default Navbar
