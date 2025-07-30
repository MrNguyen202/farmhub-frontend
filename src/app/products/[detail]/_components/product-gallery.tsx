"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"

interface ProductGalleryProps {
    images: string[]
    productName: string
}

export function ProductGallery({ images, productName }: ProductGalleryProps) {
    const [selectedImage, setSelectedImage] = useState(0)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [modalSelectedImage, setModalSelectedImage] = useState(0)

    const totalImages = images.length
    const maxThumbnails = 4
    const remainingImages = totalImages - maxThumbnails

    const handleThumbnailClick = (index: number) => {
        if (index === maxThumbnails - 1 && totalImages > maxThumbnails) {
            setModalSelectedImage(selectedImage)
            setIsModalOpen(true)
        } else {
            setSelectedImage(index)
        }
    }

    const handleModalPrev = () => {
        setModalSelectedImage(modalSelectedImage === 0 ? totalImages - 1 : modalSelectedImage - 1)
    }

    const handleModalNext = () => {
        setModalSelectedImage(modalSelectedImage === totalImages - 1 ? 0 : modalSelectedImage + 1)
    }

    return (
        <>
            <div>
                {/* Main Image */}
                <div className="mb-4 relative">
                    <Image
                        src={images[selectedImage] || "/placeholder.svg"}
                        alt={productName}
                        width={500}
                        height={500}
                        className="w-full h-96 object-cover rounded-lg shadow-md"
                    />

                    {/* Image counter */}
                    <div className="absolute top-4 right-4 bg-black bg-opacity-50 text-white px-3 py-1 rounded-full text-sm">
                        {selectedImage + 1} / {totalImages}
                    </div>

                    {/* Navigation arrows for main image */}
                    {totalImages > 1 && (
                        <>
                            <Button
                                variant="ghost"
                                size="icon"
                                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white hover:bg-opacity-100 rounded-full shadow-md hover:cursor-pointer"
                                onClick={() => setSelectedImage(selectedImage === 0 ? totalImages - 1 : selectedImage - 1)}
                            >
                                <ChevronLeft className="w-5 h-5" />
                            </Button>
                            <Button
                                variant="ghost"
                                size="icon"
                                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white hover:bg-opacity-100 rounded-full shadow-md hover:cursor-pointer"
                                onClick={() => setSelectedImage(selectedImage === totalImages - 1 ? 0 : selectedImage + 1)}
                            >
                                <ChevronRight className="w-5 h-5" />
                            </Button>
                        </>
                    )}
                </div>

                {/* Thumbnails */}
                <div className="grid grid-cols-4 gap-2">
                    {images.slice(0, maxThumbnails).map((image, index) => {
                        const isLastThumbnail = index === maxThumbnails - 1
                        const showOverlay = isLastThumbnail && totalImages > maxThumbnails

                        return (
                            <button
                                key={index}
                                onClick={() => handleThumbnailClick(index)}
                                className={`border-2 rounded-lg overflow-hidden transition-all duration-200 relative ${selectedImage === index && !showOverlay
                                    ? "border-green-500 ring-2 ring-green-500"
                                    : "border-gray-200 hover:border-gray-400"
                                    }`}
                            >
                                <Image
                                    src={image || "/placeholder.svg"}
                                    alt={`${productName} ${index + 1}`}
                                    width={100}
                                    height={100}
                                    className="w-full h-20 object-cover"
                                />

                                {/* Overlay for remaining images */}
                                {showOverlay && (
                                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                                        <span className="text-white font-bold text-lg">+{remainingImages}</span>
                                    </div>
                                )}

                                {/* Active indicator */}
                                {selectedImage === index && !showOverlay && (
                                    <div className="absolute inset-0 bg-opacity-20 flex items-center justify-center">
                                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                                    </div>
                                )}
                            </button>
                        )
                    })}
                </div>

                {/* Image info */}
                {totalImages > 1 && (
                    <div className="mt-3 text-center text-sm text-gray-500">
                        {totalImages > maxThumbnails ? (
                            <>
                                Hiển thị {maxThumbnails} / {totalImages} ảnh -
                                <button
                                    onClick={() => setIsModalOpen(true)}
                                    className="text-green-600 hover:text-green-700 ml-1 underline"
                                >
                                    Xem tất cả
                                </button>
                            </>
                        ) : (
                            `Vuốt hoặc click để xem ${totalImages} ảnh`
                        )}
                    </div>
                )}
            </div>

            {/* Modal Album */}
            {isModalOpen && (
                <div className="fixed inset-0 backdrop-blur-sm bg-black/30 z-50 flex items-center justify-center p-4">
                    <div className="relative w-full max-w-4xl">
                        {/* Close button */}
                        <Button
                            variant="ghost"
                            size="icon"
                            className="absolute top-4 right-4 z-10 bg-white bg-opacity-20 hover:bg-opacity-30 text-white rounded-full"
                            onClick={() => setIsModalOpen(false)}
                        >
                            <X className="w-6 h-6" />
                        </Button>

                        {/* Main modal image */}
                        <div className="relative">
                            <Image
                                src={images[modalSelectedImage] || "/placeholder.svg"}
                                alt={`${productName} ${modalSelectedImage + 1}`}
                                width={800}
                                height={600}
                                className="w-full h-auto max-h-[70vh] object-contain rounded-lg"
                            />

                            {/* Modal navigation */}
                            <Button
                                variant="ghost"
                                size="icon"
                                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white bg-opacity-20 hover:bg-opacity-30 text-white rounded-full"
                                onClick={handleModalPrev}
                            >
                                <ChevronLeft className="w-6 h-6" />
                            </Button>
                            <Button
                                variant="ghost"
                                size="icon"
                                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white bg-opacity-20 hover:bg-opacity-30 text-white rounded-full"
                                onClick={handleModalNext}
                            >
                                <ChevronRight className="w-6 h-6" />
                            </Button>

                            {/* Modal image counter */}
                            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black bg-opacity-50 text-white px-4 py-2 rounded-full">
                                {modalSelectedImage + 1} / {totalImages}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}
