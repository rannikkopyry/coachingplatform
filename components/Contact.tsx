import React from 'react';

function Contact() {
  return (
    <div className="min-h-screen bg-white w-full">
      <div className="w-full grid grid-cols-1 md:grid-cols-[2fr_1fr] min-h-[500px] items-center max-w-7xl px-4 m-auto py-[60px] z-10">
        <div className="md: pr-10">
          <h1 className="text-black text-5xl md:text-8xl font-bold font-grotesk_bold">
            Contact us{' '}
          </h1>
          <p className="text-black text-2xl mt-8 font-light">
            Get in touch with us and let's discuss our possible partnership in
            training.
          </p>
          <div className="mt-8"></div>
        </div>
        <div className="flex-shrink-0 w-full items-center justify-center min-h-[615px] flex">
          <div className="min-h-[500px] flex items-center">
            <div>
              <img src="/pyry.JPG" alt="" />
              <p className="text-black text-2xl mt-8 font-light">
                Your head coach Pyry
              </p>{' '}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
