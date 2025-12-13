import { ChevronRight, Home } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';

export interface BreadcrumbItem {
  label: string;
  page?: string;
  current?: boolean;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  onNavigate?: (page: string) => void;
}

export default function Breadcrumb({ items, onNavigate }: BreadcrumbProps) {
  const prefersReducedMotion = useReducedMotion();

  // Generate breadcrumb schema for SEO
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    'itemListElement': items.map((item, index) => ({
      '@type': 'ListItem',
      'position': index + 1,
      'name': item.label,
      'item': item.page ? `https://gridgointeriors.com/#/${item.page}` : undefined,
    })),
  };

  return (
    <>
      {/* Breadcrumb Schema for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* Breadcrumb Navigation */}
      <nav aria-label="Breadcrumb" className="py-4">
        <ol className="flex items-center flex-wrap gap-2 text-sm">
          {items.map((item, index) => {
            const isLast = index === items.length - 1;
            const isFirst = index === 0;

            return (
              <motion.li
                key={index}
                className="flex items-center"
                initial={prefersReducedMotion ? undefined : { opacity: 0, x: -10 }}
                animate={prefersReducedMotion ? undefined : { opacity: 1, x: 0 }}
                transition={prefersReducedMotion ? undefined : { duration: 0.3, delay: index * 0.1 }}
              >
                {/* Home Icon for first item */}
                {isFirst && item.page === 'home' && (
                  <Home size={16} className="mr-1 text-brand-gold" aria-hidden="true" />
                )}

                {/* Breadcrumb Link or Text */}
                {!isLast && item.page ? (
                  <button
                    onClick={() => onNavigate?.(item.page!)}
                    className="text-text-secondary hover:text-brand-gold transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-brand-gold/60 rounded px-1"
                    aria-current={item.current ? 'page' : undefined}
                  >
                    {item.label}
                  </button>
                ) : (
                  <span
                    className={`${
                      isLast
                        ? 'text-text-primary font-semibold'
                        : 'text-text-secondary'
                    }`}
                    aria-current={isLast ? 'page' : undefined}
                  >
                    {item.label}
                  </span>
                )}

                {/* Separator */}
                {!isLast && (
                  <ChevronRight
                    size={16}
                    className="mx-2 text-text-tertiary"
                    aria-hidden="true"
                  />
                )}
              </motion.li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}
