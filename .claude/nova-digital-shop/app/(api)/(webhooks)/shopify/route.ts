import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const body = await request.text()
  const hmac = request.headers.get('x-shopify-hmac-sha256') || ''
  const topic = request.headers.get('x-shopify-topic') || ''

  console.log(`[Shopify Webhook] Topic: ${topic}, HMAC: ${hmac.substring(0, 8)}...`)

  return NextResponse.json({ received: true })
}