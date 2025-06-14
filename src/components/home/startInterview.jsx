'use client'
import UseAxiosPublic from '@/hooks/useAxiosPublic'
import { useRouter } from 'next/navigation'
import React from 'react'

const StartInterview = ({ type, interview }) => {
  const axiosPublic = UseAxiosPublic()
  const router = useRouter()

  const InterviewStart = async () => {
    const interviewInfo = {
      type: interview.type,
      role: interview.role,
      level: interview.level || 'basic',
      techstack: interview.techstack,
      amount: interview.amount || 10,
      userid: interview.userId,
    }

    console.log("starting interview", interviewInfo)
    const res = await axiosPublic.post(`/api/vapi/genater`, interviewInfo)
    const questions = res?.data?.interview?.questions

    console.log("Generated questions:", questions)

    if (questions) {
      // Example using localStorage (safer for large objects)
      localStorage.setItem("interviewQuestions", JSON.stringify(questions))
      router.push(`/interview`)
    }
  }

  return (
    <button className="btn-primary" onClick={InterviewStart}>
      {type}
    </button>
  )
}

export default StartInterview
