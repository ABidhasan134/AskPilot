import connectionDB from "@/lib/connectionDB";
import { NextResponse } from "next/server";

export async function POST(request) {
    const db=await connectionDB();
    const body= await request.json();
    console.log('Respons to log pilot',body)
    try{
        const usersCollection= db.collection("users")
        const query= {email:body.email}
        const password=body.password;
        const result= await usersCollection.findOne(query);
        if(password===result.password){
            console.log("this user is in data base",result);
        return NextResponse.json({
            result,
            message: "logIn success full",
            status:200
        })
        }
        // console.log("this user is in data base",result);
        return NextResponse.json({
            message: "logIn failed",
            status:403
        })
    }
    catch(error){
        return NextResponse.json({
            message: "your log In faild ",
            status: 500
        })
    }
}