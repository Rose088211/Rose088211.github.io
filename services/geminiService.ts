import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import { BlogPost } from '../types';

const getClient = (): GoogleGenAI => {
    // Ideally this comes from a secure backend for a real app, 
    // but for this static demo we use the env variable directly as requested.
    // The instructions state process.env.API_KEY is available.
    return new GoogleGenAI({ apiKey: process.env.API_KEY });
};

/**
 * Summarizes a specific blog post.
 */
export const summarizePost = async (post: BlogPost): Promise<string> => {
    const ai = getClient();
    try {
        const prompt = `
        You are an expert editor. Please provide a concise, engaging summary (max 3 sentences) of the following blog post.
        Title: ${post.title}
        Content: ${post.content}
        `;

        const response: GenerateContentResponse = await ai.models.generateContent({
            model: 'gemini-3-flash-preview',
            contents: prompt,
        });

        return response.text || "Summary unavailable.";
    } catch (error) {
        console.error("Gemini API Error:", error);
        return "Unable to generate summary at this time. Please check your API key configuration.";
    }
};

/**
 * Chat with the "Author" using the blog posts as knowledge base.
 */
export const chatWithAuthor = async (
    userMessage: string, 
    allPosts: BlogPost[], 
    currentPost?: BlogPost
): Promise<string> => {
    const ai = getClient();
    
    // Construct context
    let context = `You are an AI assistant for a personal blog called "ZenBlog". 
    Your persona is helpful, knowledgeable, and polite.
    You have access to the following blog posts written by the author:
    `;

    allPosts.forEach(p => {
        context += `\n- Title: ${p.title}\n  Summary/Excerpt: ${p.excerpt}\n  Content Snippet: ${p.content.substring(0, 300)}...\n`;
    });

    if (currentPost) {
        context += `\nThe user is currently reading the post titled "${currentPost.title}". The full content is: ${currentPost.content}`;
    }

    const prompt = `
    ${context}
    
    User Question: ${userMessage}
    
    Answer the user's question based on the blog content provided. If the answer isn't in the blog posts, use your general knowledge but mention that the blog hasn't specifically covered it. Keep answers concise.
    `;

    try {
        const response: GenerateContentResponse = await ai.models.generateContent({
            model: 'gemini-3-flash-preview',
            contents: prompt,
        });

        return response.text || "I didn't catch that.";
    } catch (error) {
        console.error("Gemini API Error:", error);
        return "Sorry, I'm having trouble connecting to the AI service right now.";
    }
};