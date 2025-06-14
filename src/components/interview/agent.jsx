"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import aiAvtar from "@/../../public/ai-avatar.png";
import userImg from "@/../../public/user-avatar.png";
import { cn } from "@/lib/utils";
const Agent = ({ name }) => {
  const isSpeaking = true;
  const messages = [
    "what is your name?",
    "My name is Abid hasan. What is about you?",
  ];
  const [questions, setQuestion] = useState();
  // const active="Active"
  // const Inactive="InActive"
  // const connecting="Connecting"
  // const finished="Finished"
  const data = localStorage.getItem("interviewQuestions");
  console.log("this data from localstorage", data);
  const callStack = ["Active", "Inactive", "Connecting", "Finished"];
  const callStatus = callStack[0];
  const lastMessages = messages[messages.length - 1];
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedData = localStorage.getItem("interviewQuestions");
      setQuestion(storedData);
      console.log("this data from localStorage", storedData);
    }
  }, []);
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
            ></Image>
            {isSpeaking && <span className="animate-speak"></span>}
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
            ></Image>
          </div>
        </div>
      </div>
      {messages.length > 0 && (
        <div className="transcript-border mb-5">
          <div className="transcript">
            <p
              key={lastMessages}
              className={cn(
                "transition-opacity duration-500 opacity-0",
                "animate-fadeIn opacity-100"
              )}
            >
              {lastMessages}
            </p>
          </div>
        </div>
      )}
      <div className="grid justify-center">
        {callStack === "Active" ? (
          <button className="relative btn-call">
            <span
              className={cn(
                "absolute animate-ping rounded-full opacity-75",
                callStack !== "Connecting" && "hidden"
              )}
            />
            <span className="relative">
              {callStatus === "Inactive" || callStatus === "Finished"
                ? "Call"
                : ". . ."}
            </span>
          </button>
        ) : (
          <button className="btn-disconnect grid justify-center items-center">
            End
          </button>
        )}
      </div>
    </>
  );
};

export default Agent;
