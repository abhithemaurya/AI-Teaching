import { prisma } from "@/lib/prisma";

export const configurationRepository={
    create:async(data)=>{
        await prisma.aIConfiguration.updateMany({
            data:{
                isActive:false
            },
        });
        return prisma.aIConfiguration.create({
            data:{
                ...data,
                isActive: true
            },
        });
    },
    getActive:async()=>{
        return prisma.aIConfiguration.findFirst({
            where:{
                isActive: true,
            }
        })
    }
}