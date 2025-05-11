import connectionDB from "@/lib/connectionDB";
import { NextResponse } from "next/server";

export async function POST(request) {
  const db = await connectionDB();
  try {
    const body = await request.json();
    const email = body.email;
    const query = { email: email };
    const usersCollection= db.collection("users")
    const currentUser= await usersCollection.findOne(query)
    console.log(currentUser);
    if(currentUser){
        return NextResponse.json({
            result: currentUser,
            status: 403
        })
    }
    const userInfo ={
        fullName: body.fullName,
        profileImage: body?.image || "your profile will upload late",
        email: body.email,
        password: body.password
    }
    const result = await usersCollection.insertOne(userInfo);
    return NextResponse.json({
      result,
      status: 200,
    });
  } catch (error) {
    console.log("error for the logIn", error);
    return NextResponse.json({
      message: "your log In faild",
      status: 500,
    });
  }
}
