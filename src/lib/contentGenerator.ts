
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
    videoUrl: string;
  };
}

const aiGeneratedVideos = [
  "https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
  "https://storage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
  "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
];

async function generateImage(prompt) {
  const OPENAI_API_KEY = 'XXX'
  const response = await fetch("https://api.openai.com/v1/images/generations", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      prompt: prompt,
      n: 1, // Generate 1 image
      size: "1024x1024", // Adjust size as needed
    }),
  });

  const data = await response.json();
  return data.data[0]?.url; // Get the first generated image URL
}

const getRandomItem = <T>(array: T[]): T => {
  return array[Math.floor(Math.random() * array.length)];
};

export const generateContent = async (prompt: string): Promise<GeneratedContent> => {
  const [instagramImage, twitterImage, youtubeImage, videoThumbnail] = await Promise.all([
    generateImage(`Instagram post about ${prompt}`),
    generateImage(`Twitter post about ${prompt}`),
    generateImage(`YouTube thumbnail about ${prompt}`),
    generateImage(`Video thumbnail about ${prompt}`),
  ]);

  const videoUrl = getRandomItem(aiGeneratedVideos);

  return {
    instagram: {
      text: `✨ ${prompt} ✨\n\nExploring new ideas and sharing inspiration. What do you think?`,
      imageUrl: instagramImage,
    },
    twitter: {
      text: `Just discovered something amazing about ${prompt}! This changes everything. Thoughts? 🤔`,
      imageUrl: twitterImage,
    },
    youtube: {
      title: `The Ultimate Guide to ${prompt} in 2023`,
      description: `In this video, we explore everything you need to know about ${prompt}. Subscribe for more content like this!`,
      thumbnailUrl: youtubeImage,
    },
    blog: {
      title: `Everything You Need to Know About ${prompt}: A Comprehensive Guide`,
      content: `# ${prompt}: The Complete Guide\n\n## Introduction\n\nIn today's fast-paced world, understanding ${prompt} has become increasingly important...`,
    },
    video: {
      title: `${prompt} Explained: Everything You Need to Know`,
      script: `INTRO:\n[Upbeat music fades in]\n\nHey everyone, welcome back to the channel! Today, we're diving deep into ${prompt}...`,
      thumbnailUrl: videoThumbnail,
      videoUrl: videoUrl,
    },
  };
};
