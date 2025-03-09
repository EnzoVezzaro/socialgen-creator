
import React from 'react';
import { cn } from "@/lib/utils";
import ContentCard from './ContentCard';
import { FileText } from "lucide-react";
import { Separator } from "@/components/ui/separator";

interface BlogPreviewProps {
  title: string;
  content: string;
  isLoading?: boolean;
  className?: string;
}

const BlogPreview: React.FC<BlogPreviewProps> = ({
  title,
  content,
  isLoading = false,
  className,
}) => {
  // Truncate the content to show only a preview
  const truncatedContent = content.length > 500
    ? content.substring(0, 500) + '...'
    : content;
  
  return (
    <ContentCard
      title="Blog Post"
      icon={<FileText className="w-4 h-4 text-blog" />}
      gradientClass="platform-gradient-blog"
      isLoading={isLoading}
      className={className}
    >
      <div className="space-y-4">
        <h3 className="text-lg font-medium">{title}</h3>
        
        <Separator />
        
        <div className="prose prose-sm max-w-none text-muted-foreground">
          <p>{truncatedContent}</p>
        </div>
        
        {content.length > 500 && (
          <div className="text-xs text-muted-foreground italic">
            Full blog post available when copied or downloaded
          </div>
        )}
      </div>
    </ContentCard>
  );
};

export default BlogPreview;
