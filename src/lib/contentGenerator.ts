
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

async function generateImage(prompt, apiKey) {
  
  const payload = {
    "prompt": prompt,
    "params": {
      "height": 512,
      "width": 512,
    }
  };

  try {
    const response = await fetch("https://aihorde.net/api/v2/generate/async", {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "apikey": apiKey,
        "Client-Agent": "unknown:0:unknown",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log('Response data:', data);
    
    if (data?.id) {
      // Check the status until the generation is completed
      let statusData;
      let isCompleted = false;

      while (!isCompleted) {
        const statusResponse = await fetch(`https://aihorde.net/api/v2/generate/status/${data.id}`, {
          method: "GET",
          headers: {
            "apikey": apiKey,
          }
        });

        statusData = await statusResponse.json();
        console.log('Checking status...', statusData);
        
        if (statusData?.done === true) {
          isCompleted = true;
          console.log("done: ", statusData);
          const img = statusData.generations[0].img
          return img
        } else if (statusData?.done === false) {
          console.log("Image generation is still in progress...");
          await new Promise(resolve => setTimeout(resolve, parseInt(`${(statusData?.wait_time || 5) * 1000}`))); // Wait 5 seconds before checking again
        } else {
          throw new Error('Image generation failed or status is unknown.');
        }
      }

      return statusData?.image_url; // Get the generated image URL
    } else {
      throw new Error('Failed to initiate image generation.');
    }
  } catch (error) {
    console.error('Error during image generation:', error);
    throw new Error(`Error: ${error.message}`);
  }
}

async function generateText(prompt, apiKey) {
  const payload = {
    "prompt": prompt,
    "params": {
      "max_tokens": 150,  // You can adjust the number of tokens as needed
      "temperature": 0.7, // Controls the creativity of the response
    }
  };

  try {
    const response = await fetch("https://aihorde.net/api/v2/generate/text/async", {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "apikey": apiKey,
        "Client-Agent": "unknown:0:unknown",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log('Response data:', data);
    
    if (data?.id) {
      // Check the status until the generation is completed
      let statusData;
      let isCompleted = false;

      while (!isCompleted) {
        const statusResponse = await fetch(`https://aihorde.net/api/v2/generate/text/status/${data.id}`, {
          method: "GET",
          headers: {
            "apikey": apiKey,
          }
        });

        statusData = await statusResponse.json();
        console.log('Checking status...', statusData);
        
        if (statusData?.done === true) {
          isCompleted = true;
          console.log("done: ", statusData);
          return statusData?.generations[0].text;
        } else if (statusData?.done === false) {
          console.log("Text generation is still in progress...");
          await new Promise(resolve => setTimeout(resolve, parseInt(`${(statusData?.wait_time || 5) * 1000}`))); // Wait 5 seconds before checking again
        } else {
          throw new Error('Text generation failed or status is unknown.');
        }
      }

      return statusData?.generated_text; // Get the generated text
    } else {
      throw new Error('Failed to initiate text generation.');
    }
  } catch (error) {
    console.error('Error during text generation:', error);
    throw new Error(`Error: ${error.message}`);
  }
}

const getRandomItem = <T>(array: T[]): T => {
  return array[Math.floor(Math.random() * array.length)];
};

export const generateContent = async (prompt: string, apiKey: string): Promise<GeneratedContent> => {
  const [aiImage] = await Promise.all([
    generateImage(`Instagram post about ${prompt}`, apiKey),
  ]);
  
  // const aiImage = 'https://a223539ccf6caa2d76459c9727d276e6.r2.cloudflarestorage.com/stable-horde/610050c6-2e99-4d20-b319-5daf8f4f811c.webp?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=246782cc9101762ba914350d8058cd83%2F20250310%2Fauto%2Fs3%2Faws4_request&X-Amz-Date=20250310T151042Z&X-Amz-Expires=1800&X-Amz-SignedHeaders=host&X-Amz-Signature=5e587024a6dcfa6e909df24b6a3d2aa057b5b18dd77ab4275f17e0dfde5d9457'

  const [aiText] = await Promise.all([
    generateText(`Instagram post about ${prompt}`, apiKey),
  ]);

  console.log('aiText: ', aiText);

  const videoUrl = getRandomItem(aiGeneratedVideos);

  return {
    instagram: {
      text: `✨ ${prompt} ✨\n\n${aiText}`,
      imageUrl: aiImage,
    },
    twitter: {
      text: `${prompt}! ${aiText}`,
      imageUrl: aiImage,
    },
    youtube: {
      title: `${prompt}`,
      description: `${aiText}`,
      thumbnailUrl: aiImage,
    },
    blog: {
      title: `${prompt}`,
      content: `${aiText}`,
    },
    video: {
      title: `${prompt}`,
      script: `INTRO:\n${aiText}`,
      thumbnailUrl: aiImage,
      videoUrl: videoUrl,
    },
  };
};
