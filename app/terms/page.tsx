import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-200 py-6">
        <div className="max-w-4xl mx-auto px-4 flex justify-between items-center">
          <Link href="/">
            <Image 
              src="/images/legionnaire-logo.png" 
              alt="Legionnaire" 
              width={150} 
              height={64} 
              className="h-12 w-auto object-contain" 
            />
          </Link>
          <Link href="/">
            <Button variant="outline" size="sm">Back to Home</Button>
          </Link>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-4xl mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold mb-8">Terms & Conditions</h1>
        
        <div className="prose prose-slate max-w-none space-y-8 text-gray-700 leading-relaxed">
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Customer Support</h2>
            <p>
              Welcome to Legionnaire. We are committed to providing clear communication, reliable service, and practical support to all customers.
            </p>
            <p>
              If you have questions about products, orders, availability, or general enquiries, please contact us using the details provided on this website. 
              We aim to respond promptly and assist wherever possible to ensure a smooth and professional experience.
            </p>
            <p>
              By using this website and purchasing from Legionnaire, you agree to these Terms & Conditions and the information provided on this site.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Returns Policy</h2>
            <p>
              We take care to describe our products accurately and clearly.
            </p>
            <p>
              If a product is faulty or arrives damaged, please contact us within a reasonable timeframe so we can assess and resolve the issue. 
              Returns or refunds may be offered in accordance with applicable consumer protection laws in New Zealand or Australia, depending on the customer’s location.
            </p>
            <p>
              Change-of-mind returns are not guaranteed and will be assessed on a case-by-case basis, unless required by law.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Pre-Order Policy</h2>
            <p>
              Some Legionnaire products are offered as pre-orders. These items may not be held in local stock and may be produced or supplied once an order is placed.
            </p>
            <p>
              Estimated delivery timeframes are provided in good faith but may vary due to manufacturing, shipping, or customs processes.
            </p>
            <p>By placing a pre-order, you acknowledge and accept that:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Delivery dates are estimates, not guarantees</li>
              <li>Delays may occur beyond our control</li>
              <li>Pre-order purchases are generally non-refundable once production has commenced, unless required by law</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Warranty & Product Use Disclaimer</h2>
            <p>
              Legionnaire products are designed for lawful hunting, outdoor, and sporting use. Customers are responsible for ensuring that all products are used safely, 
              correctly, and in accordance with applicable laws and regulations in their location.
            </p>
            <p>
              Normal wear and tear, misuse, improper handling, unauthorised modification, or use outside the intended purpose are not covered under warranty.
            </p>
            <p>
              Legionnaire is not responsible for injury, loss, or damage resulting from incorrect use, modification, or failure to follow product instructions or safety guidelines.
            </p>
            <p>
              Any warranty or remedy offered is limited to the product itself and does not extend to consequential or indirect loss, except where required by law.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Accepted Payment Methods</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Electronic Bank Transfer</li>
              <li>Credit Cards (Visa, Mastercard, American Express)</li>
              <li>Debit Cards</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Governing Law</h2>
            <p>
              These Terms & Conditions are governed by and interpreted in accordance with the laws of New Zealand and Australia, depending on the customer’s location. 
              Any disputes will be subject to the applicable jurisdiction.
            </p>
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-200 py-8 mt-12">
        <div className="max-w-4xl mx-auto px-4 text-center text-sm text-gray-500">
          <p>© 2025 Legionnaire. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
