import Image from 'next/image'
import React from 'react'
import aiAvtar from '@/../../public/ai-avatar.png'
const Agent = () => {
    const isSpeaking=true
  return (
    <div className='call-view'>
        <div className='card-interviewer'>
            <div className='avatar'>
                <Image src={aiAvtar} alt='vapi' height={65} width={54} className='object-cover'>
                </Image>
                {
                    isSpeaking&& <span className='animate-speak'></span>
                }
            </div>
        </div>
    </div>
  )
}

export default Agent
