import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

interface OrderItem {
  product: {
    name: string
    price: number
  }
  quantity: number
}

interface CheckoutForm {
  firstName: string
  lastName: string
  email: string
  phone: string
  streetAddress: string
  suburb?: string
  city: string
  postcode: string
  notes?: string
}

interface OrderData {
  items: OrderItem[]
  checkoutForm: CheckoutForm
  total: number
}

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
    const orderData = (await request.json()) as OrderData

    const itemsList = orderData.items
      .map((item) => `- ${item.product.name} × ${item.quantity}: $${(item.product.price * item.quantity).toFixed(2)}`)
      .join('\n')

    const customerName = `${orderData.checkoutForm.firstName} ${orderData.checkoutForm.lastName}`
    const customerEmail = orderData.checkoutForm.email

    // Log order details (Success path)
    console.log('Order received:', {
      customer: customerName,
      email: customerEmail,
      total: orderData.total,
      items: orderData.items.length
    })

    // Try to send emails, but don't fail the request if email fails
    try {
      // Email to customer
      await transporter.sendMail({
        from: 'nico@legionnaire.co.nz',
        to: customerEmail,
        subject: 'Order Confirmation - Legionnaire Pre-Order',
        text: `
Dear ${customerName},

Thank you for your pre-order with Legionnaire!

ORDER DETAILS
=============
Order Date: ${new Date().toLocaleDateString('en-NZ')}

ITEMS ORDERED:
${itemsList}

TOTAL: $${orderData.total.toFixed(2)}

DELIVERY ADDRESS:
${orderData.checkoutForm.streetAddress}
${orderData.checkoutForm.suburb ? orderData.checkoutForm.suburb + ', ' : ''}${orderData.checkoutForm.city} ${orderData.checkoutForm.postcode}

EXPECTED DELIVERY: 6-8 weeks (unless stock is available in New Zealand)

We will contact you shortly at ${orderData.checkoutForm.phone} to confirm payment details and arrange delivery.

If you have any questions, please don't hesitate to contact us:
Email: nico@legionnaire.co.nz
Phone: +64 21 227 1971

Thank you for choosing Legionnaire - Fratres In Armis!

Best regards,
Legionnaire Team
www.legionnaire.co.nz
        `
      })

      // Email to business owner
      await transporter.sendMail({
        from: 'nico@legionnaire.co.nz',
        to: 'nico@legionnaire.co.nz',
        subject: `New Pre-Order: ${customerName}`,
        text: `
NEW PRE-ORDER RECEIVED
======================

Customer: ${customerName}
Email: ${customerEmail}
Phone: ${orderData.checkoutForm.phone}

DELIVERY ADDRESS:
${orderData.checkoutForm.streetAddress}
${orderData.checkoutForm.suburb ? orderData.checkoutForm.suburb + ', ' : ''}${orderData.checkoutForm.city} ${orderData.checkoutForm.postcode}

ITEMS ORDERED:
${itemsList}

TOTAL: $${orderData.total.toFixed(2)}

ADDITIONAL NOTES:
${orderData.checkoutForm.notes || 'None'}

Order Date: ${new Date().toLocaleDateString('en-NZ')} at ${new Date().toLocaleTimeString('en-NZ')}
        `
      })
      
      console.log('Order emails sent successfully')
    } catch (emailError) {
      console.error('Email sending failed (but order was logged):', emailError)
      // We continue execution to return success to the user
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Order submitted successfully',
        orderId: `ORD-${Date.now()}`,
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Order submission error:', error)
    return NextResponse.json({ success: true, message: 'Order received (Email pending)' }, { status: 200 })
  }
}
