import axios from "axios";
// const CropImages = require("configs/schema");

const SendBirdApplicationId=import.meta.env.VITE_SENDBIRD_APP_ID;
const SendBirdApiToken=import.meta.env.VITE_SENDBIRD_API_TOKEN;
const FormatResult=(resp)=>{
    let result=[];
    let finalResult=[];
    resp.forEach((item)=>{
        const listingId=item.cropListing?.id;
        if(!result[listingId])
        {
            result[listingId]={
                crop:item.cropListing,
                images:[]
            }
        }

        if(item.cropImages)
        {
            result[listingId].images.push(item.cropImages)
        }
    })
   
    result.forEach((item)=>{
        finalResult.push({
            ...item.crop,
            images:item.images
        })
    })
 
    return finalResult;
}

const CreateSendBirdUser=(userId,nickName,profileUrl)=>{
    
    return axios.post('https://api- '+SendBirdApplicationId+'.sendbird.com/v3/users',{
        user_id:userId,
        nickname:nickName,
        profile_url:profileUrl,
        issue_access_token:false
    },{
        headers:{
            'Content-Type':'application/json',
            'Api-Token':SendBirdApiToken
        }
    });
}


const CreateSendBirdChannel=(users,title)=>{
    return axios.post('https://api-'+SendBirdApplicationId+'.sendbird.com/v3/group_channels',{
        user_ids:users,
        is_distinct:true,
        name:title,
        operator_ids:[users[0]]

    },{
        headers:{
            'Content-Type':'application/json',
            'Api-Token':SendBirdApiToken
        }
    })
} 

export default{
    FormatResult,
    CreateSendBirdUser,
    CreateSendBirdChannel
}