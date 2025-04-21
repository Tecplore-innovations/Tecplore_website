import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Copy, Twitter, Facebook, Mail } from 'lucide-react';

interface ShareOptionsProps {
  url: string;
  title: string;
  description: string;
}

const ShareOptions: React.FC<ShareOptionsProps> = ({ url, title, description }) => {
  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      // You could add a toast notification here
    } catch (error: unknown) {
      console.error('Failed to copy:', error);
    }
  };

  // const shareOnLinkedIn = () => {
  //   const linkedInUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
  //   window.open(linkedInUrl, '_blank');
  // };

  const shareOnTwitter = () => {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`;
    window.open(twitterUrl, '_blank');
  };

  const shareOnFacebook = () => {
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
    window.open(facebookUrl, '_blank');
  };

  const shareViaEmail = () => {
    const emailUrl = `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(`${description}\n\n${url}`)}`;
    window.location.href = emailUrl;
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        <Input
          value={url}
          readOnly
          className="flex-1"
        />
        <Button 
          size="icon"
          variant="outline"
          onClick={handleCopyLink}
        >
          <Copy className="h-4 w-4" />
        </Button>
      </div>
      
      <div className="flex justify-center space-x-2">
        {/* <Button
          variant="outline"
          size="icon"
          onClick={shareOnLinkedIn}
          className="hover:bg-[#0077b5] hover:text-white"
        >
          <LinkedIn className="h-4 w-4" />
        </Button> */}
        <Button
          variant="outline"
          size="icon"
          onClick={shareOnTwitter}
          className="hover:bg-[#1DA1F2] hover:text-white"
        >
          <Twitter className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={shareOnFacebook}
          className="hover:bg-[#4267B2] hover:text-white"
        >
          <Facebook className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={shareViaEmail}
          className="hover:bg-gray-800 hover:text-white"
        >
          <Mail className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default ShareOptions;