import React from 'react';

type Props = {
  isVisible: boolean;
  onClose: any;
};

const Modal = ({ isVisible, onClose }: Props) => {
  if (!isVisible) return null;

  return (
    <div className="w-auto p-4 fixed z-40 right-2 left-2 bottom-[70px] bg-white rounded-xl items-center border border-black text-center shadow-3xl">
      <div className="w-1/4">
        <button
          onClick={() => onClose()}
          className=" text-black flex flex-row place-self-end"
        >
          X
        </button>
        <div className=" p-10 text-center">
          <h1 className="text-3xl mb-5">Subscribe to premium!</h1>
          <p className="text-black">First month for free</p>
        </div>
      </div>
    </div>
  );
};

export default Modal;
