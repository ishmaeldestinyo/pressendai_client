import React from 'react';
import { Link } from 'react-router-dom';

function Legals() {
  return (
    <div className="max-w-screen-xl mx-auto p-5 bg-[#131313]">
      {/* Header Section */}
      <div className="flex items-center mb-8">
        <Link to="/" className="flex items-center">
          <img src="/icon.png" alt="Pressend Logo" className="w-12 h-12 mr-3" />
          <h1 className="text-3xl text-white font-semibold">Pressend AI</h1>
        </Link>
      </div>

      {/* Legal Section */}
      <div className="space-y-16">
        {/* Terms and Conditions */}
        <section className="bg-[#131313] p-8 rounded-lg shadow-md border border-gray-700">
          <h2 className="text-2xl font-semibold text-white mb-4">Terms and Conditions</h2>
          <p className="text-sm text-gray-400 mb-4">Last updated: <strong>12th March, 2025</strong></p>
          
          <h3 className="text-lg text-white font-semibold mt-6 mb-2">1. Acceptance of Terms</h3>
          <p className="text-gray-300 mb-4">
            By accessing or using the Service, you agree to comply with these Terms. If you do not agree, please do not use the Service.
          </p>

          <h3 className="text-lg text-white font-semibold mt-6 mb-2">2. Eligibility</h3>
          <p className="text-gray-300 mb-4">
            You must be at least 13 years old to use the Service. By using the Service, you represent that you are at least 13 years old and have the legal capacity to enter into a binding contract.
          </p>

          <h3 className="text-lg text-white font-semibold mt-6 mb-2">3. Account Registration and Security</h3>
          <p className="text-gray-300 mb-4">
            You are responsible for keeping your account information secure and confidential, and for all activity under your account.
          </p>

          <h3 className="text-lg text-white font-semibold mt-6 mb-2">4. Limitation of Liability</h3>
          <p className="text-gray-300 mb-4">
            Pressend shall not be liable for any indirect, incidental, special, or consequential damages arising out of your use or inability to use the Service.
          </p>

          <h3 className="text-lg text-white font-semibold mt-6 mb-2">5. Changes to Terms</h3>
          <p className="text-gray-300">
            We reserve the right to modify these Terms at any time. Any changes will be posted on this page. Your continued use of the Service after any changes are posted constitutes your acceptance of those changes.
          </p>
        </section>

        {/* Privacy Policy */}
        <section className="bg-[#131313] p-8 rounded-lg shadow-md border border-gray-700">
          <h2 className="text-2xl font-semibold text-white mb-4">Privacy Policy</h2>
          <p className="text-sm text-gray-400 mb-4">Last updated: <strong>12th March, 2025</strong></p>

          <h3 className="text-lg text-white font-semibold mt-6 mb-2">1. Information We Collect</h3>
          <p className="text-gray-300 mb-4">
            We collect personal information such as your name, email, and other data to provide our services and improve the user experience.
          </p>

          <h3 className="text-lg text-white font-semibold mt-6 mb-2">2. How We Use Your Information</h3>
          <p className="text-gray-300 mb-4">
            We use the information to provide and maintain our Service, process payments, personalize your experience, and communicate with you.
          </p>

          <h3 className="text-lg text-white font-semibold mt-6 mb-2">3. How We Share Your Information</h3>
          <p className="text-gray-300 mb-4">
            We do not sell or rent your personal information. However, we may share it with trusted third-party vendors and as required by law.
          </p>

          <h3 className="text-lg text-white font-semibold mt-6 mb-2">4. Cookies and Tracking Technologies</h3>
          <p className="text-gray-300 mb-4">
            We use cookies to enhance your experience. You can control cookies through your browser settings.
          </p>

          <h3 className="text-lg text-white font-semibold mt-6 mb-2">5. Your Rights and Choices</h3>
          <p className="text-gray-300 mb-4">
            You can access, update, and request the deletion of your personal information by contacting us directly.
          </p>
        </section>

        {/* Disclaimer */}
        <section className="bg-[#131313] p-8 rounded-lg shadow-md border border-gray-700">
          <h2 className="text-2xl font-semibold text-white mb-4">Disclaimer</h2>
          <p className="text-sm text-gray-400 mb-4">Last updated: <strong>12th March, 2025</strong></p>

          <h3 className="text-lg text-white font-semibold mt-6 mb-2">1. Use at Your Own Risk</h3>
          <p className="text-gray-300 mb-4">
            The information and services provided on Pressend AI are for informational purposes only. We do not guarantee that our services will meet your specific needs or expectations.
          </p>

          <h3 className="text-lg text-white font-semibold mt-6 mb-2">2. No Professional Advice</h3>
          <p className="text-gray-300 mb-4">
            The content provided does not constitute professional advice. For professional advice, consult with a qualified expert.
          </p>

          <h3 className="text-lg text-white font-semibold mt-6 mb-2">3. AI-generated Content</h3>
          <p className="text-gray-300 mb-4">
            While Pressend AI provides AI tools, the generated content may contain errors and may require manual review and adjustments.
          </p>

          <h3 className="text-lg text-white font-semibold mt-6 mb-2">4. Limitation of Liability</h3>
          <p className="text-gray-300 mb-4">
            Pressend AI is not liable for any direct, indirect, or consequential damages arising from your use of our platform or services.
          </p>

          <h3 className="text-lg text-white font-semibold mt-6 mb-2">5. Third-Party Links and Content</h3>
          <p className="text-gray-300 mb-4">
            We may link to third-party websites. We do not endorse or assume responsibility for their content or privacy practices.
          </p>

          <h3 className="text-lg text-white font-semibold mt-6 mb-2">6. Changes to the Disclaimer</h3>
          <p className="text-gray-300">
            We may modify this Disclaimer at any time. Any changes will be posted with an updated effective date.
          </p>
        </section>
      </div>
    </div>
  );
}

export default Legals;
