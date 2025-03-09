
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
    videoUrl: string; // Added video URL for actual video content
  };
}

// AI-generated image URLs - in a real app these would come from actual AI image generation
const aiGeneratedImages = {
  instagram: [
    "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1611162616305-c69b3396004b?w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1579762715118-a6f1d4b934f1?w=800&auto=format&fit=crop"
  ],
  twitter: [
    "https://images.unsplash.com/photo-1611605698335-8b1569810432?w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1611944212129-29977ae1398c?w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1560472355-536de3962603?w=800&auto=format&fit=crop"
  ],
  youtube: [
    "https://images.unsplash.com/photo-1611162616475-46b635cb6868?w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1626379953822-baec19c3accd?w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1586092196418-97d2f2d0ff83?w=800&auto=format&fit=crop"
  ],
  video: [
    "https://images.unsplash.com/photo-1618170404473-5e2b3b741de0?w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1618329340733-fe0c1d7df5c5?w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1618169088886-d1091806d5e1?w=800&auto=format&fit=crop"
  ],
};

// Sample AI-generated video URLs 
const aiGeneratedVideos = [
  "https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
  "https://storage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
  "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
];

// Simple function to create dummy hashtags from the prompt
const generateHashtags = (prompt: string): string => {
  const words = prompt.split(' ')
    .filter(word => word.length > 3)
    .slice(0, 5)
    .map(word => `#${word.toLowerCase().replace(/[^a-z0-9]/g, '')}`);
  
  return words.join(' ');
};

// Detect if the prompt is in Spanish (very basic detection)
const isSpanish = (text: string): boolean => {
  const spanishIndicators = ['el', 'la', 'los', 'las', 'un', 'una', 'unos', 'unas', 'y', 'o', 'pero', 'porque', 'como', 'cuando', 'donde', 'qué', 'quién', 'cómo', 'cuándo', 'dónde', 'por qué'];
  const words = text.toLowerCase().split(/\s+/);
  
  // Count how many Spanish indicator words are in the text
  const spanishWordCount = words.filter(word => spanishIndicators.includes(word)).length;
  
  // If more than 2 Spanish indicators or over 15% of words are Spanish indicators, assume it's Spanish
  return spanishWordCount > 2 || (spanishWordCount / words.length > 0.15);
};

// Helper function to get random items from arrays for "AI generation" simulation
const getRandomItem = <T>(array: T[]): T => {
  return array[Math.floor(Math.random() * array.length)];
};

