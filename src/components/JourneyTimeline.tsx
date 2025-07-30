import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Camera, Cpu, Layers, TrendingUp } from 'lucide-react';

const journeySteps = [
  {
    icon: Camera,
    title: 'Capture',
    subtitle: 'Snap, Speak, Sync',
    description: 'Effortlessly capture expenses through photos, voice commands, or automatic sync with your financial accounts.',
    color: 'neon-blue'
  },
  {
    icon: Cpu,
    title: 'AI Optimizes',
    subtitle: 'Intelligent Processing',
    description: 'Advanced AI categorizes, analyzes, and optimizes your financial data with predictive insights.',
    color: 'neon-magenta'
  },
  {
    icon: Layers,
    title: 'Unify',
    subtitle: 'Dashboard Merge',
    description: 'All financial data converges into a unified, intuitive dashboard with real-time analytics.',
    color: 'cyan-400'
  },
  {
    icon: TrendingUp,
    title: 'Thrive',
    subtitle: 'Growth Acceleration',
    description: 'Make data-driven decisions that accelerate growth and maximize profitability.',
    color: 'yellow-400'
  }
];

const JourneyTimeline: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  return (
    <section className="py-20 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-6xl font-black mb-6 bg-gradient-to-r from-neon-blue to-neon-magenta bg-clip-text text-transparent">
            Your Path to Financial Mastery
          </h2>
          <p className="text-xl text-cyber-silver max-w-3xl mx-auto">
            Four transformative steps that revolutionize how you manage business finances
          </p>
        </motion.div>

        <div ref={ref} className="relative">
          {/* Timeline Line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-neon-blue via-neon-magenta to-cyan-400 opacity-30" />

          <div className="space-y-20">
            {journeySteps.map((step, index) => (
              <motion.div
                key={index}
                className={`flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'} gap-8`}
                initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.8, delay: index * 0.2 }}
              >
                {/* Content */}
                <div className="flex-1 max-w-lg">
                  <motion.div
                    className="bg-card-bg backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:border-white/20 transition-all duration-300"
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="flex items-center space-x-4 mb-6">
                      <div className={`w-12 h-12 rounded-xl bg-${step.color} p-3 animate-float`}>
                        <step.icon className="w-full h-full text-dark-bg" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-white">{step.title}</h3>
                        <p className={`text-${step.color} font-semibold`}>{step.subtitle}</p>
                      </div>
                    </div>
                    <p className="text-cyber-silver leading-relaxed text-lg">
                      {step.description}
                    </p>
                  </motion.div>
                </div>

                {/* Timeline Node */}
                <motion.div
                  className="relative z-10"
                  initial={{ scale: 0 }}
                  animate={inView ? { scale: 1 } : {}}
                  transition={{ duration: 0.5, delay: index * 0.2 + 0.3 }}
                >
                  <div className={`w-16 h-16 rounded-full bg-gradient-to-r from-${step.color} to-${step.color} p-4 shadow-2xl animate-pulse-neon`}>
                    <step.icon className="w-full h-full text-dark-bg" />
                  </div>
                  <div className={`absolute inset-0 rounded-full bg-${step.color} opacity-20 animate-ping`} />
                </motion.div>

                {/* Spacer for opposite side */}
                <div className="flex-1 max-w-lg" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default JourneyTimeline;