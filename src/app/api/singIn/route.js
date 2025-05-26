import { NextResponse } from "next/server";

export default async function POST(request) {
    try{
        return NextResponse.json({
            message: "logIn success full",
            status:200
        })
    }
    catch(error){
        return NextResponse.json({
            message: "your log In faild ",
            status: 500
        })
    }
}