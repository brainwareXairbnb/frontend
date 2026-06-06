'use client'

import { useRouter } from 'next/navigation'
import { ChevronLeft } from 'lucide-react'

export default function PrivacyPolicyPage() {
  const router = useRouter()

  return (
    <div className='min-h-screen' style={{ background: '#fff' }}>
      {/* Header */}
      <div className='sticky top-0 z-10' style={{ background: '#fff', borderBottom: '1px solid #e5e5e5' }}>
        <div className='max-w-3xl mx-auto px-5 py-4 flex items-center gap-3'>
          <button
            onClick={() => router.back()}
            className='p-2 -ml-2 rounded-full hover:bg-gray-100 active:bg-gray-200 transition-colors'
          >
            <ChevronLeft className='w-5 h-5' style={{ color: '#222' }} />
          </button>
          <h1 className='text-lg font-semibold' style={{ color: '#222' }}>
            Privacy Policy
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
              Welcome to BrainX's Privacy Policy. We are committed to protecting the privacy and security of our users' personal information.
              This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our property rental
              platform designed exclusively for Brainware University students.
            </p>
            <p className='text-[15px] leading-relaxed mb-4' style={{ color: '#222' }}>
              By using BrainX, you consent to the data practices described in this policy. If you do not agree with this policy,
              please do not use our platform.
            </p>
          </section>

          <section className='mt-8'>
            <h2 className='text-xl font-semibold mb-4' style={{ color: '#222' }}>
              2. Information We Collect
            </h2>

            <h3 className='text-lg font-semibold mb-3 mt-4' style={{ color: '#222' }}>
              2.1 Personal Information
            </h3>
            <p className='text-[15px] leading-relaxed mb-4' style={{ color: '#222' }}>
              We collect personal information that you provide directly to us, including:
            </p>
            <ul className='list-disc pl-6 space-y-2 text-[15px]' style={{ color: '#222' }}>
              <li><strong>Account Information:</strong> Name, email address, phone number, profile picture</li>
              <li><strong>Student Verification:</strong> Brainware University student ID, enrollment status</li>
              <li><strong>Owner Verification:</strong> Property ownership documents, identification documents</li>
              <li><strong>Payment Information:</strong> Bank account details, payment method information (processed securely through third-party payment processors)</li>
              <li><strong>Profile Details:</strong> Bio, preferences, emergency contact information</li>
            </ul>

            <h3 className='text-lg font-semibold mb-3 mt-4' style={{ color: '#222' }}>
              2.2 Property Information
            </h3>
            <p className='text-[15px] leading-relaxed mb-4' style={{ color: '#222' }}>
              For property owners, we collect:
            </p>
            <ul className='list-disc pl-6 space-y-2 text-[15px]' style={{ color: '#222' }}>
              <li>Property address and location details</li>
              <li>Property photographs and descriptions</li>
              <li>Amenities and features</li>
              <li>Pricing and availability information</li>
              <li>Property rules and policies</li>
            </ul>

            <h3 className='text-lg font-semibold mb-3 mt-4' style={{ color: '#222' }}>
              2.3 Usage Information
            </h3>
            <p className='text-[15px] leading-relaxed mb-4' style={{ color: '#222' }}>
              We automatically collect information about your use of the platform:
            </p>
            <ul className='list-disc pl-6 space-y-2 text-[15px]' style={{ color: '#222' }}>
              <li>Device information (device type, operating system, browser type)</li>
              <li>IP address and approximate location</li>
              <li>Pages viewed, links clicked, and search queries</li>
              <li>Time and date of visits</li>
              <li>Referring website or application</li>
            </ul>

            <h3 className='text-lg font-semibold mb-3 mt-4' style={{ color: '#222' }}>
              2.4 Communication Data
            </h3>
            <ul className='list-disc pl-6 space-y-2 text-[15px]' style={{ color: '#222' }}>
              <li>Messages between students and property owners</li>
              <li>Customer support communications</li>
              <li>Feedback and reviews</li>
            </ul>

            <h3 className='text-lg font-semibold mb-3 mt-4' style={{ color: '#222' }}>
              2.5 Cookies and Tracking Technologies
            </h3>
            <p className='text-[15px] leading-relaxed mb-4' style={{ color: '#222' }}>
              We use cookies, web beacons, and similar technologies to enhance user experience, analyze trends, and gather information.
              You can control cookie settings through your browser preferences.
            </p>
          </section>

          <section className='mt-8'>
            <h2 className='text-xl font-semibold mb-4' style={{ color: '#222' }}>
              3. How We Use Your Information
            </h2>
            <p className='text-[15px] leading-relaxed mb-4' style={{ color: '#222' }}>
              We use the collected information for the following purposes:
            </p>

            <h3 className='text-lg font-semibold mb-3 mt-4' style={{ color: '#222' }}>
              3.1 Platform Operations
            </h3>
            <ul className='list-disc pl-6 space-y-2 text-[15px]' style={{ color: '#222' }}>
              <li>Creating and managing user accounts</li>
              <li>Verifying student and owner identities</li>
              <li>Processing bookings and payments</li>
              <li>Facilitating communication between users</li>
              <li>Providing customer support</li>
            </ul>

            <h3 className='text-lg font-semibold mb-3 mt-4' style={{ color: '#222' }}>
              3.2 Service Improvement
            </h3>
            <ul className='list-disc pl-6 space-y-2 text-[15px]' style={{ color: '#222' }}>
              <li>Analyzing platform usage and user behavior</li>
              <li>Developing new features and functionality</li>
              <li>Personalizing user experience</li>
              <li>Conducting research and analytics</li>
            </ul>

            <h3 className='text-lg font-semibold mb-3 mt-4' style={{ color: '#222' }}>
              3.3 Communication
            </h3>
            <ul className='list-disc pl-6 space-y-2 text-[15px]' style={{ color: '#222' }}>
              <li>Sending booking confirmations and updates</li>
              <li>Providing important platform announcements</li>
              <li>Responding to inquiries and support requests</li>
              <li>Sending promotional materials (with your consent)</li>
            </ul>

            <h3 className='text-lg font-semibold mb-3 mt-4' style={{ color: '#222' }}>
              3.4 Security and Compliance
            </h3>
            <ul className='list-disc pl-6 space-y-2 text-[15px]' style={{ color: '#222' }}>
              <li>Detecting and preventing fraud or abuse</li>
              <li>Ensuring platform security</li>
              <li>Complying with legal obligations</li>
              <li>Enforcing our Terms of Service</li>
            </ul>
          </section>

          <section className='mt-8'>
            <h2 className='text-xl font-semibold mb-4' style={{ color: '#222' }}>
              4. How We Share Your Information
            </h2>
            <p className='text-[15px] leading-relaxed mb-4' style={{ color: '#222' }}>
              We do not sell your personal information. We may share your information in the following circumstances:
            </p>

            <h3 className='text-lg font-semibold mb-3 mt-4' style={{ color: '#222' }}>
              4.1 Between Users
            </h3>
            <ul className='list-disc pl-6 space-y-2 text-[15px]' style={{ color: '#222' }}>
              <li>When you book a property, your name and contact information are shared with the property owner</li>
              <li>Property owners' contact information is shared with confirmed guests</li>
              <li>Public profile information is visible to other users</li>
            </ul>

            <h3 className='text-lg font-semibold mb-3 mt-4' style={{ color: '#222' }}>
              4.2 Service Providers
            </h3>
            <p className='text-[15px] leading-relaxed mb-4' style={{ color: '#222' }}>
              We share information with third-party service providers who perform services on our behalf:
            </p>
            <ul className='list-disc pl-6 space-y-2 text-[15px]' style={{ color: '#222' }}>
              <li>Payment processors for secure transactions</li>
              <li>Cloud hosting providers for data storage</li>
              <li>Analytics providers for platform improvement</li>
              <li>Customer support tools</li>
              <li>Email and communication services</li>
            </ul>

            <h3 className='text-lg font-semibold mb-3 mt-4' style={{ color: '#222' }}>
              4.3 University Partnership
            </h3>
            <p className='text-[15px] leading-relaxed mb-4' style={{ color: '#222' }}>
              We may share aggregated, anonymized data with Brainware University for research and student welfare purposes.
              No personally identifiable information is shared without your explicit consent.
            </p>

            <h3 className='text-lg font-semibold mb-3 mt-4' style={{ color: '#222' }}>
              4.4 Legal Requirements
            </h3>
            <p className='text-[15px] leading-relaxed mb-4' style={{ color: '#222' }}>
              We may disclose your information when required by law or to:
            </p>
            <ul className='list-disc pl-6 space-y-2 text-[15px]' style={{ color: '#222' }}>
              <li>Comply with legal obligations or court orders</li>
              <li>Protect our rights, property, or safety</li>
              <li>Prevent fraud or illegal activity</li>
              <li>Respond to government requests</li>
            </ul>

            <h3 className='text-lg font-semibold mb-3 mt-4' style={{ color: '#222' }}>
              4.5 Business Transfers
            </h3>
            <p className='text-[15px] leading-relaxed mb-4' style={{ color: '#222' }}>
              In the event of a merger, acquisition, or sale of assets, your information may be transferred to the acquiring entity.
              We will notify you of any such change in ownership or control.
            </p>
          </section>

          <section className='mt-8'>
            <h2 className='text-xl font-semibold mb-4' style={{ color: '#222' }}>
              5. Data Security
            </h2>
            <p className='text-[15px] leading-relaxed mb-4' style={{ color: '#222' }}>
              We implement industry-standard security measures to protect your personal information:
            </p>
            <ul className='list-disc pl-6 space-y-2 text-[15px]' style={{ color: '#222' }}>
              <li>Encryption of data in transit and at rest</li>
              <li>Secure authentication and access controls</li>
              <li>Regular security audits and vulnerability assessments</li>
              <li>Staff training on data protection practices</li>
              <li>Secure payment processing through PCI-DSS compliant providers</li>
            </ul>
            <p className='text-[15px] leading-relaxed mt-4' style={{ color: '#222' }}>
              However, no method of transmission over the internet is 100% secure. While we strive to protect your information,
              we cannot guarantee absolute security.
            </p>
          </section>

          <section className='mt-8'>
            <h2 className='text-xl font-semibold mb-4' style={{ color: '#222' }}>
              6. Data Retention
            </h2>
            <p className='text-[15px] leading-relaxed mb-4' style={{ color: '#222' }}>
              We retain your personal information for as long as necessary to:
            </p>
            <ul className='list-disc pl-6 space-y-2 text-[15px]' style={{ color: '#222' }}>
              <li>Maintain your account and provide services</li>
              <li>Comply with legal obligations</li>
              <li>Resolve disputes and enforce agreements</li>
              <li>Fulfill legitimate business purposes</li>
            </ul>
            <p className='text-[15px] leading-relaxed mt-4' style={{ color: '#222' }}>
              When you delete your account, we will delete or anonymize your personal information within 90 days, except where
              we are required to retain it for legal or regulatory purposes.
            </p>
          </section>

          <section className='mt-8'>
            <h2 className='text-xl font-semibold mb-4' style={{ color: '#222' }}>
              7. Your Rights and Choices
            </h2>
            <p className='text-[15px] leading-relaxed mb-4' style={{ color: '#222' }}>
              You have the following rights regarding your personal information:
            </p>

            <h3 className='text-lg font-semibold mb-3 mt-4' style={{ color: '#222' }}>
              7.1 Access and Portability
            </h3>
            <p className='text-[15px] leading-relaxed mb-4' style={{ color: '#222' }}>
              You can access and download your personal information from your account settings.
            </p>

            <h3 className='text-lg font-semibold mb-3 mt-4' style={{ color: '#222' }}>
              7.2 Correction
            </h3>
            <p className='text-[15px] leading-relaxed mb-4' style={{ color: '#222' }}>
              You can update or correct your personal information at any time through your account settings.
            </p>

            <h3 className='text-lg font-semibold mb-3 mt-4' style={{ color: '#222' }}>
              7.3 Deletion
            </h3>
            <p className='text-[15px] leading-relaxed mb-4' style={{ color: '#222' }}>
              You can request deletion of your account and personal information by contacting our support team.
            </p>

            <h3 className='text-lg font-semibold mb-3 mt-4' style={{ color: '#222' }}>
              7.4 Marketing Communications
            </h3>
            <p className='text-[15px] leading-relaxed mb-4' style={{ color: '#222' }}>
              You can opt out of promotional emails by clicking the unsubscribe link in any marketing email or
              adjusting your notification preferences in your account settings.
            </p>

            <h3 className='text-lg font-semibold mb-3 mt-4' style={{ color: '#222' }}>
              7.5 Cookies
            </h3>
            <p className='text-[15px] leading-relaxed mb-4' style={{ color: '#222' }}>
              You can manage cookie preferences through your browser settings. Note that disabling cookies may affect
              platform functionality.
            </p>
          </section>

          <section className='mt-8'>
            <h2 className='text-xl font-semibold mb-4' style={{ color: '#222' }}>
              8. Children's Privacy
            </h2>
            <p className='text-[15px] leading-relaxed mb-4' style={{ color: '#222' }}>
              BrainX is intended for users who are at least 18 years old. We do not knowingly collect personal information
              from children under 18. If we become aware that we have collected information from a child under 18,
              we will take steps to delete that information promptly.
            </p>
          </section>

          <section className='mt-8'>
            <h2 className='text-xl font-semibold mb-4' style={{ color: '#222' }}>
              9. International Data Transfers
            </h2>
            <p className='text-[15px] leading-relaxed mb-4' style={{ color: '#222' }}>
              Your information may be transferred to and processed in countries other than your country of residence.
              These countries may have different data protection laws. By using BrainX, you consent to the transfer
              of your information to these countries.
            </p>
          </section>

          <section className='mt-8'>
            <h2 className='text-xl font-semibold mb-4' style={{ color: '#222' }}>
              10. Third-Party Links
            </h2>
            <p className='text-[15px] leading-relaxed mb-4' style={{ color: '#222' }}>
              Our platform may contain links to third-party websites or services. We are not responsible for the
              privacy practices of these third parties. We encourage you to review their privacy policies before
              providing any personal information.
            </p>
          </section>

          <section className='mt-8'>
            <h2 className='text-xl font-semibold mb-4' style={{ color: '#222' }}>
              11. Changes to This Privacy Policy
            </h2>
            <p className='text-[15px] leading-relaxed mb-4' style={{ color: '#222' }}>
              We may update this Privacy Policy from time to time to reflect changes in our practices or legal requirements.
              We will notify you of any material changes by:
            </p>
            <ul className='list-disc pl-6 space-y-2 text-[15px]' style={{ color: '#222' }}>
              <li>Posting the updated policy on our platform</li>
              <li>Updating the "Last updated" date</li>
              <li>Sending an email notification for significant changes</li>
            </ul>
            <p className='text-[15px] leading-relaxed mt-4' style={{ color: '#222' }}>
              Your continued use of BrainX after changes are posted constitutes acceptance of the updated Privacy Policy.
            </p>
          </section>

          <section className='mt-8'>
            <h2 className='text-xl font-semibold mb-4' style={{ color: '#222' }}>
              12. Student-Specific Privacy
            </h2>
            <p className='text-[15px] leading-relaxed mb-4' style={{ color: '#222' }}>
              As a platform designed for Brainware University students:
            </p>
            <ul className='list-disc pl-6 space-y-2 text-[15px]' style={{ color: '#222' }}>
              <li>We verify student status through official university channels</li>
              <li>Student enrollment information is only used for verification purposes</li>
              <li>We respect the educational privacy rights of students</li>
              <li>Student data is handled with additional care and protection</li>
            </ul>
          </section>

          <section className='mt-8'>
            <h2 className='text-xl font-semibold mb-4' style={{ color: '#222' }}>
              13. Contact Us
            </h2>
            <p className='text-[15px] leading-relaxed mb-4' style={{ color: '#222' }}>
              If you have questions, concerns, or requests regarding this Privacy Policy or our data practices,
              please contact us at:
            </p>
            <div className='pl-6 text-[15px] space-y-1' style={{ color: '#222' }}>
              <p><strong>Email:</strong> privacy@brainx.com</p>
              <p><strong>Support Email:</strong> support@brainx.com</p>
              <p><strong>Address:</strong> Brainware University Campus</p>
            </div>
          </section>

          <section className='mt-8 mb-8'>
            <h2 className='text-xl font-semibold mb-4' style={{ color: '#222' }}>
              14. Acknowledgment
            </h2>
            <p className='text-[15px] leading-relaxed mb-4' style={{ color: '#222' }}>
              By using BrainX, you acknowledge that you have read and understood this Privacy Policy and agree to
              the collection, use, and disclosure of your information as described herein.
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}
