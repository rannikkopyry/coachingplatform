import React from 'react'

export default function Dashboard() {
  return (
   <>
    <div className='h-screen bg-white w-full'>
        <div className='w-full grid grid-cols-1 md:grid-cols-[2fr_2fr] min-h-[500px] items-center  px-4 m-auto py-[60px] z-10'>
      <section className=''>
        <div className='bg-grey'>
        <h2 className='text-black text-3xl md:text-6xl font-bold font-grotesk_bold text-center md:text-left'>My pages</h2>
        </div>
      </section>
      <section className='basis-1/2'></section>
    </div>
    </div>
   </>
  )
}

