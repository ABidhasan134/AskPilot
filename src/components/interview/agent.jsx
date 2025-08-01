"use client";
import { useEffect, useState } from "react";
import Vapi from "@vapi-ai/web";
import aiAvtar from "@/../../public/ai-avatar.png";
import userImg from "@/../../public/user-avatar.png";
import Image from "next/image";

const Agent = ({ name }) => {
  const [questions, setQuestions] = useState([]);
  const [vapi, setVapi] = useState(null);

  useEffect(() => {
    // 1. Get questions from localStorage
    const storedData = localStorage.getItem("interviewQuestions");
    if (storedData) {
      try {
        const parsed = JSON.parse(storedData);
        setQuestions(parsed);
      } catch (error) {
        console.error("❌ Failed to parse questions from localStorage:", error);
      }
    }

    // 2. Ask for microphone access
    navigator.mediaDevices.getUserMedia({ audio: true }).catch((err) => {
      console.error("❌ Microphone access error:", err);
    });

    // 3. Initialize Vapi instance
   const vapiInstance = new Vapi({
  apiKey: process.env.NEXT_PUBLIC_VAPI_PUBLIC_API_KEY,
  baseURL: "/api/vapi", // this must match your Next.js proxy route
});


    vapiInstance.on("call-start", () => console.log("✅ Call started"));
    vapiInstance.on("call-end", () => console.log("📞 Call ended"));
    vapiInstance.on("error", (err) => console.error("🚨 Vapi error:", err));

    setVapi(vapiInstance);
  }, []);

  const startInterviewCall = async () => {
    if (!vapi) {
      console.error("⛔ Vapi is not initialized yet.");
      return;
    }

    if (!questions || questions.length === 0) {
      console.error("⛔ No interview questions available.");
      return;
    }

    console.log("▶️ Starting interview with questions:", questions);

    try {
      await vapi.start({
        assistant: "b02c8158-a2de-457d-96e2-d5e2c5aab380", // Your assistant ID from Vapi
        variables: { questions },
      });
    } catch (err) {
      console.error("❌ Failed to start Vapi call:", err);
    }
  };

  return (
    <>
      <div className="call-view mb-5">
        <div className="card-interviewer">
          <div className="avatar">
            <Image
              src={aiAvtar}
              alt="vapi"
              height={65}
              width={54}
              className="object-cover"
            />
            <span className="animate-speak" />
          </div>
          <p>{name}</p>
        </div>

        <div className="card-border">
          <div className="card-content">
            <Image
              src={userImg}
              alt="profile-image"
              width={539}
              height={539}
              className="rounded-full object-cover size-[120px]"
            />
          </div>
        </div>
      </div>

      <div className="grid justify-center">
        <button onClick={startInterviewCall} className="btn-call">
          Start Interview
        </button>
      </div>
    </>
  );
};

export default Agent;
