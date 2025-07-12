import {faker} from '@faker-js/faker';
function createRandomeCropsList(){
    return {
        name:faker.food.vegetable(),
        category:faker.food.ethnicCategory(),
        description:faker.food.description(),
        image:'https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcT3QahU_uxvwY_qrg0VNnjgOAjX9-3K9TXUhed1NuWHtHYY4GjLM6fVAhRcuDT8F6VnNYtnC6sFRgEpmlxcSeXECg',
        
        price:faker.finance.amount({min:200, max:5000})
    
    };
}

const CropsList=faker.helpers.multiple(createRandomeCropsList,{
    count:7
})

export default{
    CropsList
}