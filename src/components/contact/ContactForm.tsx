"use client";

import Link from "next/link";
import { useState } from "react";

type FormValues = { firstName:string; lastName:string; email:string; phone:string; company:string; interest:string; message:string; consent:boolean; website:string };
const initial: FormValues = { firstName:"",lastName:"",email:"",phone:"",company:"",interest:"General enquiry",message:"",consent:false,website:"" };

export function ContactForm() {
  const [values,setValues]=useState(initial); const [errors,setErrors]=useState<Record<string,string>>({}); const [status,setStatus]=useState<"idle"|"loading"|"success"|"fallback"|"error">("idle");
  const update = (key:keyof FormValues,value:string|boolean) => {setValues((current)=>({...current,[key]:value}));setErrors((current)=>{const next={...current};delete next[key];return next})};
  const validate=()=>{const next:Record<string,string>={};if(!values.firstName.trim())next.firstName="Please enter your first name.";if(!values.lastName.trim())next.lastName="Please enter your last name.";if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email))next.email="Please enter a valid email address.";if(!values.message.trim())next.message="Please enter a message.";if(!values.consent)next.consent="Please provide consent to continue.";return next};
  const submit=async(event:React.FormEvent)=>{event.preventDefault();const next=validate();if(Object.keys(next).length){setErrors(next);setStatus("error");return}setStatus("loading");try{const response=await fetch("/api/contact",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(values)});if(response.ok){setStatus("success");setValues(initial);return}if(response.status===503){setStatus("fallback");return}setStatus("error")}catch{setStatus("fallback")}};

  if(status==="success")return <div className="contact-form" role="status"><h2>Enquiry sent</h2><p style={{margin:0}}>Thank you for contacting Crown Power. A member of the team will respond using the details you provided.</p><button className="button button--dark" type="button" onClick={()=>setStatus("idle")}>Send another enquiry</button></div>;
  return <form className="contact-form" onSubmit={submit} noValidate><h2>Send an enquiry</h2><p>Fields marked <span className="required">*</span> are required.</p>
    <div className="form-grid"><Field label="First name" required error={errors.firstName}><input value={values.firstName} onChange={(e)=>update("firstName",e.target.value)} autoComplete="given-name" aria-invalid={!!errors.firstName} /></Field><Field label="Last name" required error={errors.lastName}><input value={values.lastName} onChange={(e)=>update("lastName",e.target.value)} autoComplete="family-name" aria-invalid={!!errors.lastName} /></Field></div>
    <div className="form-grid"><Field label="Email" required error={errors.email}><input type="email" value={values.email} onChange={(e)=>update("email",e.target.value)} placeholder="you@organisation.co.uk" autoComplete="email" aria-invalid={!!errors.email} /></Field><Field label="Phone"><input type="tel" value={values.phone} onChange={(e)=>update("phone",e.target.value)} placeholder="+44 …" autoComplete="tel" /></Field></div>
    <div className="form-grid"><Field label="Company"><input value={values.company} onChange={(e)=>update("company",e.target.value)} autoComplete="organization" /></Field><Field label="Area of interest"><select value={values.interest} onChange={(e)=>update("interest",e.target.value)}>{["General enquiry","Renewable Integration","Smart Energy Technologies","Power Systems","Industrial & Commercial","Battery Energy Storage (BESS)","Smart Grid Transformers","Battery Products","Internships & Careers","Partnership","Other"].map((item)=><option key={item}>{item}</option>)}</select></Field></div>
    <Field label="Message" required error={errors.message}><textarea value={values.message} onChange={(e)=>update("message",e.target.value)} placeholder="Tell us about your project or enquiry…" aria-invalid={!!errors.message} /></Field>
    <label className="consent"><input type="checkbox" checked={values.consent} onChange={(e)=>update("consent",e.target.checked)} aria-invalid={!!errors.consent} /><span>I consent to Crown Power Energy Systems Ltd storing and processing my details to respond to this enquiry, in line with the <Link href="/privacy-policy">Privacy Policy</Link>. <span className="required">*</span>{errors.consent&&<span className="field-error">{errors.consent}</span>}</span></label>
    <label style={{position:"absolute",left:"-10000px"}}>Website<input tabIndex={-1} autoComplete="off" value={values.website} onChange={(e)=>update("website",e.target.value)} /></label>
    {status==="error"&&<div className="form-message form-message--error" role="alert">Please correct the highlighted fields or try again. You can also email <a href="mailto:info@crownpoweruk.co.uk"><strong>info@crownpoweruk.co.uk</strong></a>.</div>}
    {status==="fallback"&&<div className="form-message form-message--fallback" role="status">Online sending is not configured. Please email <a href="mailto:info@crownpoweruk.co.uk"><strong>info@crownpoweruk.co.uk</strong></a> and include your enquiry details.</div>}
    <button className="button button--gold" type="submit" disabled={status==="loading"}>{status==="loading"?"Sending…":"Send enquiry →"}</button><p className="form-note">We only use your details to respond to this enquiry and handle them in line with our Privacy Policy.</p>
  </form>;
}

function Field({label,required=false,error,children}:{label:string;required?:boolean;error?:string;children:React.ReactNode}){return <label className="field"><span>{label} {required&&<span className="required">*</span>}</span>{children}{error&&<span className="field-error">{error}</span>}</label>}
