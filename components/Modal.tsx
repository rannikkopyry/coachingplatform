import React from 'react';

type Props = {
  isVisible: boolean;
  onClose: any;
};

const Modal = ({ isVisible, onClose }: Props) => {
  if (!isVisible) return null;

  return (
    <div className="w-auto p-4 fixed z-40 right-2 left-2 bottom-[70px] bg-white rounded-xl items-center border border-black text-center shadow-3xl">
      <div>
        <button
          onClick={() => onClose()}
          className=" text-black flex flex-row place-self-end"
        >
          X
        </button>
        <div className="w-full">
          <div className="bg-white rounded-lg shadow-xl mb-2 overflow-hidden">
            <ul className="divide-y divide-stone-100 text-sm">
              <button className="px-4 py-3 flex items-center w-full gap-2 outline-none text-black">
                <img
                  className="h-5 mr-2 text-center"
                  src="/phoneblack.svg"
                  alt=""
                />
                Call
                <span className="text-stone-500 text-xs ml-auto">
                  +358 452684828
                </span>
              </button>
              <button className="px-4 py-3 flex items-center w-full gap-2 outline-none text-black">
                <img
                  className="h-5 mr-2 text-center"
                  src="/message.svg"
                  alt=""
                />
                Text
                <span className="text-stone-500 text-xs ml-auto">
                  +358 452684828
                </span>
              </button>
              <button className="px-4 py-3 flex items-center w-full gap-2 outline-none text-black">
                <img className="h-5 mr-2 text-center" src="/mail.svg" alt="" />
                Email
                <span className="text-stone-500 text-xs ml-auto">
                  pyry@motorlinks.io
                </span>
              </button>
              <button className="px-4 py-3 flex items-center w-full gap-2 outline-none text-black">
                <img
                  className="h-5 mr-2 text-center"
                  src="/whatsapp.svg"
                  alt=""
                />
                Whatsapp
                <span className="text-stone-500 text-xs ml-auto">
                  +358 452684828
                </span>
              </button>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
