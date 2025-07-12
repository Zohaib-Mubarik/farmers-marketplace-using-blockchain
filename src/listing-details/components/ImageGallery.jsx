import React from 'react'

export default function ImageGallery({cropDetail}) {
  return (
    <div>
        <img src={cropDetail?.images[0].imageUrl}
         className='w-full h-[500px] object-cover rounded-xl' />
    </div>
  )
}
