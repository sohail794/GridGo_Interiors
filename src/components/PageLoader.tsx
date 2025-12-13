export default function PageLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center" style={{ animation: 'fadeIn 300ms ease-out forwards' }}>
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center">
          <div className="relative w-16 h-16">
            {/* Outer glow ring */}
            <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-brand-gold border-r-brand-gold motion-safe:animate-spin motion-reduce:animate-none" style={{ animationDuration: '2s' }} />
            {/* Middle ring */}
            <div className="absolute inset-2 rounded-full border-4 border-transparent border-b-brand-gold/40 motion-safe:animate-spin motion-reduce:animate-none" style={{ animationDuration: '3s', animationDirection: 'reverse' }} />
            {/* Inner spinner */}
            <div className="absolute inset-4 rounded-full border-4 border-brand-gold border-t-transparent motion-safe:animate-spin motion-reduce:animate-none mx-auto shadow-[0_0_30px_rgba(201,161,74,0.35)]" style={{ animationDuration: '1s' }} />
          </div>
        </div>
        <div className="space-y-2">
          <p className="text-text-secondary font-medium" style={{ animation: 'fadeInUp 400ms ease-out forwards', animationDelay: '200ms' }}>
            Loading page...
          </p>
        </div>
      </div>
    </div>
  );
}