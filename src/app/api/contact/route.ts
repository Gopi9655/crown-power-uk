import { NextResponse } from "next/server";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try { body = await request.json(); } catch { return NextResponse.json({ error: "Invalid request." }, { status: 400 }); }
  if (body.website) return NextResponse.json({ ok: true });
  const firstName=String(body.firstName??"").trim(); const lastName=String(body.lastName??"").trim(); const email=String(body.email??"").trim(); const message=String(body.message??"").trim();
  if(!firstName||!lastName||!emailPattern.test(email)||!message||body.consent!==true)return NextResponse.json({error:"Required fields are missing or invalid."},{status:400});
  const apiKey=process.env.RESEND_API_KEY; const from=process.env.RESEND_FROM_EMAIL; const to=process.env.CONTACT_TO_EMAIL||"info@crownpoweruk.co.uk";
  if(!apiKey||!from)return NextResponse.json({error:"Email delivery is not configured.",fallback:"mailto:info@crownpoweruk.co.uk"},{status:503});
  const text=[`Name: ${firstName} ${lastName}`,`Email: ${email}`,`Phone: ${String(body.phone??"")}`,`Company: ${String(body.company??"")}`,`Interest: ${String(body.interest??"General enquiry")}`,"",message].join("\n");
  const response=await fetch("https://api.resend.com/emails",{method:"POST",headers:{Authorization:`Bearer ${apiKey}`,"Content-Type":"application/json"},body:JSON.stringify({from,to:[to],reply_to:email,subject:`Website enquiry — ${String(body.interest??"General enquiry")}`,text})});
  if(!response.ok)return NextResponse.json({error:"Email delivery failed."},{status:502});
  return NextResponse.json({ok:true});
}
