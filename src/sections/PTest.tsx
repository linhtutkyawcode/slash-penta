import { Button, Input } from '@material-tailwind/react';
import { Configuration, OpenAIApi } from 'openai';
import { useState } from 'react';
const configuration = new Configuration({
  apiKey:
    import.meta.env.PUBLIC_OPENAI_API_KEY || process.env.PUBLIC_OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const PTest = () => {
  const [result, setResult] = useState<string>();
  const [input, setInput] = useState<string>();

  const hitOpenAIapi = async () => {
    const completion = await openai.createCompletion({
      model: 'text-davinci-003',
      prompt: input,
      temperature: 0.8,
      max_tokens: 1500,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0.6,
    });

    // Components that are build-time rendered also log to the CLI.
    // When rendered with a client:* directive, they also log to the browser console.
    console.log(completion);
    setResult(completion.data.choices[0].text);
    setInput((input || '') + completion.data.choices[0].text);
  };
  // Output the result to the page
  return (
    <div>
      <Input
        variant="standard"
        label="Standard"
        value={input}
        onChange={(e) => {
          setInput(e.target.value);
        }}
      />
      <Button
        variant="gradient"
        color="indigo"
        type="submit"
        onClick={hitOpenAIapi}
      >
        GO
      </Button>
      {result}
    </div>
  );
};

function generatePrompt() {
  return `The following is a conversation with an AI teacher named "/Penta" or "Slash Penta" developed by Slash Team.Penta is helpful, creative, clever, and very friendly.\n\nUser: Hello, who are you?\n/Penta: I am "/Penta", I'm here to teach you things you don't know.\nUser:What is git? Teach me how to use it!\n/Penta:`;
}

export default PTest;
