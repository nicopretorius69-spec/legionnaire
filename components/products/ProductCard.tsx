'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'

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

export function ProductCard({
  product,
  onAddToCart,
}: {
  product: Product
  onAddToCart: (product: Product, quantity: number, color?: string) => void
}) {
  const [quantity, setQuantity] = useState(1)
  const [selectedColor, setSelectedColor] = useState(product.colors[0] || '')

  return (
    <Card className="overflow-hidden hover:shadow-lg transition">
      {/* Product Image */}
      <div className="w-full h-64 bg-gray-100 flex items-center justify-center relative">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-contain p-4"
        />
      </div>

      <div className="p-6">
        <div className="mb-4">
          <span className="inline-block px-3 py-1 bg-red-100 text-red-600 text-xs font-semibold rounded-full mb-2">
            {product.category}
          </span>
          <h3 className="text-2xl font-bold mb-2">{product.name}</h3>
          <p className="text-gray-600 text-sm mb-4">{product.shortDescription}</p>
          <ul className="mt-4 space-y-1">
            {product.features?.map((feature, i) => (
              <li key={i} className="text-xs text-gray-500 flex items-start gap-2">
                <span className="text-red-500 mt-1">•</span>
                {feature}
              </li>
            ))}
          </ul>
        </div>

        {/* Colors */}
        {product.colors.length > 0 && (
          <div className="mb-4">
            <label className="block text-sm font-semibold mb-2">Color</label>
            <div className="flex gap-2">
              {product.colors.map((color) => (
                <button
                  key={color}
                  onClick={() => setSelectedColor(color)}
                  className={`px-4 py-2 border-2 rounded transition ${
                    selectedColor === color
                      ? 'border-red-600 bg-red-50'
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                >
                  {color}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Price */}
        <div className="mb-4">
          <p className="text-sm text-gray-600 mb-1">Price:</p>
          {product.price ? (
            <p className="text-3xl font-bold text-red-600">${product.price.toFixed(2)}</p>
          ) : (
            <p className="text-2xl font-bold text-orange-600">Price on Request</p>
          )}
        </div>

        {/* Delivery */}
        <div className="mb-6 p-3 bg-blue-50 rounded">
          <p className="text-sm text-gray-700">
            <strong>Delivery:</strong> {product.delivery}
          </p>
        </div>

        {/* Quantity */}
        <div className="mb-6">
          <label className="block text-sm font-semibold mb-2">Quantity</label>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="px-3 py-2 border border-gray-300 rounded hover:bg-gray-100"
            >
              −
            </button>
            <input
              type="number"
              min="1"
              value={quantity}
              onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
              className="w-12 text-center border border-gray-300 rounded py-2"
            />
            <button
              onClick={() => setQuantity(quantity + 1)}
              className="px-3 py-2 border border-gray-300 rounded hover:bg-gray-100"
            >
              +
            </button>
          </div>
        </div>

        {/* Action Button */}
        {product.price ? (
          <Button
            onClick={() => {
              onAddToCart(product, quantity, selectedColor || undefined)
              setQuantity(1)
            }}
            className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3"
          >
            Add to Pre-Order
          </Button>
        ) : (
          <Button
            variant="outline"
            className="w-full border-gray-400 text-gray-700 font-bold py-3"
          >
            Contact for Pricing
          </Button>
        )}
      </div>
    </Card>
  )
}
