import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, ArrowRight, Zap, Target, TrendingUp } from 'lucide-react';

const JourneyTimeline: React.FC = () => {
  const steps = [
    {
      id: 1,
      title: "Connect Your Accounts",
      description: "Seamlessly link all your business accounts and financial sources in under 60 seconds.",
      icon: CheckCircle,
      color: "#4169E1"
    },
    {
      id: 2,
      title: "AI Analysis",
      description: "Our advanced AI analyzes your spending patterns and identifies optimization opportunities.",
      icon: Zap,
      color: "#FF007A"
    },
    {
      id: 3,
      title: "Smart Categorization",
      description: "Automatically categorize expenses across multiple businesses with 99.7% accuracy.",
      icon: Target,
      color: "#4169E1"
    },
    {
      id: 4,
      title: "Maximize Savings",
      description: "Unlock hidden savings and optimize your financial strategy with predictive insights.",
      icon: TrendingUp,
      color: "#FF007A"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  };

  return (
    <section className="unified-section bg-gray-900/50">
      <div className="unified-container">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 unified-gradient-text">
            Your Journey to Financial Mastery
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Transform your financial chaos into clarity with our proven 4-step process
          </p>
        </motion.div>

        <motion.div
          className="relative"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {/* Timeline Line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-blue-600 to-pink-600 rounded-full hidden md:block" />

          <div className="space-y-12">
            {steps.map((step, index) => (
              <motion.div
                key={step.id}
                className={`flex items-center ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                } flex-col md:space-x-8`}
                variants={itemVariants}
              >
                {/* Content */}
                <div className="flex-1 max-w-lg">
                  <motion.div
                    className="unified-card p-8 group hover:scale-105 transition-all duration-300"
                    whileHover={{ y: -5 }}
                  >
                    <div className="flex items-center mb-4">
                      <div
                        className="w-12 h-12 rounded-full flex items-center justify-center mr-4"
                        style={{ backgroundColor: step.color }}
                      >
                        <step.icon className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="text-2xl font-bold text-white">{step.title}</h3>
                    </div>
                    <p className="text-gray-300 leading-relaxed">{step.description}</p>
                  </motion.div>
                </div>

                {/* Timeline Node */}
                <div className="relative z-10 hidden md:block">
                  <motion.div
                    className="w-16 h-16 rounded-full border-4 border-white flex items-center justify-center font-bold text-xl shadow-2xl unified-pulse"
                    style={{
                      backgroundColor: step.color,
                      color: '#FFFFFF'
                    }}
                    whileHover={{ scale: 1.1 }}
                  >
                    {step.id}
                  </motion.div>
                </div>

                {/* Spacer for opposite side */}
                <div className="flex-1 max-w-lg hidden md:block" />
              </motion.div>
            ))}
          </div>

          {/* Call to Action */}
          <motion.div
            className="text-center mt-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
          >
            <motion.button
              className="unified-button-primary flex items-center space-x-2 mx-auto"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span>Start Your Journey</span>
              <ArrowRight className="w-5 h-5" />
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default JourneyTimeline;