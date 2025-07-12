import React from 'react'

export default function DetailHeader({cropDetail}) {
  return (
    <div>
        <h2 className='font-bold text-3xl' >{cropDetail?.listingTitle}</h2>
    </div>
  )
}
