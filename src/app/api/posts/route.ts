import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  const posts = await prisma.post.findMany({
    orderBy: {
      createdAt: 'desc' // Use 'asc' for oldest first
    }
  });
  return NextResponse.json(posts);
}

export async function POST(request: Request) {
  const { title, description, kindeAuthId, published } = await request.json();

  const post = await prisma.post.create({
    data: { title, description, kindeAuthId, published }
  });

  return NextResponse.json(post);
}

export async function PUT(request: Request) {
  const { id, published } = await request.json();

  const post = await prisma.post.update({
    where: { id },
    data: { published }
  });

  return NextResponse.json(post);
}

export async function DELETE(request: Request) {
  const { id } = await request.json();

  const post = await prisma.post.delete({
    where: { id }
  });

  return NextResponse.json(post);
}
