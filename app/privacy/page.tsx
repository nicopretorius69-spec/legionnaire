import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function PrivacyPage() {
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
        <h1 className="text-4xl font-bold mb-8">Privacy & Security</h1>
        
        <div className="prose prose-slate max-w-none space-y-6 text-gray-700 leading-relaxed">
          <p className="text-xl font-semibold text-gray-900">Your privacy matters to us.</p>
          
          <p>
            Legionnaire is committed to protecting your personal information and handling it responsibly. 
            Any information you provide is used only for order processing, customer communication, and service improvement.
          </p>

          <p>
            We do not sell or misuse customer data. Personal information is shared only where necessary to process payments, 
            deliver orders, or comply with legal obligations.
          </p>

          <p>
            Reasonable steps are taken to safeguard your information and maintain confidentiality in line with applicable 
            privacy laws in New Zealand and Australia.
          </p>

          <p>
            By using this website, you consent to the collection and use of information as described above.
          </p>
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
