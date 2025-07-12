import Header from '@/components/Header'
import React, { useEffect, useState } from 'react'
import DetailHeader from '../components/DetailHeader'
import { useParams } from 'react-router-dom';
import { asc, eq } from 'drizzle-orm';
import { cropImages, cropListing } from './../../../configs/schema';
import Service from '@/Shared/Service';
import { db } from './../../../configs';
import ImageGallery from '../components/ImageGallery';
import Description from '../components/Description';
import Pricing from '../components/Pricing';
import OwnersDetail from '../components/OwnersDetail';
import Footer from '@/components/Footer';
import MostSearchCrop from '@/components/MostSearchCrop';

function ListingDetail(){


    const {id}=useParams(); 
    const [cropDetail,setCropDetail]=useState();



    useEffect(()=>{
        GetCropDetail();
    },[])

    const GetCropDetail=async()=>{
        const result=await db.select().from(cropListing)
        .innerJoin(cropImages,eq(cropListing.id,cropImages.cropListingId))
        .where(eq(cropListing.id,id));

        const resp=Service.FormatResult(result); 
        setCropDetail(resp[0]);

    }
    return(
        <div>
            <Header/>

            <div className='p-10 md:px-20'>
            {/* Header detail component */}

                <DetailHeader cropDetail={cropDetail} />

                <div className='grid grid-cols-1 md:grid-cols-3 w-full mt-10 gap-5'>

                    {/* left  */}
                    <div className='md:col-span-2' >

                        {/* image gallery */}
                        <ImageGallery cropDetail={cropDetail} /> 

                        {/* description */}
 
                        <Description cropDetail={cropDetail} />



                    </div>
                    {/* right */}

                    <div>
                    {/* pricing */}


                    <Pricing  cropDetail={cropDetail} />

                    {/* Owner details  */} 

                    <OwnersDetail cropDetail={cropDetail} />
                    </div>

                </div>

                <MostSearchCrop/>
            </div>

            <Footer/>

        </div>
    )
}

export default ListingDetail