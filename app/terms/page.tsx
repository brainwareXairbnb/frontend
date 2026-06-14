'use client'

import { useRouter } from 'next/navigation'
import { ChevronLeft } from 'lucide-react'

export default function TermsOfServicePage() {
  const router = useRouter()

  return (
    <div className='min-h-screen' style={{ background: '#fff' }}>
      {/* Header */}
      <div className='sticky top-[env(safe-area-inset-top)] z-10' style={{ background: '#fff', borderBottom: '1px solid #e5e5e5' }}>
        <div className='max-w-3xl mx-auto px-5 py-4 flex items-center gap-3'>
          <button
            onClick={() => router.back()}
            className='p-2 -ml-2 rounded-full hover:bg-gray-100 active:bg-gray-200 transition-colors'
          >
            <ChevronLeft className='w-5 h-5' style={{ color: '#222' }} />
          </button>
          <h1 className='text-lg font-semibold' style={{ color: '#222' }}>
            Terms of Service
          </h1>
        </div>
      </div>

      {/* Content */}
      <div className='max-w-3xl mx-auto px-5 py-8'>
        <div className='prose prose-sm max-w-none'>
          <p className='text-sm' style={{ color: '#717171' }}>
            Last updated: June 6, 2026
          </p>

          <section className='mt-8'>
            <h2 className='text-xl font-semibold mb-4' style={{ color: '#222' }}>
              1. Introduction
            </h2>
            <p className='text-[15px] leading-relaxed mb-4' style={{ color: '#222' }}>
              Welcome to BrainX, a property rental platform exclusively designed for Brainware University students.
              By accessing or using our platform, you agree to be bound by these Terms of Service. Please read them carefully.
            </p>
          </section>

          <section className='mt-8'>
            <h2 className='text-xl font-semibold mb-4' style={{ color: '#222' }}>
              2. Eligibility
            </h2>
            <p className='text-[15px] leading-relaxed mb-4' style={{ color: '#222' }}>
              Our platform is exclusively available to:
            </p>
            <ul className='list-disc pl-6 space-y-2 text-[15px]' style={{ color: '#222' }}>
              <li>Current students of Brainware University with valid student identification</li>
              <li>Property owners willing to rent to Brainware University students</li>
              <li>Individuals who are at least 18 years of age</li>
            </ul>
            <p className='text-[15px] leading-relaxed mt-4' style={{ color: '#222' }}>
              You must provide accurate and up-to-date information during registration, including valid Brainware University credentials for students.
            </p>
          </section>

          <section className='mt-8'>
            <h2 className='text-xl font-semibold mb-4' style={{ color: '#222' }}>
              3. User Accounts
            </h2>
            <h3 className='text-lg font-semibold mb-3 mt-4' style={{ color: '#222' }}>
              3.1 Account Types
            </h3>
            <ul className='list-disc pl-6 space-y-2 text-[15px]' style={{ color: '#222' }}>
              <li><strong>Student Accounts:</strong> For Brainware University students seeking accommodation</li>
              <li><strong>Owner Accounts:</strong> For property owners listing their properties for rent</li>
            </ul>

            <h3 className='text-lg font-semibold mb-3 mt-4' style={{ color: '#222' }}>
              3.2 Account Responsibilities
            </h3>
            <p className='text-[15px] leading-relaxed mb-4' style={{ color: '#222' }}>
              You are responsible for:
            </p>
            <ul className='list-disc pl-6 space-y-2 text-[15px]' style={{ color: '#222' }}>
              <li>Maintaining the confidentiality of your account credentials</li>
              <li>All activities that occur under your account</li>
              <li>Notifying us immediately of any unauthorized access or security breach</li>
              <li>Ensuring all information provided is accurate and current</li>
            </ul>
          </section>

          <section className='mt-8'>
            <h2 className='text-xl font-semibold mb-4' style={{ color: '#222' }}>
              4. Property Listings
            </h2>
            <h3 className='text-lg font-semibold mb-3 mt-4' style={{ color: '#222' }}>
              4.1 Owner Obligations
            </h3>
            <p className='text-[15px] leading-relaxed mb-4' style={{ color: '#222' }}>
              Property owners must:
            </p>
            <ul className='list-disc pl-6 space-y-2 text-[15px]' style={{ color: '#222' }}>
              <li>Provide accurate, complete, and truthful information about their properties</li>
              <li>Upload genuine photographs of the property</li>
              <li>Disclose all relevant property conditions, amenities, and restrictions</li>
              <li>Comply with all local housing laws and regulations</li>
              <li>Honor confirmed bookings and rental agreements</li>
              <li>Maintain properties in safe and habitable condition</li>
            </ul>

            <h3 className='text-lg font-semibold mb-3 mt-4' style={{ color: '#222' }}>
              4.2 Prohibited Listings
            </h3>
            <p className='text-[15px] leading-relaxed mb-4' style={{ color: '#222' }}>
              The following are strictly prohibited:
            </p>
            <ul className='list-disc pl-6 space-y-2 text-[15px]' style={{ color: '#222' }}>
              <li>Fraudulent or misleading property descriptions</li>
              <li>Properties that do not meet basic safety and habitability standards</li>
              <li>Discriminatory listings or practices</li>
              <li>Properties used for illegal activities</li>
            </ul>
          </section>

          <section className='mt-8'>
            <h2 className='text-xl font-semibold mb-4' style={{ color: '#222' }}>
              5. Bookings and Payments
            </h2>
            <h3 className='text-lg font-semibold mb-3 mt-4' style={{ color: '#222' }}>
              5.1 Booking Process
            </h3>
            <ul className='list-disc pl-6 space-y-2 text-[15px]' style={{ color: '#222' }}>
              <li>Students can browse and book available properties through our platform</li>
              <li>All bookings are subject to owner approval unless instant booking is enabled</li>
              <li>Once confirmed, bookings constitute a binding agreement between student and owner</li>
            </ul>

            <h3 className='text-lg font-semibold mb-3 mt-4' style={{ color: '#222' }}>
              5.2 Payment Terms
            </h3>
            <ul className='list-disc pl-6 space-y-2 text-[15px]' style={{ color: '#222' }}>
              <li>All payments are processed securely through our platform</li>
              <li>Students must pay the full rental amount as specified in the listing</li>
              <li>Security deposits, if applicable, will be held according to platform policies</li>
              <li>BrainX may charge service fees for facilitating transactions</li>
            </ul>

            <h3 className='text-lg font-semibold mb-3 mt-4' style={{ color: '#222' }}>
              5.3 Cancellations and Refunds
            </h3>
            <ul className='list-disc pl-6 space-y-2 text-[15px]' style={{ color: '#222' }}>
              <li>Cancellation policies are set by property owners and displayed on each listing</li>
              <li>Refunds are processed according to the applicable cancellation policy</li>
              <li>BrainX reserves the right to cancel bookings in case of violations or disputes</li>
            </ul>
          </section>

          <section className='mt-8'>
            <h2 className='text-xl font-semibold mb-4' style={{ color: '#222' }}>
              6. User Conduct
            </h2>
            <p className='text-[15px] leading-relaxed mb-4' style={{ color: '#222' }}>
              Users must not:
            </p>
            <ul className='list-disc pl-6 space-y-2 text-[15px]' style={{ color: '#222' }}>
              <li>Use the platform for any illegal or unauthorized purpose</li>
              <li>Violate any laws or regulations in their jurisdiction</li>
              <li>Infringe upon the rights of others</li>
              <li>Transmit harmful code, viruses, or malicious software</li>
              <li>Harass, abuse, or harm other users</li>
              <li>Impersonate another person or entity</li>
              <li>Collect or store personal data about other users without permission</li>
              <li>Attempt to circumvent platform fees or payment systems</li>
            </ul>
          </section>

          <section className='mt-8'>
            <h2 className='text-xl font-semibold mb-4' style={{ color: '#222' }}>
              7. Platform Rights and Obligations
            </h2>
            <h3 className='text-lg font-semibold mb-3 mt-4' style={{ color: '#222' }}>
              7.1 Our Role
            </h3>
            <p className='text-[15px] leading-relaxed mb-4' style={{ color: '#222' }}>
              BrainX acts as an intermediary platform connecting students and property owners. We:
            </p>
            <ul className='list-disc pl-6 space-y-2 text-[15px]' style={{ color: '#222' }}>
              <li>Provide the technology and platform for listings and bookings</li>
              <li>Facilitate secure payment processing</li>
              <li>Offer customer support for platform-related issues</li>
              <li>Monitor platform activity to ensure compliance with these terms</li>
            </ul>

            <h3 className='text-lg font-semibold mb-3 mt-4' style={{ color: '#222' }}>
              7.2 Platform Modifications
            </h3>
            <p className='text-[15px] leading-relaxed mb-4' style={{ color: '#222' }}>
              We reserve the right to:
            </p>
            <ul className='list-disc pl-6 space-y-2 text-[15px]' style={{ color: '#222' }}>
              <li>Modify, suspend, or discontinue any aspect of the platform</li>
              <li>Update these Terms of Service with reasonable notice</li>
              <li>Remove listings or suspend accounts that violate our policies</li>
              <li>Implement new features or change existing ones</li>
            </ul>
          </section>

          <section className='mt-8'>
            <h2 className='text-xl font-semibold mb-4' style={{ color: '#222' }}>
              8. Dispute Resolution
            </h2>
            <p className='text-[15px] leading-relaxed mb-4' style={{ color: '#222' }}>
              In the event of disputes between students and owners:
            </p>
            <ul className='list-disc pl-6 space-y-2 text-[15px]' style={{ color: '#222' }}>
              <li>Parties are encouraged to resolve disputes directly and amicably</li>
              <li>BrainX may provide mediation assistance upon request</li>
              <li>BrainX is not responsible for disputes arising from rental agreements</li>
              <li>Legal disputes must be resolved according to applicable local laws</li>
            </ul>
          </section>

          <section className='mt-8'>
            <h2 className='text-xl font-semibold mb-4' style={{ color: '#222' }}>
              9. Limitation of Liability
            </h2>
            <p className='text-[15px] leading-relaxed mb-4' style={{ color: '#222' }}>
              To the maximum extent permitted by law:
            </p>
            <ul className='list-disc pl-6 space-y-2 text-[15px]' style={{ color: '#222' }}>
              <li>BrainX is not liable for the quality, safety, or legality of properties listed</li>
              <li>We do not guarantee the accuracy of user-provided information</li>
              <li>We are not responsible for user conduct or interactions off the platform</li>
              <li>We are not liable for property damage, personal injury, or financial losses arising from rentals</li>
              <li>Our total liability shall not exceed the fees paid by you in the past 12 months</li>
            </ul>
          </section>

          <section className='mt-8'>
            <h2 className='text-xl font-semibold mb-4' style={{ color: '#222' }}>
              10. Intellectual Property
            </h2>
            <p className='text-[15px] leading-relaxed mb-4' style={{ color: '#222' }}>
              All content on the BrainX platform, including but not limited to text, graphics, logos, and software,
              is the property of BrainX or its licensors and is protected by intellectual property laws.
              Users may not reproduce, distribute, or create derivative works without express permission.
            </p>
          </section>

          <section className='mt-8'>
            <h2 className='text-xl font-semibold mb-4' style={{ color: '#222' }}>
              11. Data Protection
            </h2>
            <p className='text-[15px] leading-relaxed mb-4' style={{ color: '#222' }}>
              Your use of the platform is also governed by our Privacy Policy, which explains how we collect,
              use, and protect your personal information. By using BrainX, you consent to our data practices
              as described in the Privacy Policy.
            </p>
          </section>

          <section className='mt-8'>
            <h2 className='text-xl font-semibold mb-4' style={{ color: '#222' }}>
              12. Termination
            </h2>
            <p className='text-[15px] leading-relaxed mb-4' style={{ color: '#222' }}>
              We reserve the right to terminate or suspend your account:
            </p>
            <ul className='list-disc pl-6 space-y-2 text-[15px]' style={{ color: '#222' }}>
              <li>For violations of these Terms of Service</li>
              <li>For fraudulent or illegal activity</li>
              <li>Upon your request</li>
              <li>If you are no longer a Brainware University student (for student accounts)</li>
            </ul>
            <p className='text-[15px] leading-relaxed mt-4' style={{ color: '#222' }}>
              Upon termination, your right to use the platform ceases immediately.
            </p>
          </section>

          <section className='mt-8'>
            <h2 className='text-xl font-semibold mb-4' style={{ color: '#222' }}>
              13. Governing Law
            </h2>
            <p className='text-[15px] leading-relaxed mb-4' style={{ color: '#222' }}>
              These Terms of Service are governed by and construed in accordance with the laws of Indonesia.
              Any legal disputes shall be subject to the exclusive jurisdiction of the courts in the region
              where Brainware University is located.
            </p>
          </section>

          <section className='mt-8'>
            <h2 className='text-xl font-semibold mb-4' style={{ color: '#222' }}>
              14. Contact Information
            </h2>
            <p className='text-[15px] leading-relaxed mb-4' style={{ color: '#222' }}>
              For questions or concerns regarding these Terms of Service, please contact us at:
            </p>
            <div className='pl-6 text-[15px] space-y-1' style={{ color: '#222' }}>
              <p>Email: support@brainx.com</p>
              <p>Address: Brainware University Campus</p>
            </div>
          </section>

          <section className='mt-8'>
            <h2 className='text-xl font-semibold mb-4' style={{ color: '#222' }}>
              15. Acknowledgment
            </h2>
            <p className='text-[15px] leading-relaxed mb-4' style={{ color: '#222' }}>
              By using BrainX, you acknowledge that you have read, understood, and agree to be bound by these
              Terms of Service. If you do not agree to these terms, please do not use our platform.
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}
