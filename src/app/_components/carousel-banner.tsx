"use client";

import React from 'react';
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import banners from '@/datalocals/banner';
import Autoplay from "embla-carousel-autoplay"
import Image from 'next/image';

export default function CarouselBanner() {
    const plugin = React.useRef(
        Autoplay({ delay: 3000, stopOnInteraction: false })
    )

    return (
        <Carousel className="w-full md:w-2/3 lg:w-full shadow-2xl" plugins={[plugin.current]} opts={{ loop: true }}>
            <CarouselContent>
                {banners.map((banner) => (
                    <CarouselItem key={banner.id}>
                        <div className="relative w-full h-72 overflow-hidden rounded-lg lg:h-full">
                            <Image
                                src={banner.image}
                                alt={banner.title}
                                width={800}
                                height={400}
                                className="w-full h-full object-cover bg-center"
                            />
                            <div className="absolute bottom-0 left-0 w-full bg-green-900/60 backdrop-blur-sm p-4 flex flex-col justify-center items-start gap-2">
                                <h3 className="text-xl lg:text-2xl font-semibold text-white">{banner.title}</h3>
                                <p className="text-sm text-gray-200 lg:text-lg">{banner.desc}</p>
                            </div>
                        </div>
                    </CarouselItem>
                ))}
            </CarouselContent>
        </Carousel>
    );
}
