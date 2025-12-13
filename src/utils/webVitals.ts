/**
 * Web Vitals Tracking Utility
 * Tracks Core Web Vitals (CWV) and reports them for performance monitoring
 * 
 * Metrics tracked:
 * - LCP (Largest Contentful Paint): Loading performance
 * - FID (First Input Delay): Interactivity
 * - CLS (Cumulative Layout Shift): Visual stability
 * - FCP (First Contentful Paint): Initial load
 * - TTFB (Time to First Byte): Server response time
 */

interface WebVital {
  name: string;
  value: number;
  rating: 'good' | 'needs-improvement' | 'poor';
  delta: number;
  id: string;
}

// Rating thresholds based on web.dev recommendations
const THRESHOLDS = {
  LCP: { good: 2500, poor: 4000 }, // milliseconds
  FID: { good: 100, poor: 300 },   // milliseconds
  CLS: { good: 0.1, poor: 0.25 },  // score
  FCP: { good: 1800, poor: 3000 }, // milliseconds
  TTFB: { good: 800, poor: 1800 }, // milliseconds
};

const getRating = (name: string, value: number): 'good' | 'needs-improvement' | 'poor' => {
  const threshold = THRESHOLDS[name as keyof typeof THRESHOLDS];
  if (!threshold) return 'good';
  
  if (value <= threshold.good) return 'good';
  if (value <= threshold.poor) return 'needs-improvement';
  return 'poor';
};

/**
 * Report web vitals to console (can be extended to send to analytics)
 */
const reportWebVital = (metric: WebVital) => {
  // Log to console for development
  console.log(`[Web Vitals] ${metric.name}:`, {
    value: metric.value,
    rating: metric.rating,
    id: metric.id,
  });

  // Send to analytics service (uncomment and configure as needed)
  /*
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', metric.name, {
      value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
      event_category: 'Web Vitals',
      event_label: metric.id,
      non_interaction: true,
    });
  }
  */

  // Send to custom analytics endpoint
  /*
  fetch('/api/analytics/vitals', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(metric),
  }).catch(console.error);
  */
};

/**
 * Initialize web vitals tracking
 * Call this once when the app loads
 */
export const initWebVitals = async () => {
  if (typeof window === 'undefined') return;

  try {
    // Dynamically import web-vitals library if available
    // For now, use the native Performance API
    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (entry.entryType === 'largest-contentful-paint') {
          const metric: WebVital = {
            name: 'LCP',
            value: entry.startTime,
            rating: getRating('LCP', entry.startTime),
            delta: entry.startTime,
            id: entry.name,
          };
          reportWebVital(metric);
        }
      }
    });

    // Observe LCP
    observer.observe({ type: 'largest-contentful-paint', buffered: true });

    // Observe FID (First Input Delay)
    const fidObserver = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        const fidEntry = entry as PerformanceEventTiming;
        if (fidEntry.processingStart) {
          const fid = fidEntry.processingStart - fidEntry.startTime;
          const metric: WebVital = {
            name: 'FID',
            value: fid,
            rating: getRating('FID', fid),
            delta: fid,
            id: fidEntry.name,
          };
          reportWebVital(metric);
        }
      }
    });
    fidObserver.observe({ type: 'first-input', buffered: true });

    // Track CLS (Cumulative Layout Shift)
    let clsValue = 0;
    const clsObserver = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (!(entry as any).hadRecentInput) {
          clsValue += (entry as any).value;
        }
      }
    });
    clsObserver.observe({ type: 'layout-shift', buffered: true });

    // Report CLS when page is hidden
    const reportCLS = () => {
      const metric: WebVital = {
        name: 'CLS',
        value: clsValue,
        rating: getRating('CLS', clsValue),
        delta: clsValue,
        id: 'cls-' + Date.now(),
      };
      reportWebVital(metric);
    };

    // Report on page hide or unload
    window.addEventListener('pagehide', reportCLS);
    window.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'hidden') {
        reportCLS();
      }
    });

    // Track FCP and TTFB using Navigation Timing
    window.addEventListener('load', () => {
      const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
      
      if (navigation) {
        // TTFB
        const ttfb = navigation.responseStart - navigation.requestStart;
        reportWebVital({
          name: 'TTFB',
          value: ttfb,
          rating: getRating('TTFB', ttfb),
          delta: ttfb,
          id: 'ttfb-' + Date.now(),
        });

        // FCP
        const fcpEntry = performance.getEntriesByName('first-contentful-paint')[0];
        if (fcpEntry) {
          reportWebVital({
            name: 'FCP',
            value: fcpEntry.startTime,
            rating: getRating('FCP', fcpEntry.startTime),
            delta: fcpEntry.startTime,
            id: 'fcp-' + Date.now(),
          });
        }
      }
    });

  } catch (error) {
    console.error('Failed to initialize web vitals tracking:', error);
  }
};

/**
 * Get current performance metrics
 */
export const getPerformanceMetrics = () => {
  if (typeof window === 'undefined') return null;

  const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
  if (!navigation) return null;

  return {
    // Page load timing
    domContentLoaded: navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart,
    loadComplete: navigation.loadEventEnd - navigation.loadEventStart,
    
    // Network timing
    dns: navigation.domainLookupEnd - navigation.domainLookupStart,
    tcp: navigation.connectEnd - navigation.connectStart,
    ttfb: navigation.responseStart - navigation.requestStart,
    download: navigation.responseEnd - navigation.responseStart,
    
    // Resource timing
    domInteractive: navigation.domInteractive - navigation.fetchStart,
    domComplete: navigation.domComplete - navigation.fetchStart,
  };
};
