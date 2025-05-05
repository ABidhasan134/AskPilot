import Image from 'next/image'
import React from 'react'
import cover from '@/../../public/covers/adobe.png'
import { FaCalendarAlt } from "react-icons/fa";
import { VscStarEmpty } from "react-icons/vsc";

const PastInterviewCard = ({interview}) => {
    console.log(interview)
  return (
    <div className='card-border w-[360px] max-sm:w-full'>
      <div className='card-interview'>
       <div className='border-2 absolute top-0 right-0 w-fit px-4 py-2 rounded-bl-lg'>
        <p>Mixed</p>
      </div>
        <Image src={cover} alt='company logo' width={90} height={90}></Image>
        <h2>{interview.role}</h2>
        <div className='flex justify-between'>
          {/* date and marke */}
        <div className='flex items-center gap-2'>
        <FaCalendarAlt></FaCalendarAlt>
        {interview.createdAt}
        </div>
        <div>
        <VscStarEmpty/>
        <p>35/100</p>
        </div>
        </div>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit ab optio saepe distinctio, cupiditate fugiat corrupti in tempora repellendus quaerat, libero numquam, quis aut quam itaque! Nostrum expedita aliquam maxime?
        </p>
        {/* technology and btn */}
        <div>
        
        </div>
      </div>
    </div>
  )
}

export default PastInterviewCard
