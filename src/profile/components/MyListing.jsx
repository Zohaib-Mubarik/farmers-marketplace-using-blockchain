import { Button } from '@/components/ui/button'
import { useUser } from '@clerk/clerk-react'
import { cropImages, cropListing } from './../../../configs/schema'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { db } from './../../../configs'
import { desc, eq, and } from 'drizzle-orm'
import Service from '@/Shared/Service'
import CropItem from '@/components/CropItem'
import { toast } from 'sonner'

function MyListing() {

    const { user } = useUser();
    const [cropList, setCropList] = useState([]);
    const [loader, setLoader] = useState(false);

    useEffect(() => {
        user && GetUsercropListing();
    }, [user]);

    const GetUsercropListing = async () => {
        const result = await db.select().from(cropListing)
            .leftJoin(cropImages, eq(cropListing.id, cropImages.cropListingId))
            .where(
                and(
                    eq(cropListing.createdBy, user?.primaryEmailAddress?.emailAddress),
                    eq(cropListing.isVisible, true)   // ✅ Only visible (unsold) listings
                )
            )
            .orderBy(desc(cropListing.id));

        const resp = Service.FormatResult(result);
        setCropList(resp);
    };

    const markAsSold = async (id) => {
        setLoader(true);
        try {
            await db.update(cropListing)
                .set({ isVisible: false })  // ✅ Mark as not visible
                .where(eq(cropListing.id, id));

            toast.success('Listing marked as sold!');
            // ✅ Update frontend
            setCropList(prevList => prevList.filter(item => item.id !== id));

        } catch (error) {
            console.error("Error marking as sold:", error);
            toast.error('Failed to mark as sold');
        } finally {
            setLoader(false);
        }
    };

    return (
        <div className="mt-6">
            <div className="flex justify-between items-center">
                <h2 className="font-bold text-4xl">My Listings</h2>
                <Link to={'/add-listing'}>
                    <Button>+ Add New Listing</Button>
                </Link>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-7 gap-5">
                {cropList.map((item, index) => (
                    <div key={index}>
                        <CropItem crop={item} />

                        <div className="p-2 bg-gray-50 rounded-lg">
                            <Button
                                onClick={() => markAsSold(item.id)}
                                disabled={loader}
                                className="w-full bg-red-500 hover:bg-red-600 text-white"
                            >
                                Mark as Sold
                            </Button>
                        </div>
                    </div>
                ))}
            </div>

            {cropList.length === 0 && (
                <div className="text-center text-gray-500 mt-10">
                    No active listings found.
                </div>
            )}
        </div>
    );
}

export default MyListing;
