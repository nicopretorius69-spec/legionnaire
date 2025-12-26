'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { ShoppingCart, Menu, X } from 'lucide-react'
import Link from 'next/link'
import { ProductCard } from '@/components/products/ProductCard'

// Product type
interface Product {
  id: string
  name: string
  category: string
  shortDescription: string
  price: number | null
  colors: string[]
  delivery: string
  image: string
}

// Products data
const products: Product[] = [
  {
    id: 'ftac-evolution',
    name: 'F-TAC™ Evolution',
    category: 'Premium',
    shortDescription: 'The modern single solution rifle scabbard.',
    price: 298.00,
    colors: ['Olive', 'Black'],
    delivery: '6-8 weeks',
    image: '/images/products/ftac-evolution.png',
  },
  {
    id: 'legionnaire-drag-bag',
    name: 'Legionnaire Drag Bag',
    category: 'Professional',
    shortDescription: 'Premium drag bag setting the benchmark in the shooting industry.',
    price: null,
    colors: ['Olive', 'Black'],
    delivery: '6-8 weeks',
    image: '/images/products/drag-bag.png',
  },
  {
    id: 'tuls-mat',
    name: 'TULS Mat',
    category: 'Lightweight',
    shortDescription: 'Lightweight shooting solution. Deploys in under 10 seconds.',
    price: 268.00,
    colors: [],
    delivery: '6-8 weeks',
    image: '/images/products/tuls-mat.png',
  },
  {
    id: 'legionnaire-mab',
    name: 'Legionnaire MAB (50 Round)',
    category: 'Modular',
    shortDescription: 'One-of-a-kind modular ammo storage solution.',
    price: null,
    colors: [],
    delivery: '6-8 weeks',
    image: '/images/products/mab-50.png',
  },
]

// Cart item type
interface CartItem {
  product: Product
  quantity: number
  selectedColor?: string
}

