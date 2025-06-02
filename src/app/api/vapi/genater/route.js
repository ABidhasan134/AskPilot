import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GOOGLE_AI_API_KEY); // Ensure this is in your .env file
async function generateText(prompt) {
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" }); // or gemini-1.0-pro
  console.log('this is vapi api',process.env.NEXT_PUBLIC_GOOGLE_AI_API_KEY)
  const result = await model.generateContent(prompt);
  const response = await result.response;
  return response.text();
}

export async function GET() {
    try{
        return NextResponse.json({
            message: "your quastion have asked",
            status: 200
        })
    }
    catch(error){
        return NextResponse.json({
            message: "your quation is failed to ask",
            status: 500
        })
    }
    
}
export async function POST(request) {
  const { type, role, level, techstack, amount, userid } = await request.json();

  try {
    const prompt = `
      Prepare questions for a job interview.
      The job role is ${role}.
      The job experience level is ${level}.
      The tech stack used in the job is: ${techstack}.
      The focus between behavioural and technical questions should lean towards: ${type}.
      The amount of questions required is: ${amount}.
      Please return only the questions, without any additional text.
      The questions are going to be read by a voice assistant so do not use "/" or "*" or any other special characters which might break the voice assistant.
      Return the questions formatted like this:
      ["Question 1", "Question 2", "Question 3"]
    `;

    const questionsText = await generateText(prompt);

    // Try to parse the response into JSON
    let parsedQuestions;
    try {
      parsedQuestions = JSON.parse(questionsText.trim());
    } catch (err) {
      // If the response is not valid JSON array, wrap it manually
      parsedQuestions = questionsText
        .split("\n")
        .filter(q => q.trim())
        .map(q => q.replace(/^\d+\.\s*/, '').trim());
    }

    const interview = {
      role,
      type,
      level,
      techstack: techstack.split(",").map(t => t.trim()),
      questions: parsedQuestions,
      userId: userid,
      finalized: true,
      createdAt: new Date().toISOString(),
    };

    console.log("Generated Interview:", interview);

    return NextResponse.json({
      message: "Your POST request was successful",
      status: 200,
      interview,
    });
  } catch (error) {
    console.error("Error generating questions:", error);
    return NextResponse.json({
      message: "Your POST request failed",
      status: 500,
      error: error.message,
    });
  }
}