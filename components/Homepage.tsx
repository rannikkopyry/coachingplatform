import React from 'react'

import Saka from "./images/saka.png"

export default function Homepage() {
  return (
    <div className='min-h-screen bg-white'>
        <div className='w-full grid grid-cols-1 md:grid-cols-[2fr_1fr] min-h-[500px] items-center max-w-7xl px-4 m-auto py-[60px] z-10'>
        <div className='md: pr-10'>
            <h1 className='text-black text-5xl md:text-8xl font-bold font-grotesk_bold'>
                Sell more cars
            </h1>
            <p className='text-black text-2xl mt-8 font-light'>Lorem ipsum adadadadadadadad</p>
        </div>
        <div className='flex-shrink-0 w-full items-center justify-center min-h-[615px] hidden md:flex'>
        <div className='min-h-[500px] flex items-center'>
            <div>
            <p className='text-black text-3xl mb-4 font-medium'>More leads</p>
            <ul className='text-black text-xl'>
                <li className='flex gap-2 items-center mb-2'>Showcase cars you are selling</li>
                <li className='flex gap-2 items-center mb-2'>Showcase cars you are selling</li>
                <li className='flex gap-2 items-center mb-2'>Showcase cars you are selling</li>
                <li className='flex gap-2 items-center mb-2'>Showcase cars you are selling</li>
                <li className='flex gap-2 items-center mb-2'>Showcase cars you are selling</li>

                <li className='flex gap-2 items-center mb-2'>Showcase cars you are selling</li>
            </ul>
            </div>
        </div>
        </div>
        </div> 
        <div className='mx-auto max-w-7xl pt-4 pb-12 px-4 sm:px-6 lg:px-8 opacity-50'>
            <p className='text-black'>Trusted by:</p>
            <div className='grid grid-cols-2 gap-8 md:grid-cols-6 lg:grid-cols-5'>
                <div className='col-span-1 flex justify-center md:col-span-2 lg:col-span-1'>
                    <img className='h-12 object-contain' src="./images/autolle.png" alt="" />
                </div>
                <div className='col-span-1 flex justify-center md:col-span-2 lg:col-span-1'>
                    <img className='h-12 object-contain' src="./images/kamux.png" alt="" />
                </div>
                <div className='col-span-1 flex justify-center md:col-span-2 lg:col-span-1 text-black'>
                    <img className='h-12 object-contain' src="./images/saka.png" alt="" />
                </div>
                <div className='col-span-1 flex justify-center md:col-span-2 lg:col-span-1'>
                    <img className='h-12 object-contain' src="./images/lc.png" alt="" />
                </div>
            </div>
        </div>
        <div id='features'>
            <div className="w-full max-w-6xl px-4 md:px-8 m-auto py-[40px] md:py-[60px]">
                <div className='grid grid-cols-1 gap-8 md:grid-cols-2 min-h-[300px]'>
                    <div className='flex items-center'>
                        <div>
                            <h2 className='text-black text-3xl md:text-6xl font-bold font-grotesk_bold text-center md:text-left'>Moi</h2>
                            <p className='text-black text-2xl mt-8 text-center md:text-left font-light'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur repellat laudantium eos modi excepturi laboriosam molestias placeat veritatis, consequuntur voluptate rerum reprehenderit maiores sequi eveniet, accusamus provident culpa. Obcaecati, nihil.</p>
                        </div>
                    </div>
                    <div className='flex items-center justify-center md:justify-end'>
                        <div className='w-full max-w-[350px] m-auto'>
                            <div className='w-full max-w-[350px]'>
                                <p className=' text-stone-500 mb-4 text-center'>Other link tools</p>
                                <div className='bg-white rounded-full p-1 text-center w-full font-medium flex items-center shadow-lg'>
                                    <div className='flex-shrink-0 rounded-full w-8 h-8 overflow-hidden'></div>
                                    <div className='text-black px-2 text-center w-full -ml-4'>Audi A6 avant 3.0</div>
                                </div>
                            </div>
                            <div className='w-full max-w-[350px] mt-8'></div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="w-full max-w-6xl px-4 md:px-8 m-auto py-[40px] md:py-[60px]">
            <div className='grid grid-cols-1 gap-8 md:grid-cols-2 min-h-[300px]'>
                    <div className='flex items-center justify-center md:justify-end'>
                        <div className='w-full max-w-[350px] m-auto'>
                            <div className='w-full max-w-[350px]'>
                                <p className=' text-stone-500 mb-4 text-center'>Other link tools</p>
                                <div className='bg-white rounded-full p-1 text-center w-full font-medium flex items-center shadow-lg'>
                                    <div className='flex-shrink-0 rounded-full w-8 h-8 overflow-hidden'></div>
                                    <div className='text-black px-2 text-center w-full -ml-4'>Audi A6 avant 3.0</div>
                                </div>
                            </div>
                            <div className='w-full max-w-[350px] mt-8'></div>
                        </div>
                    </div>
                    <div className='flex items-center'>
                        <div>
                            <h2 className='text-black text-3xl md:text-6xl font-bold font-grotesk_bold text-center md:text-left'>Moi</h2>
                            <p className='text-black text-2xl mt-8 text-center md:text-left font-light'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur repellat laudantium eos modi excepturi laboriosam molestias placeat veritatis, consequuntur voluptate rerum reprehenderit maiores sequi eveniet, accusamus provident culpa. Obcaecati, nihil.</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="w-full max-w-6xl px-4 md:px-8 m-auto py-[40px] md:py-[60px]">
            <div className='grid grid-cols-1 gap-8 md:grid-cols-2 min-h-[300px]'>
                    <div className='flex items-center'>
                        <div>
                            <h2 className='text-black text-3xl md:text-6xl font-bold font-grotesk_bold text-center md:text-left'>Moi</h2>
                            <p className='text-black text-2xl mt-8 text-center md:text-left font-light'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur repellat laudantium eos modi excepturi laboriosam molestias placeat veritatis, consequuntur voluptate rerum reprehenderit maiores sequi eveniet, accusamus provident culpa. Obcaecati, nihil.</p>
                        </div>
                    </div>
                    <div className='flex items-center justify-center md:justify-end'>
                        <div className='w-full max-w-[350px] m-auto'>
                            <div className='w-full max-w-[350px]'>
                                <p className=' text-stone-500 mb-4 text-center'>Other link tools</p>
                                <div className='bg-white rounded-full p-1 text-center w-full font-medium flex items-center shadow-lg'>
                                    <div className='flex-shrink-0 rounded-full w-8 h-8 overflow-hidden'></div>
                                    <div className='text-black px-2 text-center w-full -ml-4'>Audi A6 avant 3.0</div>
                                </div>
                            </div>
                            <div className='w-full max-w-[350px] mt-8'></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}