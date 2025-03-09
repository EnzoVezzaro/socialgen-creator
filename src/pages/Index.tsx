
import React, { useState } from 'react';
import { motion } from "framer-motion";
import AnimatedBackground from '../components/AnimatedBackground';
import PromptInput from '../components/PromptInput';
import SocialMediaPreview from '../components/SocialMediaPreview';
import BlogPreview from '../components/BlogPreview';
import VideoPreview from '../components/VideoPreview';
import { generateContent, GeneratedContent } from '../lib/contentGenerator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { toast } from "sonner";
import { Instagram, Twitter, Youtube, FileText, FileVideo, RefreshCw } from "lucide-react";

// Add framer-motion as a dependency
<lov-add-dependency>framer-motion@latest</lov-add-dependency>

const Index = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [content, setContent] = useState<GeneratedContent | null>(null);
  const [activeTab, setActiveTab] = useState("all");

  const handleGenerate = async (prompt: string) => {
    setIsGenerating(true);
    setContent(null);
    
    try {
      const generatedContent = await generateContent(prompt);
      setContent(generatedContent);
      toast.success("Content generated successfully!");
    } catch (error) {
      console.error("Error generating content:", error);
      toast.error("Failed to generate content. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleReset = () => {
    setContent(null);
  };

  // Animation variants for content cards
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    }
  };

  return (
    <>
      <AnimatedBackground />
      
      <div className="min-h-screen flex flex-col p-4 md:p-8">
        <header className="max-w-5xl mx-auto w-full text-center mb-8 md:mb-12">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-3">
              <span className="gradient-text">Content Creator</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Transform your ideas into engaging content for multiple platforms with a single prompt
            </p>
          </motion.div>
        </header>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-8 md:mb-12"
        >
          <PromptInput 
            onGenerate={handleGenerate} 
            isGenerating={isGenerating} 
          />
        </motion.div>
        
        {(isGenerating || content) && (
          <Tabs 
            value={activeTab} 
            onValueChange={setActiveTab}
            className="max-w-6xl mx-auto w-full"
          >
            <div className="flex justify-between items-center mb-6">
              <TabsList className="glass-panel">
                <TabsTrigger value="all" className="flex gap-1.5 items-center">
                  <span>All Content</span>
                </TabsTrigger>
                <TabsTrigger value="instagram" className="flex gap-1.5 items-center">
                  <Instagram className="w-4 h-4" />
                  <span className="hidden sm:inline">Instagram</span>
                </TabsTrigger>
                <TabsTrigger value="twitter" className="flex gap-1.5 items-center">
                  <Twitter className="w-4 h-4" />
                  <span className="hidden sm:inline">Twitter</span>
                </TabsTrigger>
                <TabsTrigger value="youtube" className="flex gap-1.5 items-center">
                  <Youtube className="w-4 h-4" />
                  <span className="hidden sm:inline">YouTube</span>
                </TabsTrigger>
                <TabsTrigger value="blog" className="flex gap-1.5 items-center">
                  <FileText className="w-4 h-4" />
                  <span className="hidden sm:inline">Blog</span>
                </TabsTrigger>
                <TabsTrigger value="video" className="flex gap-1.5 items-center">
                  <FileVideo className="w-4 h-4" />
                  <span className="hidden sm:inline">Video</span>
                </TabsTrigger>
              </TabsList>
              
              {content && (
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={handleReset}
                  className="gap-1.5"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  New Content
                </Button>
              )}
            </div>
            
            <ScrollArea className="h-full max-h-[calc(100vh-300px)]">
              <TabsContent value="all" className="m-0">
                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                >
                  <motion.div variants={itemVariants}>
                    <SocialMediaPreview
                      platform="instagram"
                      text={content?.instagram.text || ""}
                      imageUrl={content?.instagram.imageUrl}
                      isLoading={isGenerating}
                    />
                  </motion.div>
                  
                  <motion.div variants={itemVariants}>
                    <SocialMediaPreview
                      platform="twitter"
                      text={content?.twitter.text || ""}
                      imageUrl={content?.twitter.imageUrl}
                      isLoading={isGenerating}
                    />
                  </motion.div>
                  
                  <motion.div variants={itemVariants}>
                    <SocialMediaPreview
                      platform="youtube"
                      text={content?.youtube.title || ""}
                      imageUrl={content?.youtube.thumbnailUrl}
                      isLoading={isGenerating}
                    />
                  </motion.div>
                  
                  <motion.div variants={itemVariants} className="md:col-span-2">
                    <BlogPreview
                      title={content?.blog.title || ""}
                      content={content?.blog.content || ""}
                      isLoading={isGenerating}
                    />
                  </motion.div>
                  
                  <motion.div variants={itemVariants}>
                    <VideoPreview
                      title={content?.video.title || ""}
                      script={content?.video.script || ""}
                      thumbnailUrl={content?.video.thumbnailUrl}
                      isLoading={isGenerating}
                    />
                  </motion.div>
                </motion.div>
              </TabsContent>
              
              <TabsContent value="instagram" className="m-0">
                <SocialMediaPreview
                  platform="instagram"
                  text={content?.instagram.text || ""}
                  imageUrl={content?.instagram.imageUrl}
                  isLoading={isGenerating}
                  className="max-w-xl mx-auto"
                />
              </TabsContent>
              
              <TabsContent value="twitter" className="m-0">
                <SocialMediaPreview
                  platform="twitter"
                  text={content?.twitter.text || ""}
                  imageUrl={content?.twitter.imageUrl}
                  isLoading={isGenerating}
                  className="max-w-xl mx-auto"
                />
              </TabsContent>
              
              <TabsContent value="youtube" className="m-0">
                <SocialMediaPreview
                  platform="youtube"
                  text={content?.youtube.title || ""}
                  imageUrl={content?.youtube.thumbnailUrl}
                  isLoading={isGenerating}
                  className="max-w-xl mx-auto"
                />
              </TabsContent>
              
              <TabsContent value="blog" className="m-0">
                <BlogPreview
                  title={content?.blog.title || ""}
                  content={content?.blog.content || ""}
                  isLoading={isGenerating}
                  className="max-w-3xl mx-auto"
                />
              </TabsContent>
              
              <TabsContent value="video" className="m-0">
                <VideoPreview
                  title={content?.video.title || ""}
                  script={content?.video.script || ""}
                  thumbnailUrl={content?.video.thumbnailUrl}
                  isLoading={isGenerating}
                  className="max-w-xl mx-auto"
                />
              </TabsContent>
            </ScrollArea>
          </Tabs>
        )}
        
        <footer className="mt-auto pt-8">
          <Separator className="mb-6" />
          <div className="text-center text-xs text-muted-foreground">
            <p>Content Creator &copy; {new Date().getFullYear()}</p>
            <p className="mt-1">A minimalist content generation application</p>
          </div>
        </footer>
      </div>
    </>
  );
};

export default Index;
