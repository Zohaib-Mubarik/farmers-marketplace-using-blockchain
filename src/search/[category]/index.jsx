import Header from '@/components/Header';
import Search from '@/components/Search';
import { cropImages, cropListing } from './../../../configs/schema';
import { and, eq } from 'drizzle-orm';  // ✅ Added "and" for multiple conditions
import { db } from './../../../configs';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import CropItem from '@/components/CropItem';
import Service from '@/Shared/Service';

function SearchByCategory() {
    const { category } = useParams();
    const [cropList, setCropList] = useState([]);

    useEffect(() => {
        GetCropList();
    }, [category]);

    const GetCropList = async () => {
        const result = await db.select().from(cropListing)
            .innerJoin(cropImages, eq(cropListing.id, cropImages.cropListingId))
            .where(and(eq(cropListing.category, category), eq(cropListing.isVisible, true)));  // ✅ Filter for visible items only

        const resp = Service.FormatResult(result);
        setCropList(resp);
    };

    return (
        <div>
            <Header />
            <div className="p-16 bg-black flex justify-center">
                <Search />
            </div>
            <div className='p-10 md:px-20'>
                <h2 className='font-bold text-4xl'>{category}</h2>

                <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 mt-7'>
                    {cropList?.length > 0 ? cropList.map((item, index) => (
                        <div key={index}>
                            <CropItem crop={item} />
                        </div>
                    )) :
                        // Skeleton loading while no data
                        [1, 2, 3, 4, 5, 6].map((item, index) => (
                            <div key={index} className='h-[320px] rounded-xl bg-slate-200 animate-pulse'>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    );
}

export default SearchByCategory;
