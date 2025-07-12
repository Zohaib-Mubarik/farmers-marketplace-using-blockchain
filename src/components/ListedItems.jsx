import React, { useEffect,useState } from 'react'
import CropItem from './../components/CropItem'
import { cropImages, cropListing } from './../../configs/schema'
import {db} from './../../configs';
import { desc, eq } from 'drizzle-orm'
import Service from '@/Shared/Service'
import Header from './../components/Header';
import Category from './../components/Category';
import ProductType from './../components/ProductType';

function ListedItem() {

    

  const [cropList, setCropList] = useState([]);

  useEffect(()=>{
    GetPopularCropList();
  }, [])

  
  const GetPopularCropList=async()=>{
    const result = await db.select().from(cropListing)
        .leftJoin(cropImages, eq(cropListing.id, cropImages.cropListingId))
        .orderBy(desc(cropListing.id))
        .limit(8)
        

        const resp = Service.FormatResult(result)
        //console.log(resp);
        setCropList(resp);
        const visibleCrops = resp.filter(item => item.isVisible !== false);
setCropList(visibleCrops);

  }

  return (

    <div>
    

      

      <div className='p-5 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-7 gap-5   '>
             
                {
                cropList.map((crop, index)=>(

                    //  key={index},

                    <CropItem crop={crop} key={index} />
                
                    
                ))
                
                }
           

        </div>


        
    </div>
  )
}

export default ListedItem