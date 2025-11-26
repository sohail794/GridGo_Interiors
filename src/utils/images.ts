/**
 * Image srcset helper for responsive images
 * Use with optimized images from scripts/optimize-images.js
 */

export const imageSizes = {
  hero: { width: 1920, height: 1080 },
  heroMobile: { width: 768, height: 1024 },
  card: { width: 800, height: 600 },
  cardSmall: { width: 400, height: 300 },
  thumbnail: { width: 200, height: 150 },
} as const;

export type ImageSize = keyof typeof imageSizes;

/**
 * Generate srcset string for an optimized image
 * @param baseName - Original image name without extension
 * @param sizes - Array of size names to include (default: all)
 * @returns srcset string
 */
export function getSrcset(baseName: string, sizes?: ImageSize[]): string {
  const sizesToUse = sizes || (Object.keys(imageSizes) as ImageSize[]);
  return sizesToUse
    .map(size => {
      const { width } = imageSizes[size];
      return `/images/optimized/${baseName}-${size}.webp ${width}w`;
    })
    .join(', ');
}

/**
 * Get optimized image path
 * @param baseName - Original image name without extension
 * @param size - Size variant
 * @param format - Image format (default: webp)
 */
export function getOptimizedImage(
  baseName: string, 
  size: ImageSize = 'card',
  format: 'webp' | 'avif' = 'webp'
): string {
  return `/images/optimized/${baseName}-${size}.${format}`;
}

/**
 * Generate responsive image props for <img> element
 * @param baseName - Original image name without extension
 * @param alt - Alt text
 * @param sizes - Responsive sizes attribute (e.g., "(max-width: 768px) 100vw, 50vw")
 */
export function getResponsiveImageProps(
  baseName: string,
  alt: string,
  sizes: string = '100vw'
): {
  src: string;
  srcSet: string;
  sizes: string;
  alt: string;
  width: number;
  height: number;
} {
  return {
    src: getOptimizedImage(baseName, 'card'),
    srcSet: getSrcset(baseName),
    sizes,
    alt,
    width: imageSizes.card.width,
    height: imageSizes.card.height,
  };
}

/**
 * Get hero image props with proper responsive handling
 */
export function getHeroImageProps(
  baseName: string,
  alt: string
): {
  src: string;
  srcSet: string;
  sizes: string;
  alt: string;
  width: number;
  height: number;
} {
  return {
    src: getOptimizedImage(baseName, 'hero'),
    srcSet: `
      ${getOptimizedImage(baseName, 'heroMobile')} 768w,
      ${getOptimizedImage(baseName, 'hero')} 1920w
    `.trim(),
    sizes: '100vw',
    alt,
    width: imageSizes.hero.width,
    height: imageSizes.hero.height,
  };
}
