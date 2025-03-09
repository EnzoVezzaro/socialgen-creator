
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
  const [videoUrl, setVideoUrl] = useState<string>("");
  
  const handleGenerate = async () => {
    setGenerating(true);
  
    try {
      const response = await fetch('https://text-to-video.p.rapidapi.com/v3/process_text_and_search_media', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-rapidapi-host': 'text-to-video.p.rapidapi.com',
          'x-rapidapi-key': 'XXX',
        },
        body: JSON.stringify({
          script: script,
          dimension: "16:9", // Video aspect ratio
        }),
      });
  
      // Handle the response from the API
      const data = await response.json();
      console.log('data: ', data);
      
      if (data && data.videoUrl) {
        setVideoUrl(data.videoUrl); // Assuming the API returns a video URL
        setGenerating(false);
        setVideoGenerated(true);
        setPlaying(true);
  
        // Show success message
        toast.success("Video generated successfully!");
      } else {
        throw new Error("No video URL returned");
      }
    } catch (error) {
      setGenerating(false);
      toast.error("Failed to generate video");
      console.error("Video generation error:", error);
    }
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
            <div className="relative">
              <img
                src={thumbnailUrl}
                alt="Video thumbnail preview"
                className="w-full aspect-video object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-black/30 transition-opacity duration-300 opacity-0 group-hover:opacity-100" />
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <Button 
                onClick={handleGenerate}
                className="bg-black/70 hover:bg-black/90 text-white rounded-md gap-2 transition-transform duration-300 transform hover:scale-105"
                disabled={generating}
              >
                {generating ? (
                  <>
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                    {title.includes("Explicado") ? "Generando..." : "Generating..."}
                  </>
                ) : (
                  <>
                    <Wand2 className="w-4 h-4" />
                    {title.includes("Explicado") ? "Generar Video con IA" : "Generate AI Video"}
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
            {title.includes("Explicado") ? "Duración estimada: 3-5 minutos" : "Estimated duration: 3-5 minutes"}
          </p>
        </div>
        
        <Separator />
        
        <div className="space-y-2">
          <p className="text-xs font-medium text-foreground">
            {title.includes("Explicado") ? "Previsualización del guión:" : "Script Preview:"}
          </p>
          <p className="text-xs text-muted-foreground">{truncatedScript}</p>
          
          {script.length > 300 && (
            <p className="text-xs text-muted-foreground italic">
              {title.includes("Explicado") 
                ? "Guión completo disponible cuando se copia o descarga" 
                : "Full script available when copied or downloaded"}
            </p>
          )}
        </div>
      </div>
    </ContentCard>
  );
};

export default VideoPreview;
