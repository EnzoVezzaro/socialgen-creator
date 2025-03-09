
// This is a mock content generation service
// In a real application, this would connect to an AI service or backend

export interface GeneratedContent {
  instagram: {
    text: string;
    imageUrl: string;
  };
  twitter: {
    text: string;
    imageUrl: string;
  };
  youtube: {
    title: string;
    description: string;
    thumbnailUrl: string;
  };
  blog: {
    title: string;
    content: string;
  };
  video: {
    title: string;
    script: string;
    thumbnailUrl: string;
  };
}

// Mock image URLs - in a real app these would be generated or from a CDN
const mockImages = {
  instagram: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
  twitter: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
  youtube: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
  video: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
};

// Simple function to create dummy hashtags from the prompt
const generateHashtags = (prompt: string): string => {
  const words = prompt.split(' ')
    .filter(word => word.length > 3)
    .slice(0, 5)
    .map(word => `#${word.toLowerCase().replace(/[^a-z0-9]/g, '')}`);
  
  return words.join(' ');
};

// This simulates an AI content generation process
export const generateContent = async (prompt: string): Promise<GeneratedContent> => {
  // In a real app, this would call an AI service
  // For demo purposes, we'll just return mock content after a delay
  
  return new Promise((resolve) => {
    // Simulate API delay
    setTimeout(() => {
      const content: GeneratedContent = {
        instagram: {
          text: `✨ ${prompt} ✨\n\nExploring new ideas and sharing inspiration. What do you think?\n\n${generateHashtags(prompt)} #inspiration #creativity`,
          imageUrl: mockImages.instagram,
        },
        twitter: {
          text: `Just discovered something amazing about ${prompt}! This changes everything. Thoughts? 🤔`,
          imageUrl: mockImages.twitter,
        },
        youtube: {
          title: `The Ultimate Guide to ${prompt} in 2023`,
          description: `In this video, we explore everything you need to know about ${prompt}. Subscribe for more content like this!`,
          thumbnailUrl: mockImages.youtube,
        },
        blog: {
          title: `Everything You Need to Know About ${prompt}: A Comprehensive Guide`,
          content: `# ${prompt}: The Complete Guide\n\n## Introduction\n\nIn today's fast-paced world, understanding ${prompt} has become increasingly important. Whether you're a beginner or an expert, this guide will help you navigate the complexities of this fascinating topic.\n\n## What is ${prompt}?\n\n${prompt} refers to the innovative approach to solving problems that has gained significant attention in recent years. Its applications span across multiple industries, from technology to healthcare, making it a versatile and valuable concept to master.\n\n## Why ${prompt} Matters\n\nIn an era of rapid technological advancement, ${prompt} stands out as a critical factor in determining success. Organizations that effectively leverage ${prompt} often see improved outcomes, enhanced efficiency, and greater innovation.\n\n## Key Components of ${prompt}\n\n1. **Understanding the basics**: Before diving deep into ${prompt}, it's essential to grasp the fundamental principles that govern it.\n\n2. **Practical applications**: ${prompt} isn't just theoretical—it has real-world applications that can transform how we approach challenges.\n\n3. **Future trends**: As technology evolves, so does ${prompt}. Staying ahead means anticipating how it might change in the coming years.\n\n## How to Implement ${prompt} in Your Work\n\nImplementing ${prompt} requires a strategic approach. Start by identifying areas where it could add value, then gradually integrate it into your existing processes. Remember, the goal isn't to overhaul everything at once but to make thoughtful, incremental improvements.\n\n## Conclusion\n\n${prompt} represents not just a current trend but a fundamental shift in how we approach problems and solutions. By embracing its principles and applications, you position yourself at the forefront of innovation and effectiveness in your field.`,
        },
        video: {
          title: `${prompt} Explained: Everything You Need to Know`,
          script: `INTRO:\n[Upbeat music fades in]\n\nHello everyone, and welcome back to the channel! Today, we're diving deep into ${prompt} - a topic that's been generating a lot of buzz lately.\n\nMAIN CONTENT:\n\nSo, what exactly is ${prompt}? Let's break it down...\n\n[Cut to first key point with on-screen graphics]\n\nFirst, ${prompt} is revolutionizing how we think about everyday problems. It's not just a concept, but a practical approach that's changing industries worldwide.\n\n[Transition to second point]\n\nThe history of ${prompt} is fascinating. It all started when researchers discovered that traditional methods weren't yielding the results they expected. This led to a complete rethinking of the approach.\n\n[Show examples on screen]\n\nHere are some real-world examples of ${prompt} in action. As you can see, the applications are virtually limitless.\n\n[Cut to interview section]\n\nI spoke with several experts in the field, and they all agreed on one thing: ${prompt} is just getting started. The potential for future development is enormous.\n\nCONCLUSION:\n\nSo there you have it - everything you need to know about ${prompt}. If you found this video helpful, please give it a thumbs up and consider subscribing for more content like this.\n\n[Call to action graphics]\n\nDon't forget to hit the notification bell so you don't miss our next video where we'll be exploring related topics even further.\n\n[Outro music fades in]\n\nThanks for watching, and I'll see you in the next one!`,
          thumbnailUrl: mockImages.video,
        },
      };
      
      resolve(content);
    }, 1500); // 1.5 second delay to simulate AI processing
  });
};