// Generate content based on language detection
const generateContentByLanguage = (prompt: string, isSpanishText: boolean): GeneratedContent => {
  // Get random "AI-generated" images and videos
  const instagramImage = getRandomItem(aiGeneratedImages.instagram);
  const twitterImage = getRandomItem(aiGeneratedImages.twitter);
  const youtubeImage = getRandomItem(aiGeneratedImages.youtube);
  const videoThumbnail = getRandomItem(aiGeneratedImages.video);
  const videoUrl = getRandomItem(aiGeneratedVideos);
  
  if (isSpanishText) {
    return {
      instagram: {
        text: `✨ ${prompt} ✨\n\nExplorando nuevas ideas y compartiendo inspiración. ¿Qué piensas?\n\n${generateHashtags(prompt)} #inspiración #creatividad`,
        imageUrl: instagramImage,
      },
      twitter: {
        text: `¡Acabo de descubrir algo increíble sobre ${prompt}! Esto lo cambia todo. ¿Pensamientos? 🤔`,
        imageUrl: twitterImage,
      },
      youtube: {
        title: `La Guía Definitiva de ${prompt} en 2023`,
        description: `En este video, exploramos todo lo que necesitas saber sobre ${prompt}. ¡Suscríbete para más contenido como este!`,
        thumbnailUrl: youtubeImage,
      },
      blog: {
        title: `Todo lo Que Necesitas Saber Sobre ${prompt}: Una Guía Completa`,
        content: `# ${prompt}: La Guía Completa\n\n## Introducción\n\nEn el mundo acelerado de hoy, entender ${prompt} se ha vuelto cada vez más importante. Ya seas principiante o experto, esta guía te ayudará a navegar por las complejidades de este fascinante tema.\n\n## ¿Qué es ${prompt}?\n\n${prompt} se refiere al enfoque innovador para resolver problemas que ha ganado atención significativa en los últimos años. Sus aplicaciones abarcan múltiples industrias, desde tecnología hasta salud, haciéndolo un concepto versátil y valioso para dominar.\n\n## Por qué ${prompt} es Importante\n\nEn una era de rápido avance tecnológico, ${prompt} destaca como un factor crítico para determinar el éxito. Las organizaciones que aprovechan eficazmente ${prompt} a menudo ven mejores resultados, mayor eficiencia y mayor innovación.\n\n## Componentes Clave de ${prompt}\n\n1. **Entender los fundamentos**: Antes de profundizar en ${prompt}, es esencial comprender los principios fundamentales que lo rigen.\n\n2. **Aplicaciones prácticas**: ${prompt} no es solo teórico—tiene aplicaciones del mundo real que pueden transformar cómo abordamos los desafíos.\n\n3. **Tendencias futuras**: A medida que la tecnología evoluciona, también lo hace ${prompt}. Mantenerse adelante significa anticipar cómo podría cambiar en los próximos años.\n\n## Cómo Implementar ${prompt} en Tu Trabajo\n\nImplementar ${prompt} requiere un enfoque estratégico. Comienza identificando áreas donde podría agregar valor, luego intégralo gradualmente en tus procesos existentes. Recuerda, el objetivo no es modificar todo de una vez, sino hacer mejoras incrementales y reflexivas.\n\n## Conclusión\n\n${prompt} representa no solo una tendencia actual sino un cambio fundamental en cómo abordamos problemas y soluciones. Al adoptar sus principios y aplicaciones, te posicionas a la vanguardia de la innovación y la efectividad en tu campo.`,
      },
      video: {
        title: `${prompt} Explicado: Todo lo Que Necesitas Saber`,
        script: `INTRO:\n[Música animada se desvanece]\n\n¡Hola a todos, y bienvenidos de nuevo al canal! Hoy, vamos a profundizar en ${prompt} - un tema que ha estado generando mucho interés últimamente.\n\nCONTENIDO PRINCIPAL:\n\nEntonces, ¿qué es exactamente ${prompt}? Vamos a desglosarlo...\n\n[Corte al primer punto clave con gráficos en pantalla]\n\nPrimero, ${prompt} está revolucionando cómo pensamos sobre los problemas cotidianos. No es solo un concepto, sino un enfoque práctico que está cambiando industrias en todo el mundo.\n\n[Transición al segundo punto]\n\nLa historia de ${prompt} es fascinante. Todo comenzó cuando los investigadores descubrieron que los métodos tradicionales no estaban produciendo los resultados que esperaban. Esto llevó a un replanteamiento completo del enfoque.\n\n[Mostrar ejemplos en pantalla]\n\nAquí hay algunos ejemplos del mundo real de ${prompt} en acción. Como pueden ver, las aplicaciones son prácticamente ilimitadas.\n\n[Corte a la sección de entrevista]\n\nHablé con varios expertos en el campo, y todos coincidieron en una cosa: ${prompt} apenas está comenzando. El potencial para el desarrollo futuro es enorme.\n\nCONCLUSIÓN:\n\nAsí que ahí lo tienen - todo lo que necesitan saber sobre ${prompt}. Si encontraron útil este video, por favor denle me gusta y consideren suscribirse para más contenido como este.\n\n[Gráficos de llamada a la acción]\n\nNo olviden activar las notificaciones para no perderse nuestro próximo video donde exploraremos temas relacionados aún más a fondo.\n\n[La música de salida se desvanece]\n\n¡Gracias por ver, y nos vemos en el próximo!`,
        thumbnailUrl: videoThumbnail,
        videoUrl: videoUrl,
      },
    };
  } else {
    // Default to English
    return {
      instagram: {
        text: `✨ ${prompt} ✨\n\nExploring new ideas and sharing inspiration. What do you think?\n\n${generateHashtags(prompt)} #inspiration #creativity`,
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
        content: `# ${prompt}: The Complete Guide\n\n## Introduction\n\nIn today's fast-paced world, understanding ${prompt} has become increasingly important. Whether you're a beginner or an expert, this guide will help you navigate the complexities of this fascinating topic.\n\n## What is ${prompt}?\n\n${prompt} refers to the innovative approach to solving problems that has gained significant attention in recent years. Its applications span across multiple industries, from technology to healthcare, making it a versatile and valuable concept to master.\n\n## Why ${prompt} Matters\n\nIn an era of rapid technological advancement, ${prompt} stands out as a critical factor in determining success. Organizations that effectively leverage ${prompt} often see improved outcomes, enhanced efficiency, and greater innovation.\n\n## Key Components of ${prompt}\n\n1. **Understanding the basics**: Before diving deep into ${prompt}, it's essential to grasp the fundamental principles that govern it.\n\n2. **Practical applications**: ${prompt} isn't just theoretical—it has real-world applications that can transform how we approach challenges.\n\n3. **Future trends**: As technology evolves, so does ${prompt}. Staying ahead means anticipating how it might change in the coming years.\n\n## How to Implement ${prompt} in Your Work\n\nImplementing ${prompt} requires a strategic approach. Start by identifying areas where it could add value, then gradually integrate it into your existing processes. Remember, the goal isn't to overhaul everything at once but to make thoughtful, incremental improvements.\n\n## Conclusion\n\n${prompt} represents not just a current trend but a fundamental shift in how we approach problems and solutions. By embracing its principles and applications, you position yourself at the forefront of innovation and effectiveness in your field.`,
      },
      video: {
        title: `${prompt} Explained: Everything You Need to Know`,
        script: `INTRO:\n[Upbeat music fades in]\n\nHello everyone, and welcome back to the channel! Today, we're diving deep into ${prompt} - a topic that's been generating a lot of buzz lately.\n\nMAIN CONTENT:\n\nSo, what exactly is ${prompt}? Let's break it down...\n\n[Cut to first key point with on-screen graphics]\n\nFirst, ${prompt} is revolutionizing how we think about everyday problems. It's not just a concept, but a practical approach that's changing industries worldwide.\n\n[Transition to second point]\n\nThe history of ${prompt} is fascinating. It all started when researchers discovered that traditional methods weren't yielding the results they expected. This led to a complete rethinking of the approach.\n\n[Show examples on screen]\n\nHere are some real-world examples of ${prompt} in action. As you can see, the applications are virtually limitless.\n\n[Cut to interview section]\n\nI spoke with several experts in the field, and they all agreed on one thing: ${prompt} is just getting started. The potential for future development is enormous.\n\nCONCLUSION:\n\nSo there you have it - everything you need to know about ${prompt}. If you found this video helpful, please give it a thumbs up and consider subscribing for more content like this.\n\n[Call to action graphics]\n\nDon't forget to hit the notification bell so you don't miss our next video where we'll be exploring related topics even further.\n\n[Outro music fades in]\n\nThanks for watching, and I'll see you in the next one!`,
        thumbnailUrl: videoThumbnail,
        videoUrl: videoUrl,
      },
    };
  }
};

// This simulates an AI content generation process
export const generateContent = async (prompt: string): Promise<GeneratedContent> => {
  // In a real app, this would call an AI service
  // For demo purposes, we'll just return mock content after a delay
  
  return new Promise((resolve) => {
    // Detect language
    const isSpanishText = isSpanish(prompt);
    
    // Simulate AI processing delay with a "thinking" time
    setTimeout(() => {
      const content = generateContentByLanguage(prompt, isSpanishText);
      resolve(content);
    }, 1500); // 1.5 second delay to simulate AI processing
  });
};
