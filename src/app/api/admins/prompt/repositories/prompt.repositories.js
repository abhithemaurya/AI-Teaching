import { prisma } from "@/lib/prisma"

export const promptRepositories =  {
   getAll:async()=>{
    return prisma.aIPrompt.findMany({
        orderBy:{
            createdAt: "desc",
        },
    });
   },
   getByType:async(type)=>{
    return prisma.aIPrompt.findFirst({
        where:{
            type,
        }
    })
   },
   create:async(data)=>{
    return prisma.aIPrompt.create({
        data,
    })
   },
   update: async(id,prompt)=>{
    return prisma.aIPrompt.update({
        where:{
            id,
        },
        data:{
            prompt
        },
    })
   }
}


