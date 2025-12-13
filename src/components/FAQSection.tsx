import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import GlassCard from './GlassCard';

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

interface FAQSectionProps {
  faqs: FAQItem[];
  title?: string;
  subtitle?: string;
}

export default function FAQSection({ faqs, title = 'Frequently Asked Questions', subtitle }: FAQSectionProps) {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const prefersReducedMotion = useReducedMotion();

  const toggleFAQ = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  // Generate FAQ Schema for SEO
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    'mainEntity': faqs.map(faq => ({
      '@type': 'Question',
      'name': faq.question,
      'acceptedAnswer': {
        '@type': 'Answer',
        'text': faq.answer,
      },
    })),
  };

  return (
    <div className="space-y-8">
      {/* FAQ Schema for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Header */}
      {title && (
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-bold gradient-text mb-4">
            {title}
          </h2>
          {subtitle && (
            <p className="text-text-secondary text-lg max-w-2xl mx-auto">
              {subtitle}
            </p>
          )}
        </div>
      )}

      {/* FAQ Items */}
      <div className="space-y-4 max-w-3xl mx-auto">
        {faqs.map((faq, index) => {
          const isExpanded = expandedId === faq.id;

          return (
            <motion.div
              key={faq.id}
              initial={prefersReducedMotion ? undefined : { opacity: 0, y: 20 }}
              whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={prefersReducedMotion ? undefined : { duration: 0.5, delay: index * 0.1 }}
            >
              <GlassCard
                hover={false}
                className={`transition-all duration-300 ${
                  isExpanded ? 'border-brand-gold/50' : ''
                }`}
              >
                <button
                  onClick={() => toggleFAQ(faq.id)}
                  className="w-full flex items-start justify-between text-left py-2 transition-colors"
                  aria-expanded={isExpanded}
                  aria-controls={`faq-answer-${faq.id}`}
                  type="button"
                >
                  <span className="text-lg font-semibold text-text-primary pr-4 flex-1">
                    {faq.question}
                  </span>
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-brand-gold/10 flex items-center justify-center text-brand-gold transition-transform duration-300">
                    {isExpanded ? (
                      <ChevronUp size={20} />
                    ) : (
                      <ChevronDown size={20} />
                    )}
                  </span>
                </button>

                <AnimatePresence initial={false}>
                  {isExpanded && (
                    <motion.div
                      id={`faq-answer-${faq.id}`}
                      initial={prefersReducedMotion ? undefined : { height: 0, opacity: 0 }}
                      animate={prefersReducedMotion ? undefined : { height: 'auto', opacity: 1 }}
                      exit={prefersReducedMotion ? undefined : { height: 0, opacity: 0 }}
                      transition={prefersReducedMotion ? undefined : { duration: 0.3, ease: 'easeInOut' }}
                      className="overflow-hidden"
                    >
                      <div className="pt-4 pb-2 text-text-secondary leading-relaxed border-t border-white/5 mt-4">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </GlassCard>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
