import { NextResponse } from 'next/server'

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ token: string }> }
) {
  const { token } = await params

  if (!token) {
    return NextResponse.json({ error: 'Missing download token' }, { status: 400 })
  }

  return NextResponse.json(
    { error: 'Download delivery not yet implemented' },
    { status: 501 }
  )
}