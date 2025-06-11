'use client'
import UseAxiosPublic from '@/hooks/useAxiosPublic'
import React from 'react'

const StartInterview = ({type,interview}) => {
    const axiosPublic=UseAxiosPublic();
const InterviewStart=async()=>{
    const interviewInfo={
        type: interview.type,
        role: interview.role,
        level: interview.level|| 'basic',
        techstack:interview.techstack,
        amount: interview.amount || 10,
        userid: interview.userId
    }
    
    console.log("starting interview",interviewInfo);
    const res= await axiosPublic.post(`/api/vapi/genater`,interviewInfo);
    console.log("this result from the vapi ai generate quastion",res.data);
}
  return (
    <button className="btn-primary" onClick={InterviewStart}>{type}</button>
  )
}

export default StartInterview
