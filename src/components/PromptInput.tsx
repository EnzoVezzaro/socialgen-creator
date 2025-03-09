
import React, { useState } from 'react';
import { cn } from "@/lib/utils";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";

interface PromptInputProps {
  className?: string;
  onGenerate: (prompt: string) => void;
  isGenerating: boolean;
}

const PromptInput: React.FC<PromptInputProps> = ({ 
  className, 
  onGenerate, 
  isGenerating 
}) => {
  const [prompt, setPrompt] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (prompt.trim() && !isGenerating) {
      onGenerate(prompt.trim());
    }
  };

  return (
    <div className={cn("w-full max-w-3xl mx-auto", className)}>
      <div className="glass-panel p-6 transition-all duration-300 hover:shadow-hover">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <div className="inline-block">
              <span className="px-2.5 py-0.5 text-xs font-medium rounded-full bg-primary/10 text-primary animate-pulse-slow">
                Content Creator
              </span>
            </div>
            <h2 className="text-2xl font-medium tracking-tight">
              Generate content across platforms
            </h2>
            <p className="text-muted-foreground">
              Enter a topic or idea and we'll create content for Instagram, Twitter, YouTube, blog posts, and videos.
            </p>
          </div>
          
          <Textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Enter your content idea or topic here..."
            className="min-h-[120px] bg-background/50 border-muted resize-none transition-all duration-200 focus:ring-2 focus:ring-primary/20"
          />
          
          <Button 
            type="submit" 
            className="w-full group relative overflow-hidden"
            disabled={!prompt.trim() || isGenerating}
          >
            <span className="relative z-10 flex items-center justify-center gap-2">
              <Sparkles className="w-4 h-4" />
              {isGenerating ? 'Generating Content...' : 'Generate Content'}
            </span>
            <span className="absolute inset-0 bg-gradient-to-r from-primary to-accent opacity-100 group-hover:animate-gradient-shift"></span>
          </Button>
        </form>
      </div>
    </div>
  );
};

export default PromptInput;
