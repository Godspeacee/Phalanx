import prisma from "@/prisma/clientfile";
import { NextRequest, NextResponse } from "next/server";


export async function GET(request:NextRequest){
   const user = await prisma.user.findMany({orderBy:{name:'asc'}})
   return NextResponse.json(user)
}