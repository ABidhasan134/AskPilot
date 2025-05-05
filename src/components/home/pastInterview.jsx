import React from 'react'
import PastInterviewCard from './pastInterviewCard'

const PastInterviews = () => {
  return (
    <section>
      <h2>your past Interview</h2>
      {
        dummyInterviews.map((item,index)=>{
          return (
            <PastInterviewCard interview={item} key={index+100}></PastInterviewCard>
          )
        })
      }
    </section>
  )
}

export default PastInterviews
export const dummyInterviews = [
    {
      id: "1",
      userId: "user1",
      role: "Frontend Developer",
      type: "Technical",
      techstack: ["React", "TypeScript", "Next.js", "Tailwind CSS"],
      level: "Junior",
      questions: ["What is React?"],
      finalized: false,
      createdAt: "2024-03-15T10:00:00Z",
      // cover: 'http://localhost:3000/public/covers/adobe.png'
    },
    {
      id: "2",
      userId: "user1",
      role: "Full Stack Developer",
      type: "Mixed",
      techstack: ["Node.js", "Express", "MongoDB", "React"],
      level: "Senior",
      questions: ["What is Node.js?"],
      finalized: false,
      createdAt: "2024-03-14T15:30:00Z",
      // cover: 'http://localhost:3000/public/covers/amazon.png'
    },
  ];