import { Button } from '@/components/ui/button'
import Service from '@/Shared/Service'
import { useUser } from '@clerk/clerk-react'
import React from 'react'
import { useNavigate } from 'react-router-dom'

function OwnersDetail({cropDetail}) {
    console.log(cropDetail)

    const {user}=useUser();

    const navigation=useNavigate();

 
   const OnMessageOwnerButtonClick=async()=>{

    const userId=user.primaryEmailAddress.emailAddress.split('@')[0];
    const ownerUserId=cropDetail?.createdBy.split('@')[0];

    //Current User ID
    try{
      
      await Service.CreateSendBirdUser(userId,user?.fullName,user?.imageUrl)
      .then(resp=>{
        console.log(resp); 
      })
    }catch(e){}


    //Owner User ID
    try{
      
      await Service.CreateSendBirdUser(ownerUserId,cropDetail?.userName,cropDetail?.userImageUrl)
      .then(resp=>{
        console.log(resp); 
      })
      console.log(ownerUserId);

    }catch(e){}


    //Create Channel
    try{
    await Service.CreateSendBirdChannel([userId,ownerUserId],cropDetail?.listingTitle)
    .then(resp=>{
      console.log(resp); 
      console.log("Channel Created")
      navigation('/profile');
    })
  }catch(e){}


   }
  return (
    <div className='p-10 border rounded-xl shadow-md mt-7'>
        <h2 className='font-medium text-2xl mb-3'>Owner Detail</h2>
        <img src={cropDetail?.userImageUrl} className='w-[70px] h-[70px] rounded-full' />
        <h2 className='mt-2 font-bold text-xl'>{cropDetail?.userName}</h2>
        <h2 className='mt-2 text-gray-500'>{cropDetail?.createdBy}</h2>

        <Button className='w-full mt-6'
          onClick={OnMessageOwnerButtonClick}
        >Message Owner</Button>
        
        
    </div>
  ) 
}

export default OwnersDetail