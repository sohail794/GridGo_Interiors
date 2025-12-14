import { Facebook, Twitter, Linkedin, Link2, Mail } from 'lucide-react';
import { useState } from 'react';

interface SocialShareProps {
  url: string;
  title: string;
  description?: string;
}

export default function SocialShare({ url, title, description }: SocialShareProps) {
  const [copied, setCopied] = useState(false);

  const shareUrls = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
    twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
    email: `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(description || '')} ${encodeURIComponent(url)}`,
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy link:', err);
    }
  };

  const handleShare = (platform: keyof typeof shareUrls) => {
    window.open(shareUrls[platform], '_blank', 'width=600,height=400');
  };

  return (
    <div className="flex items-center gap-3">
      <span className="text-sm text-text-tertiary">Share:</span>
      
      <button
        onClick={() => handleShare('facebook')}
        className="p-2 rounded-lg bg-neutral-800 hover:bg-blue-600 transition-colors"
        aria-label="Share on Facebook"
      >
        <Facebook className="w-5 h-5" />
      </button>

      <button
        onClick={() => handleShare('twitter')}
        className="p-2 rounded-lg bg-neutral-800 hover:bg-sky-500 transition-colors"
        aria-label="Share on Twitter"
      >
        <Twitter className="w-5 h-5" />
      </button>

      <button
        onClick={() => handleShare('linkedin')}
        className="p-2 rounded-lg bg-neutral-800 hover:bg-blue-700 transition-colors"
        aria-label="Share on LinkedIn"
      >
        <Linkedin className="w-5 h-5" />
      </button>

      <button
        onClick={() => handleShare('email')}
        className="p-2 rounded-lg bg-neutral-800 hover:bg-neutral-700 transition-colors"
        aria-label="Share via Email"
      >
        <Mail className="w-5 h-5" />
      </button>

      <button
        onClick={handleCopyLink}
        className="p-2 rounded-lg bg-neutral-800 hover:bg-brand-gold hover:text-black transition-colors relative"
        aria-label="Copy link"
      >
        <Link2 className="w-5 h-5" />
        {copied && (
          <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-brand-gold text-black text-xs px-2 py-1 rounded whitespace-nowrap">
            Copied!
          </span>
        )}
      </button>
    </div>
  );
}
