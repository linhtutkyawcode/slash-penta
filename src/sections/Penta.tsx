import { Button, Avatar } from '@material-tailwind/react';
import { useStore } from '@nanostores/react';
import { useEffect, useState } from 'react';
import { userStore } from '../stores';
import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey:
    import.meta.env.PUBLIC_OPENAI_API_KEY || process.env.PUBLIC_OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

export default function Penta() {
  const $userData = useStore(userStore);
  const [courseData, setCourseData] = useState<string>('');
  const [input, setInput] = useState<string>('');

  const generatePrompt = (
    n: {
      text: string;
      type: '/p' | '/u';
    },
    o?: string
  ) => {
    const initialPrompt = `This is a conversation with an AI called Slash Penta or "/p" created by the Slash Team powered by OpenAI.
      In 2022, the Slash Team is founded by Lin Htuyt Kyaw, a web developer from Padaung, Bago, Myanmar.
      The Slash Team is a growing community but it's critically low on resource.
      In this demo "/Penta" is a helpful ai assistant trying to teach the user how to use git only.
      "/Penta" won't teach user other topic rather than git.
      "/Penta" give the key steps to learn git and will explain each step in detail with example if the user is interested.
      The key steps are : 
        installation,
        making sure git is working, 
        demonstrating important basic commands and concepts each with step by step guides,
        advance usage and flow,
        congratulation for completing the git journey;
      "/Penta" explain a step line by line waiting for the user's response before explaining next step.
      Following is a sample conversation;`;
    return (o || initialPrompt) + n.type + ':' + n.text + '\n';
  };

  const promptToUI = (text: string) => {
    return text
      .slice(text.indexOf('Following is a sample conversation;') + 38)
      .split('/p:')
      .map((msg, index) => {
        if (msg.includes('/u:'))
          return [
            <div
              key={'/p' + index + ':'}
              className="col-start-1 col-end-8 p-3 rounded-lg"
            >
              <div className="flex flex-row items-center">
                <Button
                  variant="text"
                  color="indigo"
                  className="p-1.5 rounded-full"
                >
                  <div className="ring-2 ring-offset-2 ring-indigo-400 flex items-center justify-center h-8 w-8 font-semibold rounded-full bg-indigo-400 flex-shrink-0 text-white">
                    /P
                  </div>
                </Button>
                <div className="relative ml-3 text-sm bg-white py-2 px-4 shadow rounded-xl">
                  <div>{msg.slice(0, msg.indexOf('/u:'))}</div>
                </div>
              </div>
            </div>,
            <div
              key={'/u' + index + ':'}
              className="col-start-6 col-end-13 p-3 rounded-lg"
            >
              <div className="flex items-center justify-start flex-row-reverse">
                <Button
                  variant="text"
                  color="indigo"
                  className="p-1.5 rounded-full"
                >
                  <Avatar
                    src={$userData?.user?.picture}
                    alt={$userData?.user?.name}
                    variant="circular"
                    className="ring-2 ring-offset-2 ring-indigo-400 w-8 h-8"
                  />
                </Button>
                <div className="relative mr-3 text-sm bg-indigo-100 py-2 px-4 shadow rounded-xl">
                  <div>{msg.slice(msg.indexOf('/u:') + 3)}</div>
                </div>
              </div>
            </div>,
          ];
        else
          return (
            <div
              key={'/p' + index + ':'}
              className="col-start-1 col-end-8 p-3 rounded-lg"
            >
              <div className="flex flex-row items-center">
                <Button
                  variant="text"
                  color="indigo"
                  className="p-1.5 rounded-full"
                >
                  <div className="ring-2 ring-offset-2 ring-indigo-400 flex items-center justify-center h-8 w-8 font-semibold rounded-full bg-indigo-400 flex-shrink-0 text-white">
                    /P
                  </div>
                </Button>
                <div className="relative ml-3 text-sm bg-white py-2 px-4 shadow rounded-xl">
                  <div>{msg}</div>
                </div>
              </div>
            </div>
          );
      });
  };

  const hitOpenAIapi = async (prompt: string) => {
    const completion = await openai.createCompletion({
      model: 'text-davinci-003',
      prompt,
      temperature: 0.8,
      max_tokens: 1500,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0.6,
    });

    // Components that are build-time rendered also log to the CLI.
    // When rendered with a client:* directive, they also log to the browser console.

    setCourseData(
      generatePrompt(
        {
          text:
            completion.data.choices[0].text
              ?.trim()
              .slice(
                completion.data.choices[0].text?.trim().lastIndexOf('/p:') + 3
              ) || '/Penta sadly encountered an error.',
          type: '/p',
        },
        prompt
      )
    );
  };
  // ? local storage
  useEffect(() => {
    const courseData = localStorage.getItem('courseData');
    if (courseData) setCourseData(courseData);
    else
      setCourseData(
        generatePrompt(
          {
            text: "I'm here to help you learn how to use git.",
            type: '/p',
          },
          generatePrompt({
            text: 'Hi, I am "/Penta", your personal AI teacher.',
            type: '/p',
          })
        )
      );
  }, []);

  useEffect(() => {
    if (courseData) localStorage.setItem('courseData', courseData);
  }, [courseData]);

  return (
    // <!-- component -->
    <div className="flex h-[calc(100vh-5.4rem)] container max-w-screen-xl antialiased text-gray-800 p-0 px-2 lg:pt-2">
      <div className="flex flex-row h-full w-full overflow-x-hidden p-0">
        <div className="flex flex-col flex-auto h-full p-0">
          <div className="flex flex-col flex-auto flex-shrink-0 rounded-2xl bg-white h-full p-4 m-0 rounded-b-none">
            <div className="flex flex-col h-full overflow-x-auto mb-4">
              <div className="flex flex-col h-full">
                <div className="grid grid-cols-12 gap-y-2">
                  {promptToUI(courseData)}
                </div>
              </div>
            </div>
            <div className="flex flex-row items-center h-16 rounded-xl bg-indigo-300/20 w-full px-4">
              <div>
                <button className="flex items-center justify-center text-gray-400 hover:text-gray-600">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
                    ></path>
                  </svg>
                </button>
              </div>
              <div className="flex-grow ml-4">
                <div className="relative w-full">
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyUp={(e) => {
                      if (e.key === 'Enter') {
                        const prompt = generatePrompt(
                          { text: input, type: '/u' },
                          courseData
                        );
                        setCourseData(prompt);
                        hitOpenAIapi(prompt);
                        setInput('');
                      }
                    }}
                    className="flex w-full border rounded-xl focus:outline-none focus:border-indigo-300 pl-4 h-10"
                  />
                  <button className="absolute flex items-center justify-center h-full w-12 right-0 top-0 text-gray-400 hover:text-gray-600">
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      ></path>
                    </svg>
                  </button>
                </div>
              </div>
              <div className="ml-4">
                <button
                  onClick={() => {
                    const prompt = generatePrompt(
                      { text: input, type: '/u' },
                      courseData
                    );

                    setCourseData(prompt);
                    hitOpenAIapi(prompt);
                    setInput('');
                  }}
                  className="flex items-center justify-center bg-indigo-400 hover:bg-indigo-600 rounded-xl text-white px-4 py-1 flex-shrink-0"
                >
                  <span>Send</span>
                  <span className="ml-2">
                    <svg
                      className="w-4 h-4 transform rotate-45 -mt-px"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                      ></path>
                    </svg>
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
