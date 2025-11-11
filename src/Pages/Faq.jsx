import React, { useState } from "react";
import PrivateRoute from "../Routes/PrivateRoute";

const faqs = [
  {
    question: "What is the purpose of this system?",
    answer:
      "The main goal of the University Issue Management System is to help students easily report university-related problems and allow the admin to manage and solve them efficiently.",
  },
  {
    question: "How can I submit an issue?",
    answer:
      "After logging in, go to the 'Submit Issue' form, enter the title, description, location, and upload an optional photo. Once submitted, the issue will be marked as 'Pending'.",
  },
  {
    question: "Can I edit or delete my submitted issue?",
    answer:
      "Yes, you can edit or delete your issue as long as it is in 'Pending' status. Once marked as 'Solved', you won’t be able to modify or delete it.",
  },
  {
    question: "Who can access the Admin Panel?",
    answer:
      "Only authorized admins can log in to the Admin Panel using Firebase Authentication. Students or general users cannot access it.",
  },
  {
    question: "How do admins manage the issues?",
    answer:
      "From the Admin Panel, admins can view all submitted issues, update their status, and filter issues by category or status such as 'Pending' or 'Solved'.",
  },
  {
    question: "What information is shown in the Dashboard?",
    answer:
      "The Dashboard shows total issues, pending issues, and solved issues with clear statistics for both students and admins.",
  },
];

const Faq = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFaq = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <PrivateRoute>
      <section className="min-h-screen py-16 px-6 md:px-20">
        {/* Header */}
        <div className="max-w-4xl mx-auto text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-red-700 mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-white text-base md:text-lg">
            Here are some common questions about the University Issue Management System.
          </p>
        </div>

        {/* FAQ Items */}
        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-md transition-all duration-200"
            >
              <button
                onClick={() => toggleFaq(index)}
                className="w-full flex justify-between items-center text-left px-5 py-4"
              >
                <h3 className="text-gray-800 font-semibold text-lg">
                  {faq.question}
                </h3>
                <span
                  className={`text-red-600 text-xl transform transition-transform duration-300 ${openIndex === index ? "rotate-180" : ""
                    }`}
                >
                  ▼
                </span>
              </button>

              {openIndex === index && (
                <div className="px-5 pb-4 text-gray-600 text-[15px] leading-relaxed border-t border-gray-100">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Footer */}
        {/* <footer className="text-center mt-16 text-gray-500 text-sm">
        © {new Date().getFullYear()} University Issue Management System. All rights reserved.
      </footer> */}

      </section>
    </PrivateRoute>

  );
};

export default Faq;