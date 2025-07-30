import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus, Shield, Mic, Building, Smartphone } from 'lucide-react';

const faqs = [
  {
    question: 'How secure is my financial data?',
    answer: 'ExpenseIQ uses military-grade AES-256 encryption and complies with SOC 2 Type II standards. Your data is protected with the same security used by major banks.',
    icon: Shield
  },
  {
    question: 'How accurate is the voice recognition?',
    answer: 'Our AI achieves 98%+ accuracy in voice recognition, trained on millions of business expense commands. It continuously learns from your patterns for even better performance.',
    icon: Mic
  },
  {
    question: 'Can I manage multiple businesses?',
    answer: 'Absolutely! ExpenseIQ supports unlimited businesses and entities, each with separate dashboards, categories, and reporting while maintaining unified oversight.',
    icon: Building
  },
  {
    question: 'Which platforms integrate with ExpenseIQ?',
    answer: 'We integrate with 200+ platforms including QuickBooks, Xero, Stripe, Square, all major banks, and popular business tools. New integrations added monthly.',
    icon: Smartphone
  }
];

const FAQSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-20 relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-6xl font-black mb-6 bg-gradient-to-r from-neon-blue to-neon-magenta bg-clip-text text-transparent">
            Everything You Need to Know
          </h2>
          <p className="text-xl text-cyber-silver">
            Get answers to the most common questions about ExpenseIQ
          </p>
        </motion.div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              className="bg-card-bg backdrop-blur-sm rounded-2xl border border-white/10 overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full p-6 text-left flex items-center justify-between hover:bg-white/5 transition-colors duration-300"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-neon-blue to-neon-magenta p-3">
                    <faq.icon className="w-full h-full text-white" />
                  </div>
                  <h3 className="text-lg md:text-xl font-semibold text-white">
                    {faq.question}
                  </h3>
                </div>
                <motion.div
                  animate={{ rotate: openIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {openIndex === index ? (
                    <Minus className="w-6 h-6 text-neon-blue" />
                  ) : (
                    <Plus className="w-6 h-6 text-neon-blue" />
                  )}
                </motion.div>
              </button>

              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="px-6 pb-6 pl-22">
                      <p className="text-cyber-silver leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;