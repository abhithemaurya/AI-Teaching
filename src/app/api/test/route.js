import { NextResponse } from 'next/server'
// import prisma from '@/lib/prisma'
import { prisma } from "@/lib/prisma"; 


export async function GET() {
  try {
    const users = await prisma.user.findMany()
    return NextResponse.json({
      success: true,
      message: 'Database connected successfully!',
      totalUsers: users.length,
      data: users,
    })
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: 'Database connection failed!',
      error: error.message,
    }, { status: 500 })
  }
}




export async function POST() {
  try {
    const testUser = await prisma.user.create({
      data: {
        name: 'Test User',
        email: `test_${Date.now()}@test.com`,
      },
    })
    return NextResponse.json({
      success: true,
      message: 'Test user created successfully!',
      data: testUser,
    }, { status: 201 })
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: 'Failed to create test user!',
      error: error.message,
    }, { status: 500 })
  }
}


export async function DELETE() {
  try {
    const deleted = await prisma.user.deleteMany({
      where: {
        email: {
          contains: '@test.com',
        },
      },
    })
    return NextResponse.json({
      success: true,
      message: `Deleted ${deleted.count} test user(s)`,
    })
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: 'Failed to delete test users!',
      error: error.message,
    }, { status: 500 })
  }
}