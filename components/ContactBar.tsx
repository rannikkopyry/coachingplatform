import React from 'react';

function ContactBar() {
  return (
    <div className=" w-auto p-4 fixed z-40 right-2 left-2 bottom-2 bg-black rounded-full items-center border-b border-gray-500 text-center shadow-2xl">
      <div className="flex items-center justify-center">
        <img className="h-5 text-center" src="/phone.png" alt="" />
        <button className="text-white">Contact me</button>
      </div>
    </div>
  );
}

export default ContactBar;
