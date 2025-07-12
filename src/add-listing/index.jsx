import Header from '@/components/Header';
import React, { useEffect, useState } from 'react';
import cropDetails from './../Shared/cropDetails.json';
import InputField from './components/InputField';
import DropdownField from './components/DropdownField';
import TextAreaField from './components/TextAreaField';
import { Separator } from "@/components/ui/separator";
import { Button } from '@/components/ui/button';
import { db } from './../../configs';
import { cropImages, cropListing, cropCategories } from './../../configs/schema';
import IconField from './components/IconField';
import UploadImages from './components/UploadImages';
import { BiLoaderAlt } from "react-icons/bi";
import { useNavigate, useSearchParams } from 'react-router-dom';
import moment from 'moment';
import { useUser } from '@clerk/clerk-react';
import { eq } from 'drizzle-orm';
import Service from '@/Shared/Service';
import { toast } from 'sonner';
import { handleBlockchainSave } from './blockchain';



function AddListing() {
  const [formData, setFormData] = useState({});
  const [featuresData, setFeaturesData] = useState([]);
  const [triggerUploadImages, setTriggerUploadImages] = useState();
  const [loader, setLoader] = useState(false);
  const [categoriesWithPrice, setCategoriesWithPrice] = useState([]);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { user } = useUser();
  const [cropInfo, setCropInfo] = useState();

  const mode = searchParams.get('mode');
  const recordId = searchParams.get('id');

  useEffect(() => {
    fetchCategoryPrices();
    if (mode === 'edit') {
      GetListingDetail();
    }
  }, []);

  const fetchCategoryPrices = async () => {
    try {
      const result = await db.select().from(cropCategories);
      setCategoriesWithPrice(result);
    } catch (error) {
      console.error("Error fetching category prices:", error);
    }
  };

  const GetListingDetail = async () => {
    const result = await db.select().from(cropListing)
      .innerJoin(cropImages, eq(cropListing.id, cropImages.cropListingId))
      .where(eq(cropListing.id, recordId));

    const resp = Service.FormatResult(result);
    setCropInfo(resp[0]);
    setFormData(resp[0]);
  };

  const handleInputChange = (name, value) => {
    if (name === 'category') {
      const categoryObj = categoriesWithPrice.find(cat => cat.categoryName === value);
      const selectedPrice = categoryObj ? categoryObj.defaultPrice : '';

      setFormData(prevData => ({
        ...prevData,
        [name]: value,
        originalPrice: selectedPrice   // Auto fill price from DB
      }));
    } else {
      setFormData(prevData => ({
        ...prevData,
        [name]: value
      }));
    }
  };

  const onSubmit = async (e) => {
    setLoader(true);
    e.preventDefault();
    toast('Please Wait...');

    try {
      const dbData = {
        ...formData,
        createdBy: user?.primaryEmailAddress?.emailAddress,
        userName: user?.fullName,
        userImageUrl: user?.imageUrl,
        postedOn: moment().format('DD/MM/yyyy')
      };

      if (mode === 'edit') {
        await db.update(cropListing).set({
          ...dbData,
          features: featuresData,
        }).where(eq(cropListing.id, recordId)).returning({ id: cropListing.id });
      } else {
        const result = await db.insert(cropListing).values(dbData).returning({ id: cropListing.id });
        if (result) {
          setTriggerUploadImages(result[0]?.id);
          await handleBlockchainSave(formData);
        }
      }

      setLoader(false);
      navigate('/profile');
    } catch (e) {
      console.error('Submission error:', e);
      toast.error("Error storing data");
      setLoader(false);
    }
  };

  return (
    <div>
      <Header />
      <div className="px-10 md:px-20 my-10">
        <h2 className="font-bold text-4xl">Add New Listing</h2>
        <form className='p-10 border rounded-xl mt-10'>
          <div>
            <h2 className='font-medium text-xl mb-6'>Crop Detail</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {cropDetails.cropDetails.map((item, index) => (
                <div key={index}>
                  <label className='text-sm flex gap-2 items-center mb-1'>
                    <IconField icon={item.icon} />
                    {item?.label}
                    {item.required && <span className='text-red-500'>*</span>}
                  </label>
                  {item.fieldType === 'text' || item.fieldType === 'number' ? (
                    <InputField
                      item={item}
                      handleInputChange={handleInputChange}
                      cropInfo={formData}
                      disabled={item.name === 'originalPrice'}  //  Price Field Disabled
                    />
                  ) : item.fieldType === 'dropdown' ? (
                    <DropdownField
                      item={item}
                      handleInputChange={handleInputChange}
                      cropInfo={formData}
                    />
                  ) : item.fieldType === 'textarea' ? (
                    <TextAreaField
                      item={item}
                      handleInputChange={handleInputChange}
                      cropInfo={formData}
                    />
                  ) : null}
                </div>
              ))}
            </div>
          </div>

          <Separator className="my-6" />

          <UploadImages
            triggerUploadImages={triggerUploadImages}
            cropInfo={cropInfo}
            mode={'edit'}
            setLoader={(v) => { setLoader(v); navigate('/profile'); }}
          />

          <div className="mt-10 flex justify-end">
            <Button
              type="submit"
              disabled={loader}
              onClick={(e) => onSubmit(e)}
            >
              {!loader ? 'Submit' : <BiLoaderAlt className='animate-spin text-lg' />}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddListing;
