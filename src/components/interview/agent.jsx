import Image from 'next/image'
import React from 'react'
import aiAvtar from '@/../../public/ai-avatar.png'
import userImg from '@/../../public/user-avatar.png'
const Agent = ({name}) => {
    const isSpeaking=true

  return (
    <>
    <div className='call-view'>
        <div className='card-interviewer'>
            <div className='avatar'>
                <Image src={aiAvtar} alt='vapi' height={65} width={54} className='object-cover'>
                </Image>
                {
                    isSpeaking&& <span className='animate-speak'></span>
                }
            </div>
                <p>{name}</p>
        </div>
        <div className='card-border'>
            <div className='card-content'>
                <Image src={userImg}
              alt="profile-image"
              width={539}
              height={539}
              className="rounded-full object-cover size-[120px]"></Image>
            </div>
        </div>
    </div>
    </>
  )
}

export default Agent
