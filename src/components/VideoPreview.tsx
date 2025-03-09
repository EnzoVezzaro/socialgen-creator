
import React from 'react';
import { cn } from "@/lib/utils";
import ContentCard from './ContentCard';
import { FileVideo, Play } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";

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
  
  const [playing, setPlaying] = React.useState(false);
  
  // Get video URL from the content generator
  // In a real implementation, this would come from the backend
  const videoUrl = "https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4";
  
  const handlePlay = () => {
    setPlaying(true);
  };
  
  return (
    <ContentCard
      title="Video Concept"
      icon={<FileVideo className="w-4 h-4 text-video" />}
      gradientClass="platform-gradient-video"
      isLoading={isLoading}
      className={className}
    >
      <div className="space-y-4">
        {!playing && thumbnailUrl && (
          <div className="relative overflow-hidden rounded-md border border-border group">
            <img
              src={thumbnailUrl}
              alt="Video thumbnail preview"
              className="w-full aspect-video object-cover transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <Button 
                onClick={handlePlay} 
                size="icon" 
                className="bg-black/70 hover:bg-black/90 text-white rounded-full w-12 h-12"
              >
                <Play className="w-5 h-5" />
              </Button>
            </div>
          </div>
        )}
        
        {playing && (
          <div className="overflow-hidden rounded-md border border-border">
            <video
              className="w-full aspect-video"
              controls
              autoPlay
              src={videoUrl}
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
