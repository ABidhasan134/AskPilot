import connectionDB from "@/lib/connectionDB";
import { NextResponse } from "next/server";

export async function POST(request){
    const db=await connectionDB();
    const body= await request.json()
    // console.log(db,body)

    try{
        return NextResponse.json({
            message: "your log in succesful",
            status: 200
        })
    }
    catch(error){
        console.log("error for the logIn",error);
        return NextResponse.json({
            message: 'your log In faild',
            status: 500
        })
    }
} 