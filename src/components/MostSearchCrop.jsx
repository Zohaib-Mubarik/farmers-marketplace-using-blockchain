import React, { useEffect, useState, useRef } from "react"
import Autoplay from "embla-carousel-autoplay"
import CropItem from "./CropItem"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { cropImages, cropListing } from "../../configs/schema"
import { db } from "../../configs"
import { desc, eq } from "drizzle-orm"
import Service from "@/Shared/Service"

function MostSearchCrop() {
  const [cropList, setCropList] = useState([])

  const plugin = useRef(
    Autoplay({ delay: 2000, stopOnInteraction: true })
  )

  useEffect(() => {
    GetPopularCropList()
  }, [])

  const GetPopularCropList = async () => {
    const result = await db.select().from(cropListing)
      .leftJoin(cropImages, eq(cropListing.id, cropImages.cropListingId))
      .orderBy(desc(cropListing.id))
      .limit(10)

    const resp = Service.FormatResult(result)
    const visibleCrops = resp.filter(item => item.isVisible !== false)
    setCropList(visibleCrops)
  }

  return (
    <div className="mx-24">
      <h2 className="font-bold text-3xl text-center mt-16 mb-7">
        Most Searched
      </h2>

      <Carousel
        plugins={[plugin.current]}
        onMouseEnter={plugin.current.stop}
        onMouseLeave={plugin.current.reset}
      >
        <CarouselContent>
          {cropList.map((crop, index) => (
            <CarouselItem key={index} className="basis-1/4">
              <CropItem crop={crop} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  )
}

export default MostSearchCrop
