import React from 'react';
import SignupForm from './form/SignupForm';
import CookieConsent from './CookieConsent';

export default function Homepage() {
  return (
    <div className="min-h-screen bg-white w-full">
      <div className="w-full grid grid-cols-1 md:grid-cols-[2fr_1fr] min-h-[500px] items-center max-w-7xl px-4 m-auto py-[60px] z-10">
        <div className="md: pr-10">
          <h1 className="text-black text-5xl md:text-8xl font-bold font-grotesk_bold">
            Tool to make your social bio a powerful lead generator
          </h1>
          <p className="text-black text-2xl mt-8 font-light">
            Motorlinks.io allows car & machinery sales professionals and
            amateurs generate leads through their Instagram or Twitter bio. Get
            started for free. No credit card required!
          </p>
          <div className="mt-8">
            <SignupForm />
          </div>
        </div>
        <div className="flex-shrink-0 w-full items-center justify-center min-h-[615px] flex">
          <div className="min-h-[500px] flex items-center">
            <div>
              <a
                className="mt-5 xs:visible"
                href="https://www.producthunt.com/posts/motorlinks-io?utm_source=badge-featured&utm_medium=badge&utm_souce=badge-motorlinks&#0045;io"
                target="_blank"
              >
                <img
                  src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=378986&theme=light"
                  alt="Motorlinks&#0046;io - Generate&#0032;leads&#0032;through&#0032;your&#0032;social&#0032;bio | Product Hunt"
                  width="250"
                  height="54"
                />
              </a>
              <img src="/demo1.png" alt="" />
              {/* <p className='text-black text-3xl mb-4 font-medium'>More leads</p>
            <ul className='text-black text-xl'>
                <li className='flex gap-2 items-center mb-2'>Showcase cars you are selling</li>
                <li className='flex gap-2 items-center mb-2'>Professional look</li>
                <li className='flex gap-2 items-center mb-2'>Collect email adresses</li>
                <li className='flex gap-2 items-center mb-2'>Highly customizable</li>
                <li className='flex gap-2 items-center mb-2'>Many integration possibilities</li>
            </ul> */}
            </div>
          </div>
        </div>
      </div>
      {/* <div className='mx-auto max-w-7xl pt-4 pb-12 px-4 sm:px-6 lg:px-8 opacity-50 text-center'>
            <p className='text-black mb-8'>In collaboration with:</p>
            <div className='grid grid-cols-2 gap-8 md:grid-cols-6 lg:grid-cols-5'>
                <div className='col-span-1 flex justify-center md:col-span-2 lg:col-span-1'>
                    <img className='h-12 object-contain' src="./autolle.png" alt="" />
                </div>
                <div className='col-span-1 flex justify-center md:col-span-2 lg:col-span-1'>
                    <img className='h-12 object-contain' src="/kamux.png" alt="" />
                </div>
                <div className='col-span-1 flex justify-center md:col-span-2 lg:col-span-1 text-black'>
                    <img className='h-12 object-contain' src="/saka.png" alt="" />
                </div>
                <div className='col-span-1 flex justify-center md:col-span-2 lg:col-span-1'>
                    <img className='h-12 object-contain' src="./xbil.png" alt="" />
                </div>
                <div className='col-span-1 flex justify-center md:col-span-2 lg:col-span-1'>
                    <img className='h-12 object-contain' src="./scc.png" alt="" />
                </div>
            </div>
        </div> */}
      <div id="features">
        <div className="w-full max-w-6xl px-4 md:px-8 m-auto py-[40px] md:py-[60px]">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 min-h-[300px]">
            <div className="flex items-center">
              <div>
                <h2 className="text-black text-3xl md:text-6xl font-bold font-grotesk_bold text-center md:text-left">
                  Made for leads
                </h2>
                <p className="text-black text-2xl mt-8 text-center md:text-left font-light">
                  While there is other solutions for displaying links in your
                  bio, motorlinks.io is made for boosting car sales and catching
                  possible car buyers. Special tools optimized for automotive
                  professionals and getting leads.
                </p>
              </div>
            </div>
            <div className="flex items-center justify-center md:justify-end">
              <div className="w-full max-w-[350px] m-auto">
                <div className="w-full max-w-[350px]">
                  <p className=" text-stone-500 mb-4 text-center">
                    Other link tools
                  </p>
                  <div className="bg-white rounded-full p-1 text-center w-full font-medium flex items-center shadow-lg">
                    <div className="flex-shrink-0 rounded-full w-8 h-8 overflow-hidden"></div>
                    <div className="text-black px-2 text-center w-full -ml-4">
                      Audi A6 avant 3.0
                    </div>
                  </div>
                </div>
                <div className="w-full max-w-[350px] mt-8">
                  <p className="text-stone-500 text-center mb-4">
                    With Motorlinks.io
                  </p>
                  <div className="shadow-lg">
                    <div className="h-[150px] overflow-hidden rounded-t-md relative">
                      <img src="/volvo.jpeg" alt="" />
                      <span className="absolute py-1 px-2 top-2 left-2 rounded-full bg-stone-800 text-white text-xs z-10">
                        58 725€
                      </span>
                    </div>
                    <div className="h-full p-2 rounded-b-md bg-white">
                      <p className="text-md font-bold leading-none text-black">
                        Volvo XC60
                      </p>
                      <p className="text-xs text-stone-400 mt-1">
                        T8 AWD Long Range High Performance Plus Bright Edition
                        aut
                      </p>
                      <p className="jsx-902cb4503c8a7a8 text-[10px] text-stone-500 mt-2 flex gap-2">
                        <span className="jsx-902cb4503c8a7a8 px-[6px] py-[3px] bg-stone-100 rounded-md flex gap-1 items-center">
                          Hybrid
                        </span>
                        <span className="jsx-902cb4503c8a7a8 px-[6px] py-[3px] bg-stone-100 rounded-md flex gap-1 items-center">
                          Family
                        </span>
                        <span className="jsx-902cb4503c8a7a8 px-[6px] py-[3px] bg-stone-100 rounded-md flex gap-1 items-center">
                          4WD
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full max-w-6xl px-4 md:px-8 m-auto py-[40px] md:py-[60px]">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 min-h-[300px]">
            <div className="flex items-center justify-center md:justify-end">
              <div className="w-full max-w-[350px] m-auto">
                <div className="w-full max-w-[350px] shadow-lg">
                  <img src="/nocode.svg" alt="No coding required" />
                </div>
                <div className="w-full max-w-[350px] mt-8"></div>
              </div>
            </div>
            <div className="flex items-center">
              <div>
                <h2 className="text-black text-3xl md:text-6xl font-bold font-grotesk_bold text-center md:text-left">
                  No coding required
                </h2>
                <p className="text-black text-2xl mt-8 text-center md:text-left font-light">
                  A car salesperson has most likely no interest in coding.
                  That's why we handle the technology side and let you focus on
                  your expertise with cars.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full max-w-6xl px-4 md:px-8 m-auto py-[40px] md:py-[60px]">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 min-h-[300px]">
            <div className="flex items-center">
              <div>
                <h2 className="text-black text-3xl md:text-6xl font-bold font-grotesk_bold text-center md:text-left">
                  Fast setup
                </h2>
                <p className="text-black text-2xl mt-8 text-center md:text-left font-light">
                  Not only you can create great looking pages and capture leads.
                  You can do this in minutes. Build and publish in as low as 5
                  minutes.
                </p>
              </div>
            </div>
            <div className="flex items-center justify-center md:justify-end">
              <div className="w-full max-w-[350px] m-auto">
                <div className="w-full max-w-[350px]">
                  <img src="/lightning.svg" alt="Lightning" />
                </div>
                <div className="w-full max-w-[350px] mt-8"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div id="pricing" className="w-full bg-[rgba(0,0,0,0.05)] mt-20">
        <div className="w-full max-w-6xl px-4 md:px-8 m-auto py-[40px] md:py-[60px]">
          <h2 className="text-black text-3xl md:text-6xl text-center font-bold font-grotesk_bold mb-8">
            Pricing
          </h2>
          <p className="text-stone-500 text-2xl text-center font-light">
            Get started for free. No credit card required. Upgrade anytime.
          </p>
          <div className="mt-8 md:mt-16 space-y-12 lg:grid lg:grid-cols-3 lg:gap-x-8 lg:space-y-0">
            <div className="relative flex flex-col rounded-md bg-white p-4">
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-gray-900">Free</h3>
                <p className="mt-4 flex items-baseline text-gray-900">
                  <span className="text-5xl font-bold tracking-tight">0€</span>
                  <span className="ml-1 text-xl font-semibold">/month</span>
                </p>
                <p className="mt-6 text-gray-500">
                  All you need for a clean build. Free forever.
                </p>
                <ul className="text-black mt-6 space-y-4">
                  <li className="flex">
                    <svg
                      className="h-6 w-6 flex-shrink-0 mr-2 text-black"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                    >
                      <path d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z" />
                    </svg>
                    <span>One project</span>
                  </li>
                  <li className="flex">
                    <svg
                      className="h-6 w-6 flex-shrink-0 mr-2 text-black"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                    >
                      <path d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z" />
                    </svg>
                    <span>Custom colors</span>
                  </li>
                  <li className="flex">
                    <svg
                      className="h-6 w-6 flex-shrink-0 mr-2 text-black"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                    >
                      <path d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z" />
                    </svg>
                    <span>Basic themes</span>
                  </li>
                  <li className="flex">
                    <svg
                      className="h-6 w-6 flex-shrink-0 mr-2 text-black"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                    >
                      <path d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z" />
                    </svg>
                    <span>SEO-optimized</span>
                  </li>
                </ul>
              </div>
              <a
                className="bg-white border-black border text-black mt-8 block w-full py-3 px-6 rounded-md text-center font-medium"
                href=""
              >
                Coming soon
              </a>
            </div>
            <div className="relative flex flex-col rounded-md bg-white p-4">
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-gray-900">Premium</h3>
                <p className="absolute top-3 right-3 transform rounded-full bg-black py-1.5 px-4 text-sm font-semibold text-white">
                  Recommended
                </p>
                <p className="mt-4 flex items-baseline text-gray-900">
                  <span className="text-5xl font-bold tracking-tight">13€</span>
                  <span className="ml-1 text-xl font-semibold">/month</span>
                </p>
                <p className="mt-6 text-gray-500">
                  Recommended for professionals. High value for mediocre price.
                </p>
                <ul className="text-black mt-6 space-y-4">
                  <li className="flex">
                    <svg
                      className="h-6 w-6 flex-shrink-0 mr-2 text-black"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                    >
                      <path d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z" />
                    </svg>
                    <span>3 projects</span>
                  </li>
                  <li className="flex">
                    <svg
                      className="h-6 w-6 flex-shrink-0 mr-2 text-black"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                    >
                      <path d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z" />
                    </svg>
                    <span>Video embed</span>
                  </li>
                  <li className="flex">
                    <svg
                      className="h-6 w-6 flex-shrink-0 mr-2 text-black"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                    >
                      <path d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z" />
                    </svg>
                    <span>Remove our motorlinks.io branding</span>
                  </li>
                  <li className="flex">
                    <svg
                      className="h-6 w-6 flex-shrink-0 mr-2 text-black"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                    >
                      <path d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z" />
                    </svg>
                    <span>Special quick-contact options</span>
                  </li>
                </ul>
              </div>
              <a
                className="bg-black border-black border text-white mt-8 block w-full py-3 px-6 rounded-md text-center font-medium"
                href=""
              >
                Coming soon
              </a>
            </div>
            <div className="relative flex flex-col rounded-md bg-white p-4">
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-gray-900">
                  Professional
                </h3>
                <p className="mt-4 flex items-baseline text-gray-900">
                  <span className="text-5xl font-bold tracking-tight">25€</span>
                  <span className="ml-1 text-xl font-semibold">/month</span>
                </p>
                <p className="mt-6 text-gray-500">
                  Access everything we provide. For people who want the best.
                </p>
                <ul className="text-black mt-6 space-y-4">
                  <li className="flex">
                    <svg
                      className="h-6 w-6 flex-shrink-0 mr-2 text-black"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                    >
                      <path d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z" />
                    </svg>
                    <span>All premium and free features</span>
                  </li>
                  <li className="flex">
                    <svg
                      className="h-6 w-6 flex-shrink-0 mr-2 text-black"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                    >
                      <path d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z" />
                    </svg>
                    <span>10 projects</span>
                  </li>
                  <li className="flex">
                    <svg
                      className="h-6 w-6 flex-shrink-0 mr-2 text-black"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                    >
                      <path d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z" />
                    </svg>
                    <span>Dedicated support</span>
                  </li>
                  <li className="flex">
                    <svg
                      className="h-6 w-6 flex-shrink-0 mr-2 text-black"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                    >
                      <path d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z" />
                    </svg>
                    <span>
                      Pro integrations( Zapier, Mailchimp, Monday.com... )
                    </span>
                  </li>
                  <li className="flex">
                    <svg
                      className="h-6 w-6 flex-shrink-0 mr-2 text-black"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                    >
                      <path d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z" />
                    </svg>
                    <span>Custom domains</span>
                  </li>
                  <li className="flex">
                    <svg
                      className="h-6 w-6 flex-shrink-0 mr-2 text-black"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                    >
                      <path d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z" />
                    </svg>
                    <span>Custom wallpaper</span>
                  </li>
                  <li className="flex">
                    <svg
                      className="h-6 w-6 flex-shrink-0 mr-2 text-black"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                    >
                      <path d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z" />
                    </svg>
                    <span>Analytics</span>
                  </li>
                </ul>
              </div>
              <a
                className="bg-white border-black border text-black mt-8 block w-full py-3 px-6 rounded-md text-center font-medium"
                href=""
              >
                Coming soon
              </a>
            </div>
          </div>
          <div className="relative flex flex-col rounded-md bg-black p-4 mt-4">
            <div className="flex-1">
              <h3 className="text-xl font-semibold text-white">Enterprise</h3>
              <p className="mt-4 flex items-baseline text-white">
                <span className="text-5xl font-bold tracking-tight">
                  From 200€
                </span>
                <span className="ml-1 text-xl font-semibold">/month</span>
              </p>
              <p className="mt-6 text-gray-500">
                Unlock powerful features to get you sales team more leads and
                more sales.
              </p>
              <ul className="text-white mt-6 space-y-4">
                <li className="flex">
                  <img
                    className="h-6 w-6 flex-shrink-0 mr-2"
                    src="/checkwhite.png"
                    alt="Checkmark"
                  />
                  <span>Custom project limits & seats for all your team</span>
                </li>
                <li className="flex">
                  <img
                    className="h-6 w-6 flex-shrink-0 mr-2"
                    src="/checkwhite.png"
                    alt="Checkmark"
                  />
                  <span>VIP support</span>
                </li>
                <li className="flex">
                  <img
                    className="h-6 w-6 flex-shrink-0 mr-2"
                    src="/checkwhite.png"
                    alt="Checkmark"
                  />
                  <span>HIPAA and GDPR compliance</span>
                </li>
                <li className="flex">
                  <img
                    className="h-6 w-6 flex-shrink-0 mr-2"
                    src="/checkwhite.png"
                    alt="Checkmark"
                  />
                  <span>Every feature we offer now and in the future</span>
                </li>
              </ul>
            </div>
            <a
              className="bg-black border-white border text-white mt-8 block w-full py-3 px-6 rounded-md text-center font-medium"
              href=""
            >
              Contact sales
            </a>
          </div>
        </div>
      </div>
      <CookieConsent />
    </div>
  );
}
