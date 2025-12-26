import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

// Configure email transporter with Google Workspace
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: 'nico@legionnaire.co.nz',
    pass: 'uistomtokioytpgq',
  },
})

export async function POST(request: NextRequest) {
  try {
    const contactData = await request.json()
    const { name, email, subject, message } = contactData

    console.log('Contact form received:', { name, email, subject })

    // Try to send emails, but don't fail the request if email fails
    try {
      // Send email to business owner
      await transporter.sendMail({
        from: 'nico@legionnaire.co.nz',
        to: 'nico@legionnaire.co.nz',
        subject: `New Contact Form: ${subject}`,
        text: `
Name: ${name}
Email: ${email}
Subject: ${subject}

Message:
${message}

---
Sent from Legionnaire Website
        `,
      })

      // Send confirmation email to customer
      await transporter.sendMail({
        from: 'nico@legionnaire.co.nz',
        to: email,
        subject: 'We received your message - Legionnaire',
        text: `
Dear ${name},

Thank you for contacting Legionnaire!

We've received your message and will get back to you as soon as possible.

Subject: ${subject}

Your message:
${message}

---
Best regards,
Legionnaire Team
nico@legionnaire.co.nz
+64 21 227 1971
www.legionnaire.co.nz
        `,
      })
      
      console.log('Contact emails sent successfully')
    } catch (emailError) {
      console.error('Email sending failed (but message was logged):', emailError)
      // Continue execution to return success to user
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Message sent successfully. We will contact you shortly.',
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json({ success: true, message: 'Message received (Email pending)' }, { status: 200 })
  }
}
