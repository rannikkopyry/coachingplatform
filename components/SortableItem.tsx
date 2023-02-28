import React from 'react';
import { SortableElement } from 'react-sortable-hoc';

const SortableItem = (props: any) => {
  return (
    <li className="text-black">
      <div className="flex gap-2 px-2">
        <div className="jsx-902cb4503c8a7a8 flex-shrink-0 flex items-start pt-1">
          <button className="text-stone-400">
            <img
              height="20px"
              width="20px"
              className="text-xl"
              src="/draggable.svg"
              alt=""
            />
          </button>
        </div>
        <div className="flex flex-grow overflow-hidden w-full gap-4 min-h-[80px]">
          <div className="w-20 h-20 flex-shrink-0 rounded-md overflow-hidden relative group bg-stone-100 border-stone-200 border">
            <img src="/volvo.jpeg" alt="" />
          </div>
          <div className="flex-grow flex flex-col overflow-hidden">
            <p className="px-2 py-1 text-white bg-black rounded-full text-xs flex items-center w-fit gap-1 mb-1">
              55 000
            </p>
            <p className="px-2 py-1 text-stone-500 rounded-md text-xs flex items-center w-fit gap-1 bg-stone-100">
              <img height="16px" width="16px" src="/car.svg" alt="" />
              Listing
            </p>
            <button className="text-black font-medium mt-auto block w-full text-left truncate">
              {props.value}
            </button>
            <button className="text-stone-500 text-sm block w-full text-left overflow-hidden truncate">
              450 HP | Alcantara | Bowers & Wilkins
            </button>
          </div>
          <div className="flex-shrink-0 ml-auto pr-1">
            <div className="flex flex-col h-full">
              <div className="flex gap-2 justify-end items-center">
                <div className="jsx-902cb4503c8a7a8 flex items-center">
                  <label
                    className="ml-auto inline-flex relative items-center cursor-pointer"
                    htmlFor=""
                  ></label>
                </div>
                <button>
                  <img height="16px" width="16px" src="/trashcan.svg" alt="" />
                </button>
              </div>
              <div className="mt-auto">
                <button className="text-stone-500 text-sm hover:text-black">
                  Edit
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </li>
  );
};

export default SortableElement(SortableItem);
