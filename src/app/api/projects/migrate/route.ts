import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { auth } from '@/auth'

export async function POST(req: Request) {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    const { projects } = await req.json()

    // 批量創建專案
    await prisma.project.createMany({
      data: projects.map((project: any) => ({
        ...project,
        userId: session.user.id,
        // 移除本地 ID 和時間戳，讓資料庫生成新的
        id: undefined,
        createdAt: undefined,
        updatedAt: undefined,
      })),
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error migrating projects:', error)
    return new NextResponse('Internal Error', { status: 500 })
  }
}
