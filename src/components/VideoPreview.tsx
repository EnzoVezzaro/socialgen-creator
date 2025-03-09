
import React from 'react';
import { cn } from "@/lib/utils";
import ContentCard from './ContentCard';
import { FileVideo } from "lucide-react";
import { Separator } from "@/components/ui/separator";

interface VideoPreviewProps {
  title: string;
  script: string;
  thumbnailUrl?: string;
  isLoading?: boolean;
  className?: string;
}

const VideoPreview: React.FC<VideoPreviewProps> = ({
  title,
  script,
  thumbnailUrl,
  isLoading = false,
  className,
}) => {
  // Truncate the script to show only a preview
  const truncatedScript = script.length > 300
    ? script.substring(0, 300) + '...'
    : script;
  
  return (
    <ContentCard
      title="Video Concept"
      icon={<FileVideo className="w-4 h-4 text-video" />}
      gradientClass="platform-gradient-video"
      isLoading={isLoading}
      className={className}
    >
      <div className="space-y-4">
        {thumbnailUrl && (
          <div className="overflow-hidden rounded-md border border-border">
            <img
              src={thumbnailUrl}
              alt="Video thumbnail preview"
              className="w-full aspect-video object-cover transition-transform duration-500 hover:scale-105"
              loading="lazy"
            />
          </div>
        )}
        
        <div>
          <h3 className="font-medium">{title}</h3>
          <p className="text-xs text-muted-foreground mt-1">
            Estimated duration: 3-5 minutes
          </p>
        </div>
        
        <Separator />
        
        <div className="space-y-2">
          <p className="text-xs font-medium text-foreground">Script Preview:</p>
          <p className="text-xs text-muted-foreground">{truncatedScript}</p>
          
          {script.length > 300 && (
            <p className="text-xs text-muted-foreground italic">
              Full script available when copied or downloaded
            </p>
          )}
        </div>
      </div>
    </ContentCard>
  );
};

export default VideoPreview;
