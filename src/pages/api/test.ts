
import { Configuration, OpenAIApi } from 'openai';
const configuration = new Configuration({
  apiKey:
    process.env.PUBLIC_OPENAI_API_KEY || import.meta.env.PUBLIC_OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

export const post: APIRoute = async ({ request }) => {

  if (request.headers.get("Content-Type") === "application/json") {
    const { message } = await request.json();
    const completion = await openai.createCompletion({
    model: 'text-davinci-002',
    prompt: generatePrompt(message),
    temperature: 0.6,
    max_tokens: 150,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0.6,
  });
  
    return new Response(JSON.stringify({ result: completion.data.choices[0].text }), {
      status: 200
    })
  }

  return new Response(null, { status: 400 });
}

function generatePrompt(animal) {
  const capitalizedAnimal =
    animal[0].toUpperCase() + animal.slice(1).toLowerCase();
  return `The following is a conversation with an AI learning assistant. The assistant is helpful, creative, clever, and very friendly.\n\nHuman: Hello, who are you?\nAI: I am an AI created by Slash Team. How can I help you today?\nHuman:${capitalizedAnimal}\nAI:`;
}
