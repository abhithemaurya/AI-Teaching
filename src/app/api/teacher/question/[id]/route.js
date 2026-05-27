import { prisma } from "@/lib/prisma";
import { deleteGeneratedQuestionController, updateGeneratedQuestionController } from "../controllers/question.controller";

export async function PUT(req,context

) {
  return updateGeneratedQuestionController(
    req,context
  )    
}

export async function DELETE(req,context) {
     return deleteGeneratedQuestionController(req,context)
}

export async function PATCH(req,context) {
  try {
    const params= await context.params;
    const id= Number(params.id);
    if(!id){
      return Response.json(
        {
          message: "Invalid question id"
        },
        {
          status:400
        }
      )
    }
    const body =await req.json()
    const updateData={}
    if(body.incrementDownload){
      updateData.downloadCount={
        increment: 1,
      };
    }
    if(typeof body.downloadEnabled=== "boolean"){
      updateData.downloadEnabled= body.downloadEnabled
    }
    const updated= await prisma.generatedQuestion.update({
      where:{
        id,
      },
      data: updateData
    })
    return Response.json(updated)
  } catch (error) {
    console.log(error)
    return Response.json(
      {
        message: "Something went wrong"
      },{
        status:500
      }
    )
  }
  
}

// export async function PATCH(
//   req,
//   context
// ) {
//   const params= await context.params;
//   const id =
//     Number(params.id);
//   if(!id){
//     return Response.json(
//     {
//       message: "Invalid question id"
//     },{status: 400}
//     )
//   }
//   const updated =
//     await prisma.generatedQuestion.update({
//       where: {
//         id,
//       },

//       data: {
//         downloadCount: {
//           increment: 1,
//         },
//       },
//     });

//   return Response.json(
//     updated
//   );
// }