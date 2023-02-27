import React from 'react';

function ContactBar() {
  return (
    <div className=" w-auto p-4 fixed z-40 right-2 left-2 bottom-2 bg-black rounded-full items-center border-b border-gray-500">
      <div>
        <button className="text-white">Contact details</button>
      </div>
    </div>
  );
}

export default ContactBar;
