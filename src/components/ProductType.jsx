import React from 'react'
import Data from '@/Shared/Data';
import { Link } from 'react-router-dom';

function ProductType() {
  return (
    <div className='mt-35 '>
          <h2 className=' stext font-bold text-4xl text-center mb-2'>Browse by Type</h2>
          <div className=' grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-9 gap-6 px-20 ml-[355px] '>
          {Data.Category.map((category,index)=>(
            <Link to={'search/'+category.name } >
              <div className='border p-3 items-center flex flex-col hover:shadow-lg cursor-pointer rounded-xl hover:scale-105 transition-all'>
                  <img src={category.icons} width={60} height={60}  />
                  <h2 className='text-black stext mt-2'>{category.name}</h2>
              </div>
              </Link>
          ))}
          </div>
        </div>
  )
}

export default ProductType