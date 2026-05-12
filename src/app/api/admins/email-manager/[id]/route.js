import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";



export async function PUT(req, { params }) {
  try {
    const { id } = params;

    const body = await req.json();

    const updatedTemplate = await prisma.emailTemplate.update({
      where: {
        id: Number(id),
      },
      data: {
        subject: body.subject,
        html: body.html,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Template updated successfully",
      data: updatedTemplate,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: error.message,
      },
      { status: 500 }
    );
  }
}