import React from 'react';

type Props = {
  isVisible: boolean;
  onClose: any;
};

const Modal = ({ isVisible, onClose }: Props) => {
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-25 flex justify-center items-center">
      <div className="w-1/4">
        <button
          onClick={() => onClose()}
          className="text-white flex flex-row place-self-end"
        >
          X
        </button>
        <div className="bg-white p-10 text-center">
          <h1 className="text-3xl mb-5">Subscribe to premium!</h1>
          <p className="text-gray-400">First month for free</p>
        </div>
      </div>
    </div>
  );
};

export default Modal;
