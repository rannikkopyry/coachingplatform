import React, { useState } from 'react';
import Modal from './Modal';

function ContactBar() {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className=" w-auto p-4 fixed z-40 right-2 left-2 bottom-2 bg-black rounded-full items-center border-b border-gray-500 text-center shadow-2xl">
      <Modal isVisible={showModal} onClose={() => setShowModal(false)} />
      <div className="flex items-center justify-center">
        <img className="h-5 mr-2 text-center" src="/phone.svg" alt="" />
        <button onClick={() => setShowModal(true)} className="text-white">
          Contact me
        </button>
      </div>
    </div>
  );
}

export default ContactBar;
