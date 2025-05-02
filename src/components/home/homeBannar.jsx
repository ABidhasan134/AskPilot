import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import bannarBg from "../../../public/robot.png"

const HomeBannar = () => {
  return (
    <section className='card-cta'>
      <div className='flex flex-col gap-6 max-w-lg'>
        <h2>Get Interview-Ready with AI-power practice & get instant feedback</h2>
        <p className='text-lg'>Practice real interview questions & get instant feedback.</p>
        <button className='btn-primary'>
            <Link href='/interview'>
            Start an interview
            </Link>
        </button>
      </div>
    <Image src={bannarBg} alt='bannar background' height={400} width={400} className='max-sm:hidden'></Image>
    </section>
  )
}

export default HomeBannar
