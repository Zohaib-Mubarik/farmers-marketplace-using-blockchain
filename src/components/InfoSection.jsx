import React from 'react'

function InfoSection() {
  return (
    <section>
    <div className="mx-auto max-w-screen-2xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-4 md:items-center md:gap-8">
        <div className="md:col-span-3">
          <img 
            src="/infosection.jpg"
            className="rounded "
            alt=""
           />
        </div>
  
        <div className="md:col-span-1">
          <div className="max-w-lg md:max-w-none">
            <h2 className="text-2xl font-semibold text-gray-900 sm:text-3xl">
            Transforming Agriculture with Farmex.
            </h2>
  
            <p className="mt-4 text-gray-700">
Farmex is revolutionizing agriculture by leveraging cutting-edge technology to bridge the gap between farmers and buyers, creating a transparent, efficient, and sustainable supply chain. By enabling farmers to directly showcase and sell their produce, Farmex eliminates intermediaries, ensuring fair pricing, better profits, and verified, high-quality products for buyers..</p>
          </div>
        </div>
      </div>
    </div>
  </section>
  
  )
}

export default InfoSection