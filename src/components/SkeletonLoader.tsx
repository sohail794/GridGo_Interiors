/**
 * Skeleton loader component for progressive content loading
 * Shows animated placeholder while content loads
 */
export default function SkeletonLoader({ count = 1, variant = 'card' }: { count?: number; variant?: 'card' | 'text' | 'image' | 'circle' }) {
  const variants = {
    card: 'h-64 rounded-xl',
    text: 'h-4 rounded',
    image: 'h-48 rounded-lg',
    circle: 'w-16 h-16 rounded-full',
  };

  return (
    <div className="space-y-4">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className={`${variants[variant]} bg-gradient-to-r from-white/5 to-white/10 animate-pulse rounded-lg overflow-hidden`}
          style={{
            backgroundImage: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)',
            backgroundSize: '200% 100%',
            animation: 'shimmer 2s infinite',
          }}
          aria-busy="true"
          role="progressbar"
          aria-valuenow={0}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label="Loading"
        />
      ))}
    </div>
  );
}
