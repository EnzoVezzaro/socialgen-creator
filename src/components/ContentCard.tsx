
import React from 'react';
import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, Copy } from "lucide-react";
import { toast } from "sonner";

interface ContentCardProps {
  className?: string;
  title: string;
  icon?: React.ReactNode;
  gradientClass?: string;
  isLoading?: boolean;
  children: React.ReactNode;
}

const ContentCard: React.FC<ContentCardProps> = ({
  className,
  title,
  icon,
  gradientClass,
  isLoading = false,
  children,
}) => {
  const handleCopy = () => {
    // In a real app, this would copy the content to clipboard
    toast.success("Content copied to clipboard");
  };

  const handleDownload = () => {
    // In a real app, this would download the content
    toast.success("Content download started");
  };

  return (
    <Card className={cn(
      "overflow-hidden transition-all duration-300 border-glass-border hover:shadow-hover",
      isLoading ? "animate-pulse" : "animate-fade-in",
      className
    )}>
      <div className={cn(
        "h-2 w-full", 
        gradientClass || "bg-primary",
        isLoading ? "loading-shimmer" : "animate-gradient-shift"
      )} />
      
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2 text-lg font-medium">
          {icon}
          {title}
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {isLoading ? (
          <div className="space-y-2">
            <div className="h-4 w-3/4 bg-muted rounded loading-shimmer"></div>
            <div className="h-4 w-full bg-muted rounded loading-shimmer"></div>
            <div className="h-4 w-5/6 bg-muted rounded loading-shimmer"></div>
          </div>
        ) : (
          children
        )}
        
        {!isLoading && (
          <div className="flex gap-2 pt-2">
            <Button 
              variant="outline" 
              size="sm" 
              className="flex-1 text-xs gap-1"
              onClick={handleCopy}
            >
              <Copy className="w-3 h-3" />
              Copy
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              className="flex-1 text-xs gap-1"
              onClick={handleDownload}
            >
              <Download className="w-3 h-3" />
              Download
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ContentCard;
