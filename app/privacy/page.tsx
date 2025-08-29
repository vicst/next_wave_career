export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <h1 className="text-4xl font-bold text-foreground mb-8">Privacy Policy</h1>

        <div className="prose prose-lg max-w-none text-foreground">
          <p className="text-muted-foreground mb-6">
            <strong>Effective Date:</strong> {new Date().toLocaleDateString()}
          </p>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">1. Introduction</h2>
            <p>
              Career Compass ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy
              explains how we collect, use, disclose, and safeguard your information when you use our career assessment
              application and related services.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">2. Information We Collect</h2>
            <h3 className="text-xl font-medium mb-3">2.1 Personal Information</h3>
            <ul className="list-disc pl-6 mb-4">
              <li>Email address (when you create an account)</li>
              <li>Name and profile picture (from OAuth providers like Google or Facebook)</li>
              <li>Authentication information from third-party providers</li>
            </ul>

            <h3 className="text-xl font-medium mb-3">2.2 Assessment Data</h3>
            <ul className="list-disc pl-6 mb-4">
              <li>RIASEC personality test responses</li>
              <li>Career assessment results and recommendations</li>
              <li>Test completion dates and progress</li>
            </ul>

            <h3 className="text-xl font-medium mb-3">2.3 Technical Information</h3>
            <ul className="list-disc pl-6 mb-4">
              <li>Device information and browser type</li>
              <li>IP address and location data</li>
              <li>Usage patterns and application interactions</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">3. How We Use Your Information</h2>
            <ul className="list-disc pl-6">
              <li>Provide and maintain our career assessment services</li>
              <li>Generate personalized career recommendations</li>
              <li>Authenticate your account and ensure security</li>
              <li>Improve our application and user experience</li>
              <li>Communicate with you about your account and our services</li>
              <li>Comply with legal obligations</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">4. Data Storage and Security</h2>
            <p className="mb-4">
              We use Supabase, a secure cloud database service, to store your information. Your data is encrypted in
              transit and at rest. We implement appropriate technical and organizational measures to protect your
              personal information against unauthorized access, alteration, disclosure, or destruction.
            </p>
            <p>
              However, no method of transmission over the internet or electronic storage is 100% secure. While we strive
              to protect your personal information, we cannot guarantee its absolute security.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">5. Third-Party Services</h2>
            <h3 className="text-xl font-medium mb-3">5.1 OAuth Providers</h3>
            <p className="mb-4">
              We use third-party OAuth providers (Google, Facebook) for authentication. When you sign in using these
              services, they may collect and share certain information with us according to their own privacy policies.
            </p>

            <h3 className="text-xl font-medium mb-3">5.2 Supabase</h3>
            <p>
              Our application uses Supabase for data storage and authentication services. Supabase's privacy policy
              governs their handling of your data on our behalf.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">6. Your Rights</h2>
            <p className="mb-4">Depending on your location, you may have the following rights:</p>
            <ul className="list-disc pl-6">
              <li>
                <strong>Access:</strong> Request access to your personal information
              </li>
              <li>
                <strong>Correction:</strong> Request correction of inaccurate information
              </li>
              <li>
                <strong>Deletion:</strong> Request deletion of your personal information
              </li>
              <li>
                <strong>Portability:</strong> Request a copy of your data in a portable format
              </li>
              <li>
                <strong>Objection:</strong> Object to certain processing of your information
              </li>
              <li>
                <strong>Withdrawal:</strong> Withdraw consent where processing is based on consent
              </li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">7. Data Retention</h2>
            <p>
              We retain your personal information for as long as necessary to provide our services and fulfill the
              purposes outlined in this Privacy Policy. You may delete your account at any time, which will remove your
              personal information from our active databases.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">8. International Data Transfers</h2>
            <p>
              Your information may be transferred to and processed in countries other than your own. We ensure
              appropriate safeguards are in place to protect your information in accordance with applicable data
              protection laws.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">9. Children's Privacy</h2>
            <p>
              Our service is not intended for children under 13 years of age. We do not knowingly collect personal
              information from children under 13. If you are a parent or guardian and believe your child has provided us
              with personal information, please contact us.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">10. Changes to This Privacy Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new
              Privacy Policy on this page and updating the "Effective Date" at the top of this policy.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">11. Contact Us</h2>
            <p className="mb-4">
              If you have any questions about this Privacy Policy or our privacy practices, please contact us at:
            </p>
            <div className="bg-muted p-4 rounded-lg">
              <p>
                <strong>Career Compass</strong>
              </p>
              <p>Email: privacy@careercompass.app</p>
              <p>Website: https://v0-next-wave-careers.vercel.app</p>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">12. GDPR Compliance</h2>
            <p>
              For users in the European Union, we comply with the General Data Protection Regulation (GDPR). You have
              additional rights under GDPR, including the right to lodge a complaint with a supervisory authority if you
              believe your data protection rights have been violated.
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}
