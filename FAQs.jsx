import React, { useState } from "react";
import { FaPlus, FaMinus } from "react-icons/fa";

const faqsData = [
  {
    question: "How can Thalassemia Patients find Blood donors?",
    answer: "Register your blood transfusion schedule, and our system will connect you with compatible donors.",
  },
  {
    question: "What should a Thalassemia patient do in case of emergency?",
    answer: "In an emergency, the patient should fill out the emergency blood request form on Hope4Life.The admin will review the request and assign suitable donors based on availability.",
  },
  {
    question: "Who can donate blood for Thalassemia patients?",
    answer: "Healthy individuals aged 18-60 with matching blood types can donate. It is crucial to ensure that the donor is infection-free and meets health criteria.",
  },
  {
    question: "Does donating blood for Thalassemia patients have any side effects?",
    answer: "No, blood donation is safe. The body replenishes lost blood within weeks. Donors should stay hydrated and rest after donating.",
  },
  {
    question: "How can I register as a donor for Thalassemia patients?",
    answer: "You can register on our Hope4Life website, providing your blood type and availability. Our team will contact you when a match is found.",
  },
  {
    question: "What precautions should be taken before and after donating blood?",
    answer: "Before donation, drink plenty of water and eat a healthy meal. After donation, avoid heavy exercise and drink fluids to stay hydrated.",
  },
];

const FAQs = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Page Header */}
      <h1 className="text-4xl font-bold text-center text-[#840000] mb-8">Hope4Life - FAQs</h1>
      <p className="text-2xl font-semibold text-center text-gray-600 mb-10">Frequently Asked Questions about Blood Donation for Thalassemia Patients</p>

      {/* FAQ Section */}
      <div className="max-w-3xl mx-auto space-y-6">
        {faqsData.map((faq, index) => (
          <div key={index} className="bg-white shadow-lg rounded-lg p-5 transition duration-300">
            <button 
              className="flex justify-between w-full text-lg font-semibold text-gray-700" 
              onClick={() => toggleFAQ(index)}
            >
              {faq.question}
              {openIndex === index ? <FaMinus className="text-[#840000]" /> : <FaPlus className="text-[#840000]" />}
            </button>
            {openIndex === index && (
              <p className="mt-3 text-gray-600">{faq.answer}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQs;