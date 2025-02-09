import React from 'react';
import { Share2, Facebook, Twitter, Linkedin, Link2 } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from '@/components/ui/use-toast';

export interface ShareMenuProps {
  jobTitle: string;
  companyName: string;
  jobUrl: string;
}

interface ShareOption {
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  getShareUrl: (params: { title: string, url: string }) => string;
  className: string;
}

const shareOptions: ShareOption[] = [
  {
    name: 'Facebook',
    icon: Facebook,
    getShareUrl: ({ url }) => 
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
    className: 'hover:text-blue-600',
  },
  {
    name: 'Twitter',
    icon: Twitter,
    getShareUrl: ({ title, url }) => 
      `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`,
    className: 'hover:text-sky-500',
  },
  {
    name: 'LinkedIn',
    icon: Linkedin,
    getShareUrl: ({ url }) => 
      `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
    className: 'hover:text-blue-700',
  },
];

export const ShareMenu: React.FC<ShareMenuProps> = ({ jobTitle, companyName, jobUrl }) => {
  const handleShare = async (option: ShareOption) => {
    const title = `${jobTitle} at ${companyName}`;
    const shareUrl = option.getShareUrl({ title, url: jobUrl });
    window.open(shareUrl, '_blank', 'width=600,height=600');
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(jobUrl);
      toast({
        title: "Link copied",
        description: "Job link has been copied to clipboard",
        duration: 2000,
      });
    } catch (error: unknown) {
      console.error('Failed to copy to clipboard:', error);
      toast({
        title: "Failed to copy",
        description: "Please try again",
        variant: "destructive",
        duration: 2000,
      });
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button 
          className="p-2 hover:bg-gray-50 rounded-md transition-colors"
          aria-label="Share job"
        >
          <Share2 className="w-5 h-5 text-gray-400 hover:text-gray-600" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        {shareOptions.map((option) => (
          <DropdownMenuItem
            key={option.name}
            onClick={() => handleShare(option)}
            className="cursor-pointer"
          >
            <div className="flex items-center gap-2">
              <option.icon className={`w-4 h-4 ${option.className}`} />
              <span>Share on {option.name}</span>
            </div>
          </DropdownMenuItem>
        ))}
        <DropdownMenuItem
          onClick={handleCopyLink}
          className="cursor-pointer"
        >
          <div className="flex items-center gap-2">
            <Link2 className="w-4 h-4 hover:text-gray-600" />
            <span>Copy link</span>
          </div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};