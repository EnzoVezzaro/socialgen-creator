
import React, { useState } from 'react';
import { cn } from "@/lib/utils";
import ContentCard from './ContentCard';
import { FileVideo, Play, Wand2 } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

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
  
  const [playing, setPlaying] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [videoGenerated, setVideoGenerated] = useState(false);
  
  // Get video URL from the content generator
  // In a real implementation, this would come from the backend
  const videoUrl = "https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4";
  
  const handlePlay = () => {
    setPlaying(true);
  };
  
  const handleGenerate = () => {
    setGenerating(true);
    
    // Simulate video generation process
    setTimeout(() => {
      setGenerating(false);
      setVideoGenerated(true);
      setPlaying(true);
      toast.success("¡Video generado con éxito!");
    }, 2000);
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
        {!playing && thumbnailUrl && !videoGenerated && (
          <div className="relative overflow-hidden rounded-md border border-border group">
            <img
              src={thumbnailUrl}
              alt="Video thumbnail preview"
              className="w-full aspect-video object-cover transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <Button 
                onClick={handleGenerate}
                className="bg-black/70 hover:bg-black/90 text-white rounded-md gap-2"
                disabled={generating}
              >
                {generating ? (
                  <>
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                    Generando...
                  </>
                ) : (
                  <>
                    <Wand2 className="w-4 h-4" />
                    Generar Video con IA
                  </>
                )}
              </Button>
            </div>
          </div>
        )}
        
        {playing && videoGenerated && (
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
            Duración estimada: 3-5 minutos
          </p>
        </div>
        
        <Separator />
        
        <div className="space-y-2">
          <p className="text-xs font-medium text-foreground">Previsualización del guión:</p>
          <p className="text-xs text-muted-foreground">{truncatedScript}</p>
          
          {script.length > 300 && (
            <p className="text-xs text-muted-foreground italic">
              Guión completo disponible cuando se copia o descarga
            </p>
          )}
        </div>
      </div>
    </ContentCard>
  );
};

export default VideoPreview;
