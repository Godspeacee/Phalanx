import authOptions from "@/app/auth/authOptions";
import {  patchIssueSchma } from "@/app/validationSchma";
import prisma from "@/prisma/clientfile";
import { error } from "console";

import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
    request:NextRequest,
    {params}:{params:{id:string}}){
    const session = await getServerSession(authOptions)
      if(!session)
  return NextResponse.json({}, {status:401})

    const body =  await request.json()
    const validation = patchIssueSchma.safeParse(body)
    if(!validation.success)
        return NextResponse.json(validation.error.format(), {status:400})
    const {assignedToUserId,title,description,status} = body
    if (assignedToUserId) {
        const user = await prisma.user.findUnique({where:{id:assignedToUserId}})
        if(!user)
            return  NextResponse.json({error:'Invalid user'}, {status:400})
    }
    const issue = await prisma.issue.findUnique({
        where:{id:parseInt(params.id)}
     
    })
    if(!issue)
        return NextResponse.json({error:'Invalid issue'}, {status:404})

    const updatedIssue = await prisma.issue.update({
        where:{id:issue.id},
        data:{
            title,
            description,
            status,
            assignedToUserId
        }
    })
    return NextResponse.json(updatedIssue)
}

export async function DELETE(request:NextRequest,{ params}:{params:{id:string}}) {
    const session = await getServerSession(authOptions)
     if(!session)
  return NextResponse.json({}, {status:401})

   const issue = await prisma.issue.findUnique({
        where:{ id: parseInt(params.id)}
    })
    if(!issue)
        return NextResponse.json({error:'Invalid issue'},{status:404})
     await prisma.issue.delete({
        where:{id:issue.id}

    })
    return NextResponse.json({})
}

