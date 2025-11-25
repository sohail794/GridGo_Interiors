export default function PageLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center" style={{ animation: 'fadeIn 300ms ease-out forwards' }}>
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center">
          <div className="relative w-16 h-16">
            {/* Outer glow ring */}
            <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-[rgb(0,255,136)] border-r-[rgb(0,255,136)] animate-spin" style={{ animation: 'spin 2s linear infinite' }} />
            {/* Middle ring */}
            <div className="absolute inset-2 rounded-full border-4 border-transparent border-b-[rgb(0,255,136)]/50 animate-spin" style={{ animation: 'spin 3s linear infinite reverse' }} />
            {/* Inner spinner */}
            <div className="absolute inset-4 rounded-full border-4 border-[rgb(0,255,136)] border-t-transparent animate-spin mx-auto shadow-[0_0_30px_rgba(0,255,136,0.5)]" style={{ animation: 'spin 1s linear infinite', filter: 'drop-shadow(0 0 20px rgba(0,255,136,0.4))' }} />
            {/* Center dot */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-2 h-2 rounded-full bg-[rgb(0,255,136)] animate-pulse" />
            </div>
          </div>
        </div>
        <div className="space-y-2">
          <p className="text-text-secondary font-medium" style={{ animation: 'fadeInUp 400ms ease-out forwards', animationDelay: '200ms' }}>
            Loading page...
          </p>
          <div className="flex gap-1 justify-center" style={{ animation: 'fadeInUp 400ms ease-out forwards', animationDelay: '300ms' }}>
            <div className="w-2 h-2 rounded-full bg-[rgb(0,255,136)]/60 animate-bounce" style={{ animationDelay: '0ms' }} />
            <div className="w-2 h-2 rounded-full bg-[rgb(0,255,136)]/60 animate-bounce" style={{ animationDelay: '150ms' }} />
            <div className="w-2 h-2 rounded-full bg-[rgb(0,255,136)]/60 animate-bounce" style={{ animationDelay: '300ms' }} />
          </div>
        </div>
      </div>
    </div>
  );
}