export default function Home() {
  const [mounted, setMounted] = useState(false)
  useEffect(() => { setMounted(true) }, [])

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [cart, setCart] = useState<CartItem[]>([])
  const [showCart, setShowCart] = useState(false)
  const [showCheckout, setShowCheckout] = useState(false)
  
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })
  const [contactSubmitting, setContactSubmitting] = useState(false)
  const [contactSubmitted, setContactSubmitted] = useState(false)
  
  const [checkoutForm, setCheckoutForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    streetAddress: '',
    suburb: '',
    city: '',
    postcode: '',
    notes: '',
  })
  const [checkoutSubmitting, setCheckoutSubmitting] = useState(false)
  const [checkoutSubmitted, setCheckoutSubmitted] = useState(false)

  // Add to cart
  const addToCart = (product: Product, quantity: number, color?: string) => {
    const existingItem = cart.find(
      (item) => item.product.id === product.id && item.selectedColor === color
    )

    if (existingItem) {
      setCart(
        cart.map((item) =>
          item.product.id === product.id && item.selectedColor === color
            ? { ...item, quantity: item.quantity + quantity }
            : item
        )
      )
    } else {
      setCart([...cart, { product, quantity, selectedColor: color }])
    }
  }

  // Remove from cart
  const removeFromCart = (productId: string, color?: string) => {
    setCart(cart.filter((item) => !(item.product.id === productId && item.selectedColor === color)))
  }

  // Calculate total
  const cartTotal = cart.reduce((total, item) => {
    return total + (item.product.price || 0) * item.quantity
  }, 0)

  // Handle contact form
  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setContactSubmitting(true)

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(contactForm),
      })

      if (response.ok) {
        setContactSubmitted(true)
        setContactForm({ name: '', email: '', subject: '', message: '' })
        setTimeout(() => setContactSubmitted(false), 5000)
      } else {
        alert('Error sending message. Please try again.')
      }
    } catch (error) {
      console.error('Error:', error)
      alert('Error sending message. Please try again.')
    } finally {
      setContactSubmitting(false)
    }
  }

  // Handle checkout
  const handleCheckoutSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setCheckoutSubmitting(true)

    try {
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: cart,
          checkoutForm,
          total: cartTotal,
        }),
      })

      if (response.ok) {
        setCheckoutSubmitted(true)
        setCheckoutForm({
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          streetAddress: '',
          suburb: '',
          city: '',
          postcode: '',
          notes: '',
        })
        setCart([])
        setShowCheckout(false)
        setTimeout(() => setCheckoutSubmitted(false), 5000)
      } else {
        alert('Error submitting order. Please try again.')
      }
    } catch (error) {
      console.error('Error:', error)
      alert('Error submitting order. Please try again.')
    } finally {
      setCheckoutSubmitting(false)
    }
  }

  if (!mounted) return <div className="bg-white min-h-screen" />

  return (
    <div className="bg-white min-h-screen overflow-y-auto" suppressHydrationWarning>
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white border-b border-gray-200 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-24">
            
            {/* Logo on the Left */}
            <div className="flex-shrink-0">
              <Link href="/" className="block">
                <img 
                  src="/images/legionnaire-logo.png" 
                  alt="Legionnaire" 
                  className="h-16 w-auto object-contain" 
                />
              </Link>
            </div>

            {/* Links in the Middle */}
            <div className="hidden md:flex gap-10 items-center">
              <a href="#about" className="text-gray-900 hover:text-red-600 transition font-bold uppercase tracking-widest text-xs">
                About
              </a>
              <a href="#products" className="text-gray-900 hover:text-red-600 transition font-bold uppercase tracking-widest text-xs">
                Products
              </a>
              <a href="#contact" className="text-gray-900 hover:text-red-600 transition font-bold uppercase tracking-widest text-xs">
                Contact
              </a>
            </div>

            {/* Cart and Get Started on the Right */}
            <div className="flex items-center gap-6">
              <button
                onClick={() => setShowCart(!showCart)}
                className="relative p-2 text-gray-900 hover:text-red-600 transition"
              >
                <ShoppingCart className="w-6 h-6" />
                {mounted && cart.length > 0 && (
                  <span className="absolute top-0 right-0 bg-red-600 text-white text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center">
                    {cart.length}
                  </span>
                )}
              </button>
              
              <Button 
                className="hidden sm:block bg-red-600 hover:bg-red-700 text-white font-bold uppercase tracking-widest text-xs px-6"
                onClick={() => document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Get Started
              </Button>

              {/* Mobile Menu Button */}
              <div className="md:hidden flex items-center">
                <button
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  className="p-2 text-gray-900"
                >
                  {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-0 px-0 bg-gray-900 text-white relative min-h-[85vh] flex items-center">
        <Image
          src="/images/lifestyle/hunter-glassing-mountains.png"
          alt="Hunter with F-TAC™ Evolution in mountains"
          fill
          className="object-cover absolute inset-0"
          priority
        />
        <div className="absolute inset-0 bg-black/70"></div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="mb-6">
            <p className="text-red-500 font-semibold text-sm tracking-widest">FRATRES IN ARMIS</p>
            <p className="text-gray-300 text-lg">Brothers in Arms</p>
          </div>

          <h1 className="text-5xl sm:text-6xl font-bold mb-6 leading-tight">
            Premium Tactical Gear
          </h1>

          <p className="text-2xl text-gray-200 mb-8 max-w-3xl mx-auto font-medium">
            South African engineered tactical equipment for hunters and outdoor enthusiasts in New Zealand. Experience the new F-TAC™ Evolution revolutionary designed for performance in real-world conditions.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-red-600 hover:bg-red-700 text-white"
              onClick={() => {
                document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' })
              }}
            >
              View Products
            </Button>
            <Button
              size="lg"
              className="bg-white text-gray-900 hover:bg-gray-100 font-semibold"
              onClick={() => {
                document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
              }}
            >
              Get in Touch
            </Button>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold mb-2 text-center">About Legionnaire</h2>
          <p className="text-center text-gray-600 mb-12">Fratres In Armis - Brothers in Arms</p>

          <div className="grid md:grid-cols-2 gap-12 items-start">
            {/* Left side */}
            <div className="space-y-6">
              <div>
                <h3 className="text-2xl font-bold mb-4">Legionnaire Exists for One Reason</h3>
                <p className="text-gray-700 font-semibold mb-4">Gear must work when it matters.</p>
                <p className="text-gray-700 mb-4">
                  Our products are shaped by real-world hunting and outdoor experience in demanding environments, then refined and adapted for New Zealand conditions. Every design choice is practical, purposeful, and built to stand up to real use — not trends.
                </p>
                <p className="text-gray-700 mb-4">
                  The F-TAC™ Evolution and supporting range are designed with durability, functionality, and long-term reliability in mind. From materials to construction, nothing is added for show. If it doesn't serve a purpose in the field, it doesn't belong.
                </p>
                <p className="text-gray-700">
                  Now available in New Zealand, Legionnaire supports hunters and outdoor enthusiasts who value quiet confidence, proven design, and equipment they can trust.
                </p>
              </div>
            </div>

            {/* Right side - Image */}
            <div className="relative aspect-video rounded-lg overflow-hidden self-center shadow-lg">
              <Image
                src="/images/lifestyle/ftac-and-mat.png"
                alt="Legionnaire Gear in the Field"
                fill
                className="object-cover brightness-[1.1]"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section id="products" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold mb-4 text-center">Our Products</h2>
          <p className="text-center text-gray-600 mb-12">Built for real-world use. Designed to perform where it matters.</p>

          <div className="grid md:grid-cols-2 gap-8 mb-20">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} onAddToCart={addToCart} />
            ))}
          </div>

          {/* Why Choose Legionnaire Section */}
          <div className="mt-20">
            <h2 className="text-4xl font-bold mb-4 text-center">Why Choose Legionnaire?</h2>
            <p className="text-center text-gray-600 mb-12">See our products in action - engineered for performance in real-world conditions</p>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="relative aspect-[3/4] rounded-lg overflow-hidden group">
                <Image
                  src="/images/lifestyle/battle-tested.png"
                  alt="Battle-Tested - F-TAC™ Evolution in field"
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent flex items-end">
                  <div className="p-6 text-white w-full">
                    <h3 className="text-xl font-bold mb-2">Battle-Tested</h3>
                    <p className="text-xs opacity-90">Engineered and proven in demanding tactical conditions</p>
                  </div>
                </div>
              </div>

              <div className="relative aspect-[3/4] rounded-lg overflow-hidden group">
                <Image
                  src="/images/lifestyle/purpose-built.png"
                  alt="Purpose-Built - F-TAC™ Evolution with binoculars"
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent flex items-end">
                  <div className="p-6 text-white w-full">
                    <h3 className="text-xl font-bold mb-2">Purpose-Built</h3>
                    <p className="text-xs opacity-90">Designed specifically for tactical and hunting use in all conditions.</p>
                  </div>
                </div>
              </div>

              <div className="relative aspect-[3/4] rounded-lg overflow-hidden group">
                <Image
                  src="/images/lifestyle/performance.png"
                  alt="Performance - F-TAC™ Evolution in mountainous terrain"
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent flex items-end">
                  <div className="p-6 text-white w-full">
                    <h3 className="text-xl font-bold mb-2">Performance</h3>
                    <p className="text-xs opacity-90">Optimized for reliability and durability in extreme conditions</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-center">Get in Touch</h2>

          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div>
              <p className="text-gray-600 mb-8">Have questions about our products? Contact us directly.</p>

              <div className="space-y-6">
                <div>
                  <h3 className="font-bold text-lg mb-2">✉ Email</h3>
                  <p className="text-gray-700">nico@legionnaire.co.nz</p>
                </div>

                <div>
                  <h3 className="font-bold text-lg mb-2">📞 Phone</h3>
                  <p className="text-gray-700">+64 21 227 1971</p>
                </div>

                <div>
                  <h3 className="font-bold text-lg mb-2">📍 Address</h3>
                  <p className="text-gray-700">
                    39 Clansman Terrace<br />
                    Gulf Harbour<br />
                    0930, New Zealand
                  </p>
                </div>

                <Card className="p-4 bg-red-50 border-l-4 border-l-red-600">
                  <h4 className="font-bold mb-2">Response Time</h4>
                  <p className="text-gray-700 text-sm">
                    We typically respond to inquiries within 24 hours during business days.
                  </p>
                </Card>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-white rounded-lg shadow-lg p-8">
              {contactSubmitted ? (
                <div className="text-center py-8">
                  <div className="flex justify-center mb-4">
                    <div className="bg-green-100 rounded-full p-4">
                      <span className="text-green-600 text-3xl">✓</span>
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Message Sent!</h3>
                  <p className="text-gray-600">Thank you for contacting us. We'll get back to you as soon as possible.</p>
                </div>
              ) : (
                <form onSubmit={handleContactSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold mb-2">Name</label>
                    <Input
                      placeholder="Your name"
                      value={contactForm.name}
                      onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-2">Email</label>
                    <Input
                      type="email"
                      placeholder="your@email.com"
                      value={contactForm.email}
                      onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-2">Subject</label>
                    <Input
                      placeholder="How can we help?"
                      value={contactForm.subject}
                      onChange={(e) => setContactForm({ ...contactForm, subject: e.target.value })}
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-2">Message</label>
                    <Textarea
                      placeholder="Your message..."
                      rows={5}
                      value={contactForm.message}
                      onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                      required
                    />
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full bg-red-600 hover:bg-red-700 text-white"
                    disabled={contactSubmitting}
                  >
                    {contactSubmitting ? 'Sending...' : 'Send Message'}
                  </Button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Shopping Cart Sidebar */}
      {showCart && (
        <div className="fixed right-0 top-0 h-full w-full sm:w-96 bg-white shadow-lg z-[60] overflow-y-auto">
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold">Shopping Cart</h3>
              <button
                onClick={() => setShowCart(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {cart.length === 0 ? (
              <p className="text-gray-500 text-center py-8">Your cart is empty</p>
            ) : (
              <>
                <div className="space-y-4 mb-6">
                  {cart.map((item, index) => (
                    <Card key={index} className="p-4">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h4 className="font-bold">{item.product.name}</h4>
                          {item.selectedColor && (
                            <p className="text-sm text-gray-600">Color: {item.selectedColor}</p>
                          )}
                        </div>
                        <button
                          onClick={() => removeFromCart(item.product.id, item.selectedColor)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Qty: {item.quantity}</span>
                        {item.product.price && (
                          <span className="font-bold text-red-600">
                            ${(item.product.price * item.quantity).toFixed(2)}
                          </span>
                        )}
                      </div>
                    </Card>
                  ))}
                </div>

                <div className="border-t pt-4 mb-6">
                  <div className="flex justify-between items-center mb-4">
                    <span className="font-bold">Total:</span>
                    <span className="text-2xl font-bold text-red-600">
                      ${cartTotal.toFixed(2)}
                    </span>
                  </div>
                  <Button
                    onClick={() => {
                      setShowCart(false)
                      setShowCheckout(true)
                    }}
                    className="w-full bg-red-600 hover:bg-red-700 text-white"
                  >
                    Proceed to Checkout
                  </Button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* Checkout Modal */}
      {showCheckout && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-[70] overflow-y-auto">
          <div className="min-h-screen flex items-center justify-center p-4">
            <Card className="w-full max-w-2xl p-8">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-bold">Checkout</h2>
                <button
                  onClick={() => setShowCheckout(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {checkoutSubmitted ? (
                <div className="text-center py-8">
                  <div className="flex justify-center mb-4">
                    <div className="bg-green-100 rounded-full p-4">
                      <span className="text-green-600 text-3xl">✓</span>
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Order Submitted!</h3>
                  <p className="text-gray-600 mb-4">
                    Thank you for your pre-order. We've received your order and will contact you shortly.
                  </p>
                  <p className="text-sm text-gray-500">
                    Confirmation email sent to {checkoutForm.email}
                  </p>
                </div>
              ) : (
                <form onSubmit={handleCheckoutSubmit} className="space-y-6">
                  <div>
                    <h3 className="text-xl font-bold mb-4">Delivery Information</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      <Input
                        placeholder="First Name"
                        value={checkoutForm.firstName}
                        onChange={(e) => setCheckoutForm({ ...checkoutForm, firstName: e.target.value })}
                        required
                      />
                      <Input
                        placeholder="Last Name"
                        value={checkoutForm.lastName}
                        onChange={(e) => setCheckoutForm({ ...checkoutForm, lastName: e.target.value })}
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold mb-4">Contact Information</h3>
                    <div className="space-y-4">
                      <Input
                        type="email"
                        placeholder="Email Address"
                        value={checkoutForm.email}
                        onChange={(e) => setCheckoutForm({ ...checkoutForm, email: e.target.value })}
                        required
                      />
                      <Input
                        placeholder="Phone Number"
                        value={checkoutForm.phone}
                        onChange={(e) => setCheckoutForm({ ...checkoutForm, phone: e.target.value })}
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold mb-4">Delivery Address</h3>
                    <div className="space-y-4">
                      <Input
                        placeholder="Street Address"
                        value={checkoutForm.streetAddress}
                        onChange={(e) => setCheckoutForm({ ...checkoutForm, streetAddress: e.target.value })}
                        required
                      />
                      <Input
                        placeholder="Suburb"
                        value={checkoutForm.suburb}
                        onChange={(e) => setCheckoutForm({ ...checkoutForm, suburb: e.target.value })}
                        required
                      />
                      <div className="grid md:grid-cols-2 gap-4">
                        <Input
                          placeholder="City"
                          value={checkoutForm.city}
                          onChange={(e) => setCheckoutForm({ ...checkoutForm, city: e.target.value })}
                          required
                        />
                        <Input
                          placeholder="Postcode"
                          value={checkoutForm.postcode}
                          onChange={(e) => setCheckoutForm({ ...checkoutForm, postcode: e.target.value })}
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold mb-4">Additional Notes</h3>
                    <Textarea
                      placeholder="Any special delivery instructions or questions?"
                      rows={4}
                      value={checkoutForm.notes}
                      onChange={(e) => setCheckoutForm({ ...checkoutForm, notes: e.target.value })}
                    />
                  </div>

                  <Card className="p-4 bg-gray-50">
                    <h4 className="font-bold mb-4">Order Summary</h4>
                    <div className="space-y-2 mb-4">
                      {cart.map((item, index) => (
                        <div key={index} className="flex justify-between text-sm">
                          <span>
                            {item.product.name} {item.selectedColor && `(${item.selectedColor})`} x {item.quantity}
                          </span>
                          {item.product.price && (
                            <span>${(item.product.price * item.quantity).toFixed(2)}</span>
                          )}
                        </div>
                      ))}
                    </div>
                    <div className="border-t pt-2 flex justify-between font-bold">
                      <span>Total:</span>
                      <span className="text-red-600">${cartTotal.toFixed(2)}</span>
                    </div>
                    <Card className="mt-4 p-3 bg-blue-50 border-l-4 border-l-blue-600">
                      <p className="text-sm text-gray-700">
                        <strong>Delivery:</strong> Standard delivery: 6-8 weeks. We'll contact you to arrange payment and confirm delivery details.
                      </p>
                    </Card>
                  </Card>

                  <Button 
                    type="submit" 
                    className="w-full bg-red-600 hover:bg-red-700 text-white text-lg py-6"
                    disabled={checkoutSubmitting}
                  >
                    {checkoutSubmitting ? 'Submitting...' : 'Submit Pre-Order'}
                  </Button>
                </form>
              )}
            </Card>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 px-4 sm:px-6 lg:px-8 border-t border-gray-800">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-4">
            <div>
              <h3 className="font-bold text-sm uppercase tracking-widest text-red-500 mb-2">Legionnaire</h3>
              <p className="text-gray-400 text-xs leading-relaxed">
                FRATRES IN ARMIS<br />
                Premium tactical gear from South Africa to New Zealand.
              </p>
            </div>

            <div>
              <h4 className="font-bold mb-2 uppercase tracking-widest text-[10px] text-gray-300">Products</h4>
              <ul className="space-y-1 text-xs text-gray-500">
                <li><a href="#products" className="hover:text-white transition">F-TAC™ Evolution</a></li>
                <li><a href="#products" className="hover:text-white transition">Legionnaire Drag Bag</a></li>
                <li><a href="#products" className="hover:text-white transition">TULS Mat</a></li>
                <li><a href="#products" className="hover:text-white transition">Legionnaire MAB</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-2 uppercase tracking-widest text-[10px] text-gray-300">Company</h4>
              <ul className="space-y-1 text-xs text-gray-500">
                <li><a href="#about" className="hover:text-white transition">About Us</a></li>
                <li><a href="#contact" className="hover:text-white transition">Contact</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-2 uppercase tracking-widest text-[10px] text-gray-300">Contact</h4>
              <p className="text-xs text-gray-500 mb-1">nico@legionnaire.co.nz</p>
              <p className="text-xs text-gray-500 mb-1">+64 21 227 1971</p>
              <p className="text-xs text-gray-500">Gulf Harbour, 0930, NZ</p>
            </div>
          </div>

          <div className="border-t border-gray-800/50 py-4 flex flex-col md:flex-row justify-between items-center text-[10px] text-gray-600 uppercase tracking-widest">
            <p>© 2025 Legionnaire. All rights reserved.</p>
            <div className="flex gap-6 mt-2 md:mt-0">
              <a href="#" className="hover:text-white transition">Privacy</a>
              <a href="#" className="hover:text-white transition">Terms</a>
              <a href="https://www.legionnaire.co.nz" className="hover:text-white transition">legionnaire.co.nz</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
