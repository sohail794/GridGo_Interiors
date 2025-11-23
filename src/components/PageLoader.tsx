export default function PageLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center animate-fade-in">
      <div className="text-center space-y-4">
        <div className="w-12 h-12 border-4 border-[rgb(0,255,136)] border-t-transparent rounded-full animate-spin mx-auto shadow-[0_0_20px_rgba(0,255,136,0.3)]" />
        <p className="text-text-secondary animate-pulse">Loading page...</p>
      </div>
    </div>
  );
}
