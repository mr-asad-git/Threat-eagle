import React, { useState } from 'react';
import Header from '../../components/Header';
import './ContactPageStyling.css';
import Footer from '../../components/Footer';
import emailjs from '@emailjs/browser';

export default function ContactPage() {
  const [showPopup, setShowPopup] = useState(false);

const handleSubmit = (e) => {
  e.preventDefault();

  emailjs
    .sendForm(
      'service_3jyc3i3',
      'template_mu5rxkr',
      e.target,
      'qY3x1VmXKwl3-8qbS'
    )
    .then(() => {
      setShowPopup(true);
      setTimeout(() => setShowPopup(false), 3000);
    })
    .catch((error) => {
      console.error('EmailJS error:', error);
      alert(`❌ Failed to send message: ${error?.text || error?.message || 'Unknown error'}`);
    });
};

  return (
    <div className="bg-[#0a0a0a] min-h-screen text-yellow-300 pt-24 px-8 pb-20">
      <Header />

      {/* Title */}
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold mb-2">📞 Contact Threat Eagle</h2>
        <p className="text-yellow-400 max-w-xl mx-auto">
          Reach out for collaborations, feedback, or support. We’re always listening.
        </p>
      </div>

      {/* Contact Details */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-20">
        {[
          { icon: '📧', label: 'Email', value: 'support@threateagle.io' },
          { icon: '📍', label: 'Location', value: 'Lahore, Pakistan' },
          { icon: '🌐', label: 'Website', value: 'www.threateagle.io' },
        ].map((item, index) => (
          <div
            key={index}
            className="bg-gray-900 border-2 border-yellow-500 rounded-xl p-6 text-center shadow-lg hover:scale-105 transition-transform duration-300 ease-in-out"
          >
            <div className="text-4xl mb-2">{item.icon}</div>
            <div className="text-xl font-bold mb-1">{item.label}</div>
            <div className="text-yellow-200">{item.value}</div>
          </div>
        ))}
      </div>

      {/* Contact Form Section */}
      <div className="mt-16 px-6 py-12 bg-[#0a0a0a] text-yellow-300">
        <h2 className="text-4xl font-bold text-center mb-10">Reach Out to Us</h2>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-5xl mx-auto">
            {/* Left: Input Form */}
            <div className="flex flex-col space-y-6">
              <input
                type="text"
                placeholder="Your Name"
                className="bg-[#1a1a1a] text-yellow-200 placeholder-yellow-500 px-6 py-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-500 transition-all"
              />
              <input
                type="text"
                placeholder="Subject"
                className="bg-[#1a1a1a] text-yellow-200 placeholder-yellow-500 px-6 py-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-500 transition-all"
              />
              <textarea
                rows={5}
                placeholder="Your Message"
                className="bg-[#1a1a1a] text-yellow-200 placeholder-yellow-500 px-6 py-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-500 transition-all"
              />
              <input
                type="email"
                value="threat@eagle.com"
                readOnly
                className="bg-[#0f0f0f] text-yellow-400 px-6 py-4 rounded-xl border border-yellow-500 cursor-not-allowed"
              />
              <button
                type="submit"
                className="bg-yellow-500 text-black px-6 py-3 rounded-xl hover:bg-yellow-400 transition-colors font-semibold"
              >
                Send Message
              </button>
            </div>

            {/* Right: Instructions */}
            <div className="bg-[#1a1a1a] rounded-xl p-6 shadow-[0_0_20px_#facc15]">
              <h3 className="text-2xl font-bold mb-4">Feedback Guidelines</h3>
              <p className="text-yellow-200 mb-4">
                We value your input. Whether it's a bug report, feature request, or general feedback — please be clear and concise.
              </p>
              <ul className="list-disc list-inside space-y-2 text-yellow-100 text-sm">
                <li>Include relevant details (e.g. page, action, error)</li>
                <li>Use the subject line to summarize your message</li>
                <li>We respond within 24–48 hours</li>
                <li>Your email is pre-filled for direct routing</li>
              </ul>
            </div>
          </div>
        </form>

        {/* Popup Confirmation */}
        {showPopup && (
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="bg-[#0f0f0f] border border-green-500 rounded-xl px-8 py-6 text-green-300 shadow-[0_0_30px_#22c55e] text-center relative w-[300px]">
              <div className="text-4xl mb-2">✅</div>
              <p className="font-semibold">Your message has been sent successfully!</p>
              <div className="absolute bottom-0 left-0 h-[4px] bg-green-500 animate-progress-line w-full"></div>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}