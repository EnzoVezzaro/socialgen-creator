
import React from 'react';
import { cn } from "@/lib/utils";
import ContentCard from './ContentCard';
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Instagram, Twitter, Youtube, Sparkles } from "lucide-react";

interface SocialMediaPreviewProps {
  platform: 'instagram' | 'twitter' | 'youtube';
  text: string;
  imageUrl?: string;
  isLoading?: boolean;
  className?: string;
}

const platformConfig = {
  instagram: {
    title: 'Instagram',
    icon: <Instagram className="w-4 h-4 text-instagram" />,
    gradientClass: 'platform-gradient-instagram',
    aspectRatio: 1, // 1:1 for Instagram
  },
  twitter: {
    title: 'Twitter',
    icon: <Twitter className="w-4 h-4 text-twitter" />,
    gradientClass: 'platform-gradient-twitter',
    aspectRatio: 16/9, // Twitter images are often 16:9
  },
  youtube: {
    title: 'YouTube',
    icon: <Youtube className="w-4 h-4 text-youtube" />,
    gradientClass: 'platform-gradient-youtube',
    aspectRatio: 16/9, // YouTube thumbnails are 16:9
  },
};

const SocialMediaPreview: React.FC<SocialMediaPreviewProps> = ({
  platform,
  text,
  imageUrl,
  isLoading = false,
  className,
}) => {
  const config = platformConfig[platform];
  const isSpanish = text.includes('¡') || text.includes('é') || text.includes('ó');
  
  return (
    <ContentCard
      title={config.title}
      icon={config.icon}
      gradientClass={config.gradientClass}
      isLoading={isLoading}
      className={className}
    >
      <div className="space-y-4">
        {imageUrl && (
          <div className="overflow-hidden rounded-md border border-border relative group">
            <AspectRatio ratio={config.aspectRatio}>
              <img
                src={imageUrl}
                alt={`${platform} preview`}
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                loading="lazy"
              />
            </AspectRatio>
            <div className="absolute top-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1">
              <Sparkles className="w-3 h-3" />
              <span>{isSpanish ? "Generado por IA" : "AI Generated"}</span>
            </div>
          </div>
        )}
        
        <div className="text-sm leading-relaxed">
          {platform === 'instagram' && (
            <div className="space-y-1">
              <p className="font-medium text-foreground">Caption:</p>
              <p className="text-muted-foreground">{text}</p>
            </div>
          )}
          
          {platform === 'twitter' && (
            <div className="p-3 rounded-lg border border-border bg-background/50">
              <p className="text-foreground">{text}</p>
            </div>
          )}
          
          {platform === 'youtube' && (
            <div className="space-y-1">
              <p className="font-medium text-foreground">Title:</p>
              <p className="text-muted-foreground">{text}</p>
            </div>
          )}
        </div>
      </div>
    </ContentCard>
  );
};

export default SocialMediaPreview;
