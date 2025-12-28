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
  features: string[]
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
    shortDescription:
      'The modern single solution rifle scabbard. Combines the best elements from F-TR, F-TAC, and F-TAC Evolve predecessors.',
    features: [
      '10mm thermal insulation & padding',
      'Built-in crown protector',
      '3 adjustable YKK clips with 25mm webbing',
      'Detachable shoulder sling',
      'Chest strap for hands-free carry',
      '2 side pockets for essentials',
      'Molly webbing & velcro patches',
    ],
    price: 298.0,
    colors: ['Olive', 'Black'],
    delivery: '6-8 weeks',
    image: '/images/products/ftac-evolution.png',
  },
  {
    id: 'legionnaire-drag-bag',
    name: 'Legionnaire Drag Bag',
    category: 'Professional',
    shortDescription:
      'Premium drag bag setting the benchmark in the shooting industry. Designed and tested by shooters.',
    features: [
      'Polyester/acrylic woven blend',
      'Fluorocarbon treated - fully waterproof',
      'Weighs only 2.3kg when empty',
      '145cm length - fits rifles up to 56 inches',
      'Boxed stitched for maximum strength',
      'YKK zippers with custom branded tabs',
      '2 padded shoulder straps',
      '2 outside pockets',
    ],
    price: null,
    colors: ['Olive', 'Black'],
    delivery: '6-8 weeks',
    image: '/images/products/drag-bag.png',
  },
  {
    id: 'tuls-mat',
    name: 'TULS Mat',
    category: 'Lightweight',
    shortDescription:
      'Lightweight shooting solution. Deploys in under 10 seconds, stows in less than 30 seconds.',
    features: [
      'Lightweight design',
      'Built-in FlexLoad load bar for bipod',
      'Minimal padding for torso protection',
      'Quick deploy/stow system',
      'Fits in truck seat storage',
      'Multi-purpose use',
      'Designed for field use',
    ],
    price: 268.0,
    colors: [],
    delivery: '6-8 weeks',
    image: '/images/products/tuls-mat.png',
  },
  {
    id: 'legionnaire-mab',
    name: 'Legionnaire MAB (50 Round)',
    category: 'Modular',
    shortDescription:
      'One-of-a-kind modular ammo storage solution with removable ammo strips.',
    features: [
      'Removable ammo strips',
      'Mil-Spec woven elastic construction',
      'Stores .223 to .300 Win Mag',
      'Capacity: 50 rounds',
      'Thermal protection layers',
      'No ammo contact - no rattles',
      'Fits Ligionnaire Drag Bag',
    ],
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
  useEffect(() => {
    setMounted(true)
  }, [])

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

  const cartTotal = cart.reduce(
    (total, item) => total + (item.product.price || 0) * item.quantity,
    0
  )

  if (!mounted) return <div className="bg-white min-h-screen" />

  return (
    <div className="bg-white min-h-screen overflow-y-auto" suppressHydrationWarning>
      {/* ABOUT TEXT FIX */}
      <p>
        keeping your hands free while your weapon stays protected, accessible,
        and out of harm&apos;s way.
      </p>

      {/* CONTACT SUCCESS FIX */}
      <p>
        Thank you for contacting us. We&apos;ll get back to you as soon as
        possible.
      </p>

      {/* CHECKOUT SUCCESS FIX */}
      <p>
        Thank you for your pre-order. We&apos;ve received your order and
        will contact you shortly.
      </p>
    </div>
  )
}
