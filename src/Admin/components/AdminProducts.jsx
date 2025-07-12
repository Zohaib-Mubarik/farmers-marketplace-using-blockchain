import { Button } from '@/components/ui/button';
import { useUser } from '@clerk/clerk-react';
import { cropImages, cropListing } from './../../../configs/schema';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from './../../../configs';
import { desc, eq } from 'drizzle-orm';
import Service from '@/Shared/Service';
import CropItem from '@/components/CropItem';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { toast } from 'sonner';

function AdminProducts() {
  const { user } = useUser();
  const [cropList, setCropList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    GetPopularCropList();
  }, []);

  const GetPopularCropList = async () => {
    setLoading(true);
    const result = await db
      .select()
      .from(cropListing)
      .leftJoin(cropImages, eq(cropListing.id, cropImages.cropListingId))
      .orderBy(desc(cropListing.id));

    const resp = Service.FormatResult(result);
    setCropList(resp);
    setLoading(false);
  };

  const handleToggleVisibility = async (id, currentStatus) => {
    setUpdating(true);
    try {
      await db
        .update(cropListing)
        .set({ isVisible: !currentStatus })
        .where(eq(cropListing.id, id));

      toast.success(`Product ${!currentStatus ? 'Visible' : 'Hidden'} Successfully!`);

      GetPopularCropList();
    } catch (error) {
      console.error('Error updating visibility:', error);
      toast.error('Failed to update visibility');
    } finally {
      setUpdating(false);
    }
  };

  return (
    <div className="mt-6 mx-5">
      <h2 className="text-center text-3xl font-bold mb-8">🌾 Manage Crops</h2>

      {loading ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-7 gap-5">
          {[...Array(8)].map((_, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow p-4 animate-pulse flex flex-col gap-3"
            >
              <div className="h-32 bg-gray-300 rounded"></div>
              <div className="h-4 bg-gray-300 rounded w-3/4"></div>
              <div className="h-4 bg-gray-300 rounded w-1/2"></div>
              <div className="h-10 bg-gray-300 rounded mt-2"></div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-7 gap-5">
          {cropList.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow hover:shadow-lg transition"
            >
              <CropItem crop={item} />
              <div className="p-2 bg-gray-50 rounded-b-lg flex justify-between gap-3">
                <Button
                  variant={item.isVisible ? 'destructive' : 'default'}
                  onClick={() => handleToggleVisibility(item.id, item.isVisible)}
                  className="w-full flex items-center justify-center gap-2"
                  disabled={updating}
                >
                  {updating && (
                    <span className="animate-spin inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full"></span>
                  )}
                  {!updating &&
                    (item.isVisible ? (
                      <>
                        <FaEyeSlash /> Hide
                      </>
                    ) : (
                      <>
                        <FaEye /> Unhide
                      </>
                    ))}
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default AdminProducts;
