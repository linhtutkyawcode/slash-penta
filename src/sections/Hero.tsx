import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from '@material-tailwind/react';

export default function Hero() {
  return (
    <section className="mx-2">
      <Card className="w-full mt-8">
        <CardHeader
          color="indigo"
          className="relative !h-[12rem] sm:!h-[18rem] md:!h-[22rem] lg:!h-[25rem]"
        >
          <div
            id="large-header"
            className="absolute large-header object-cover z-10"
          >
            <canvas id="demo-canvas"></canvas>
          </div>
          <img
            src="/images/bg-2.jpg"
            alt="img-blur-shadow"
            className="h-full w-full object-cover object-[10%,82%] bg-blend-soft-light opacity-80 absolute top-0 z-0"
          />
        </CardHeader>
        <CardBody className="container max-w-screen-xl mx-auto">
          {/* <!-- hero --> */}
          <section className="pt-4 lg:pt-8 bg-white">
            <div className="md:px-8 lg:px-12 sm:px-6 mx-auto max-w-7xl">
              <div className="w-full mx-auto text-left md:w-11/12 xl:w-9/12 md:text-center">
                <h1 className="mb-8 text-4xl font-extrabold leading-none tracking-normal text-gray-900 md:text-6xl md:tracking-tight">
                  <span>A new</span>{' '}
                  <span className="block w-full py-2 text-transparent bg-clip-text leading-12 bg-gradient-to-r from-indigo-500 to-purple-500 lg:inline">
                    AI-Assisted
                  </span>{' '}
                  <span>learning platform starting up in Myanmar.</span>
                </h1>
                <p className="px-0 mb-2 text-lg text-gray-600 md:text-xl lg:px-24">
                  Learning is the key to success. Yet, it's not always an easy
                  process. Here's the revolutionary learning platform to solve
                  just that problem.
                </p>
                <div className="my-4">
                  <code> easy learning = easy solving </code>
                </div>
                <div className="mb-4 mt-2 space-x-0 md:space-x-2 md:mb-8">
                  <a href="#_">
                    <Button
                      variant="gradient"
                      color="indigo"
                      size="lg"
                      className="inline-flex items-center justify-center w-full px-6 py-3 mb-2 text-lg bg-gray-100 rounded-2xl sm:w-auto sm:mb-0 capitalize"
                    >
                      Get started
                      <svg
                        className="w-4 h-4 ml-1"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                    </Button>
                  </a>
                  <a href="#_">
                    <Button
                      variant="text"
                      color="blue-gray"
                      size="lg"
                      className="inline-flex items-center justify-center w-full px-6 py-3 mb-2 text-lg bg-gray-100 rounded-2xl sm:w-auto sm:mb-0 capitalize"
                    >
                      Learn More
                      <svg
                        className="w-4 h-4 ml-1"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                        ></path>
                      </svg>
                    </Button>
                  </a>
                </div>
              </div>
              <a
                href="/course-demo"
                className="w-full mx-auto mt-20 text-center md:w-10/12 text-white"
              >
                <div className="relative z-0 w-full mt-8">
                  <div className="flex items-center flex-none px-4 h-11 bg-indigo-500 shadow-sm rounded-b-none rounded-xl">
                    <div className="flex mr-4 space-x-1.5">
                      <div className="w-3 h-3 border-2 border-white rounded-full"></div>
                      <div className="w-3 h-3 border-2 border-white rounded-full"></div>
                      <div className="w-3 h-3 border-2 border-white rounded-full"></div>
                    </div>
                    Learn Git : Demo
                  </div>
                  <div className="relative overflow-hidden shadow-2xl rounded-b-xl">
                    <img
                      src="images/bg-4.jpg"
                      className="hover:scale-105 duration-500"
                    />
                  </div>
                </div>
              </a>
            </div>
          </section>
        </CardBody>
        <CardFooter divider className="flex items-center justify-between py-3">
          <Typography variant="small">Slash Team</Typography>
          <Typography variant="small" color="gray" className="flex gap-1">
            <i className="fas fa-map-marker-alt fa-sm mt-[3px]" />
            Pyay, Bago, Myanmar
          </Typography>
        </CardFooter>
      </Card>
    </section>
  );
}
