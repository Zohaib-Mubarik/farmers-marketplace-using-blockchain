import React, { useState } from 'react'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { CiSearch } from "react-icons/ci"
import Data from '@/Shared/Data'
import { Link } from 'react-router-dom'

function Search() {

    const [item, setItem] = useState('')
    const [price, setPrice] = useState('')

    const isDisabled = !item && !price;  // Disable search button if both fields are empty

    return (
        <div className="p-2 md:p-5 bg-white rounded-md md:rounded-full flex-col md:flex md:flex-row gap-10 px-5 items-center w-[100%]">

            {/* Item Dropdown */}
            <Select onValueChange={(value) => setItem(value)}>
                <SelectTrigger className="w-full outline-none md:border-none shadow-none text-lg">
                    <SelectValue placeholder="Items" />
                </SelectTrigger>
                <SelectContent>
                    {Data.CropMakes.map((maker, index) => (
                        <SelectItem value={maker.name} key={index}>{maker.name}</SelectItem>
                    ))}
                </SelectContent>
            </Select>

            {/* Separator */}
            <Separator orientation="vertical" className="hidden md:block" />

            {/* Price Dropdown */}
            <Select onValueChange={(value) => setPrice(value)}>
                <SelectTrigger className="w-full outline-none md:border-none shadow-none text-lg">
                    <SelectValue placeholder="Pricing" />
                </SelectTrigger>
                <SelectContent>
                    {Data.Pricing.map((priceItem, index) => (
                        <SelectItem value={priceItem.amount} key={index}>{priceItem.amount}</SelectItem>
                    ))}
                </SelectContent>
            </Select>

            {/* Search Button */}
            <Link
                to={`/search?item=${item}&price=${price}`}
                className={`${isDisabled ? 'pointer-events-none opacity-50' : ''}`}
            >
                <CiSearch className='text-[50px] bg-primary rounded-full p-3 text-white hover:scale-105 cursor-pointer transition' />
            </Link>

        </div>
    )
}

export default Search
