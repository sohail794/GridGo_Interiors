import { useScrollProgress } from '../hooks/useScrollProgress';

export default function ScrollProgressBar() {
  const progress = useScrollProgress();

  return (
    <div className="fixed top-0 left-0 h-1 bg-gradient-to-r from-brand-emerald via-brand-coral to-brand-emerald will-change-transform z-[10000]"
      style={{
        width: `${progress}%`,
        transition: 'width 0.1s ease-out',
      }}
      role="progressbar"
      aria-valuenow={Math.round(progress)}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label="Page scroll progress"
    />
  );
}
