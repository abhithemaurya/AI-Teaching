import { sendActiveAccount, sendInActiveAccount } from "@/features/services/email.service";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function PATCH(  req, context ) {
  try {
    const { id } =await context.params;

    const body = await req.json();

    const updatedTeacher = await prisma.user.update({
      where: {
        id: Number(id),
      },
      data: {
        isActive: body.isActive,
      },
    });

     if(body.isActive){
     sendActiveAccount(updatedTeacher);
     }else{
     sendInActiveAccount(updatedTeacher);
     }
    return NextResponse.json({
      success: true,
      teacher: updatedTeacher,
      message: body.isActive
        ? "Teacher activated successfully"
        : "Teacher deactivated successfully",
    });

  } catch (error) {
    console.log(error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to update teacher status",
      },
      { status: 500 }
    );
  }
}