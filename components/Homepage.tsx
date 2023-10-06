import React from 'react';
import SignupForm from './form/SignupForm';
import CookieConsent from './CookieConsent';

export default function Homepage() {
  return (
    <div className="min-h-screen bg-white w-full">
      <div className="w-full grid grid-cols-1 md:grid-cols-[2fr_1fr] min-h-[500px] items-center max-w-7xl px-4 m-auto py-[60px] z-10">
        <div className="md: pr-10">
          <h1 className="text-black text-5xl md:text-8xl font-bold font-grotesk_bold">
            Flexible endurance performance
          </h1>
          <p className="text-black text-2xl mt-8 font-light">
            We bring high performance coaching available to regular people. We
            make regular people special.
          </p>
        </div>
        <div className="flex-shrink-0 w-full items-center justify-center min-h-[615px] flex">
          <div className="min-h-[500px] flex items-center">
            <div>
              <img src="/funk.png" alt="" />
              <p className="text-black text-2xl mt-8 font-light">
                2023 July training camp in Livigno. Photo with Ironman 70.3 Vice
                World-Champion Frederik Funk
              </p>{' '}
            </div>
          </div>
        </div>
      </div>
      <div className="flex overflow-hidden">
        <img className="max-w-[650px]" src="/kisa1.jpg" alt="" />
        <img className="max-w-[350px]" src="/pyry.jpg" alt="" />
        <img className="max-w-[800px]" src="/kisa2.jpg" alt="" />
        <img className="max-w-[350px]" src="/pyry.jpg" alt="" />
        <img className="max-w-[350px]" src="/pyry.jpg" alt="" />
      </div>
      <div id="features">
        <div className="w-full max-w-6xl px-4 md:px-8 m-auto py-[40px] md:py-[60px]">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 min-h-[300px]">
            <div className="flex items-center">
              <div>
                <h2 className="text-black text-3xl md:text-6xl font-bold font-grotesk_bold text-center md:text-left">
                  Tailored for you
                </h2>
                <p className="text-black text-2xl mt-8 text-center md:text-left font-light">
                  We create training plans for whatever you goals are. Whether
                  it's a marathon or just a better shape overall we got you
                  covered. If your plans change and you can't do training we can
                  change the plan quickly and avoid any problems with overload.
                </p>
              </div>
            </div>
            <div className="flex items-center justify-center md:justify-end">
              <div className="w-full max-w-[350px] m-auto">
                <div className="w-full max-w-[350px] mt-8">
                  <img src="/lotto.png" alt="" />
                  <p className="text-black text-2xl mt-8 font-light">
                    Training session in Swiss alps with Lotto-Dstny Development
                    team
                  </p>{' '}
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
                  <img src="/science.jpg" alt="No coding required" />
                </div>
                <div className="w-full max-w-[350px] mt-8"></div>
              </div>
            </div>
            <div className="flex items-center">
              <div>
                <h2 className="text-black text-3xl md:text-6xl font-bold font-grotesk_bold text-center md:text-left">
                  Evidence backed
                </h2>
                <p className="text-black text-2xl mt-8 text-center md:text-left font-light">
                  With strong understanding and experience of scientific methods
                  in training we can be sure to provide you with not only right
                  training plans but advice on testing, equipment and most
                  importantly nutrition and recovery.
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
                  Long term goals
                </h2>
                <p className="text-black text-2xl mt-8 text-center md:text-left font-light">
                  We are taking every customer with their own goals but what
                  unites everyone is the longetivity. At RP-Performance our goal
                  is to leave mark for the rest of the customers life not just
                  the next few weeks or months.
                </p>
              </div>
            </div>
            <div className="flex items-center justify-center md:justify-end">
              <div className="w-full max-w-[350px] m-auto">
                <div className="w-full max-w-[350px]">
                  <img src="/calendar.png" alt="Lightning" />
                </div>
                <div className="w-full max-w-[350px] mt-8"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex overflow-hidden">
        <img className="max-w-[400px]" src="/ville.png" alt="" />
        <img className="max-w-[400px]" src="/csf.png" alt="" />
        <img className="max-w-[400px]" src="/juoksurata.jpeg" alt="" />
        <img className="max-w-[800px]" src="/talvi.jpeg" alt="" />
      </div>
      <div id="pricing" className="w-full bg-[rgba(0,0,0,0.05)] mt-20">
        <div className="w-full max-w-6xl px-4 md:px-8 m-auto py-[40px] md:py-[60px]">
          <h2 className="text-black text-3xl md:text-6xl text-center font-bold font-grotesk_bold mb-8">
            Pricing
          </h2>
          <p className="text-stone-500 text-2xl text-center font-light">
            We have only one price and it includes everything.
          </p>
          <div className="mt-8 md:mt-16 space-y-12 lg:grid lg:grid-cols-3 lg:gap-x-8 lg:space-y-0"></div>
          <div className="relative flex flex-col rounded-md bg-black p-4 mt-4">
            <div className="flex-1">
              <p className="mt-4 flex items-baseline text-white">
                <span className="text-5xl font-bold tracking-tight">149€</span>
                <span className="ml-1 text-xl font-semibold">/month</span>
              </p>
              <p className="mt-6 text-gray-500">
                Complete coaching package for endurance athletes from every
                levels.
              </p>
              <ul className="text-white mt-6 space-y-4">
                <li className="flex">
                  <img
                    className="h-6 w-6 flex-shrink-0 mr-2"
                    src="/checkwhite.png"
                    alt="Checkmark"
                  />
                  <span>Custom program made only for your needs and level</span>
                </li>
                <li className="flex">
                  <img
                    className="h-6 w-6 flex-shrink-0 mr-2"
                    src="/checkwhite.png"
                    alt="Checkmark"
                  />
                  <span>
                    Daily Whatsapp-support if you have questions or problems
                  </span>
                </li>
                <li className="flex">
                  <img
                    className="h-6 w-6 flex-shrink-0 mr-2"
                    src="/checkwhite.png"
                    alt="Checkmark"
                  />
                  <span>Advice on nutrition and equipment</span>
                </li>
                <li className="flex">
                  <img
                    className="h-6 w-6 flex-shrink-0 mr-2"
                    src="/checkwhite.png"
                    alt="Checkmark"
                  />
                  <span>
                    Special race preparation program for the same price if you
                    are preparing for a race( Marathon, 10km, Ironman,
                    Skimarathon or any race )
                  </span>
                </li>
                <li className="flex">
                  <img
                    className="h-6 w-6 flex-shrink-0 mr-2"
                    src="/checkwhite.png"
                    alt="Checkmark"
                  />
                  <span>Phone calls by appoinment</span>
                </li>
                <li className="flex">
                  <img
                    className="h-6 w-6 flex-shrink-0 mr-2"
                    src="/checkwhite.png"
                    alt="Checkmark"
                  />
                  <span>Train like a professional athlete</span>
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
