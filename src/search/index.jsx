import Service from '@/Shared/Service';
import { db } from './../../configs';
import { cropImages, cropListing } from './../../configs/schema';
import { and, eq } from 'drizzle-orm';  // ✅ Added "and" for multiple conditions
import { Search } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Header from '@/components/Header';
import CropItem from '@/components/CropItem';

function SearchByOptions() {

    const [searchParam] = useSearchParams();
    const [cropList, setCropList] = useState([]);

    const category = searchParam.get('item');

    useEffect(() => {
        GetCropList();
    }, [category]);

    const GetCropList = async () => {
        let query = db.select().from(cropListing)
            .innerJoin(cropImages, eq(cropListing.id, cropImages.cropListingId))
            .where(eq(cropListing.isVisible, true));  // ✅ Filter to only show visible products

        if (category) {
            query = query.where(and(eq(cropListing.category, category), eq(cropListing.isVisible, true)));  // ✅ Both category match and visible check
        }

        const result = await query;
        const resp = Service.FormatResult(result);
        console.log(resp);
        setCropList(resp);
    };

    return (
        <div>
            <Header />
            <div className="p-16 bg-black flex justify-center">
                <Search />
            </div>
            <div className='p-10 md:px-20'>
                <h2 className='font-bold text-4xl'>Search Result</h2>

                <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 mt-7'>
                    {cropList?.length > 0 ? cropList.map((item, index) => (
                        <div key={index}>
                            <CropItem crop={item} />
                        </div>
                    )) :
                        // Skeleton loading
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

export default SearchByOptions;
