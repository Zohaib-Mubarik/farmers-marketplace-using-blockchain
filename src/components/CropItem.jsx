import { Separator } from "@/components/ui/separator"
import React from 'react'
import { IoOpenOutline } from "react-icons/io5";
import { Link, useParams } from "react-router-dom";
import { Button } from "./ui/button";
import { FaTrashAlt } from "react-icons/fa";
import AdminRoute from "@/Admin/components/AdminRoute";
function CropItem({crop}) {

    

  return (
    <Link to={'/listing-details/'+crop?.id}>
    <div className="rounded-xl bg-white border hover:shadow cursor-pointer">
        <h2 className="absolute m-2 bg-green-500 px-2 rounded-full text-sm text-white">New</h2>
        <img src={crop?.images[0]?.imageUrl} alt="crop" width={'100%'} height={250} className='rounded-t-xl h-[300px] object-cover'/>
        <div className='p-4'>
            <h2 className='font-bold text-black text-lg mb-2'>{crop?.listingTitle}</h2>
            <Separator />
            <div className='grid grid-cols-3 mt-5'>
            </div>  
            {/* <Separator className=''/> */}
            <div className='flex items-center justify-between'>
                <h2 className='font-bold text-xl'>Rs: {crop?.originalPrice}</h2>
                <h2 className='text-primary text-sm flex gap-2 items-center'>
                    View Details
                    <IoOpenOutline />
                </h2>
            </div>
        </div>
    </div>
    </Link>
  )
}

export default CropItem