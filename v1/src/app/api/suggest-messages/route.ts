import { google } from "@ai-sdk/google";
import { generateText } from "ai";
import { NextResponse } from "next/server";

// Load API Key from environment variables
const API_KEY = process.env.GOOGLE_GENERATIVE_AI_API_KEY;

// Define the prompt inside the backend
const PROMPT = 
  "Create a list of three open-ended and engaging questions formatted as a single string. Each question should be separated by '||'. These questions are for an anonymous social messaging platform, like Qooh.me, and should be suitable for a diverse audience. Avoid personal or sensitive topics, focusing instead on universal themes that encourage friendly interaction. For example, your output should be structured like this: 'What’s a hobby you’ve recently started?||If you could have dinner with any historical figure, who would it be?||What’s a simple thing that makes you happy?'. Ensure the questions are intriguing, foster curiosity, and contribute to a positive and welcoming conversational environment.";

// export async function POST(req: Request) {
export async function POST() {
  if (!API_KEY) {
    return NextResponse.json({ error: "Missing API Key" }, { status: 500 });
  }

  try {
    // Initialize the Gemini model
   
    const model = google("gemini-1.5-pro-latest");

    // Generate AI response using the fixed prompt
    console.log("loding...")
    const { text } = await generateText({
      model,
      prompt: PROMPT, // Using the predefined prompt instead of reading from the request
    });
    console.log("Generated Response:", text);

    return NextResponse.json({ response: text });
  } catch (error) {
    console.error("Error generating AI response:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

// using openAi
// import OpenAI from 'openai';
// import { OpenAIStream, StreamingTextResponse } from 'ai';
// import { NextResponse } from 'next/server';

// const openai = new OpenAI({
//   apiKey: process.env.OPENAI_API_KEY,
// });

// export const runtime = 'edge';

// export async function POST(req: Request) {
//   try {
//     const prompt =
//       "Create a list of three open-ended and engaging questions formatted as a single string. Each question should be separated by '||'. These questions are for an anonymous social messaging platform, like Qooh.me, and should be suitable for a diverse audience. Avoid personal or sensitive topics, focusing instead on universal themes that encourage friendly interaction. For example, your output should be structured like this: 'What’s a hobby you’ve recently started?||If you could have dinner with any historical figure, who would it be?||What’s a simple thing that makes you happy?'. Ensure the questions are intriguing, foster curiosity, and contribute to a positive and welcoming conversational environment.";

//     const response = await openai.completions.create({
//       model: 'gpt-3.5-turbo-instruct',
//       max_tokens: 400,
//       stream: true,
//       prompt,
//     });

//     const stream = OpenAIStream(response);
    
    
//     return new StreamingTextResponse(stream);
//   } catch (error) {
//     if (error instanceof OpenAI.APIError) {
//       // OpenAI API error handling
//       const { name, status, headers, message } = error;
//       return NextResponse.json({ name, status, headers, message }, { status });
//     } else {
//       // General error handling
//       console.error('An unexpected error occurred:', error);
//       throw error;
//     }
//   }
// }