"use client"

import CarouselBanner from '@/app/_components/carousel-banner';
import { Phone, Shield, Truck } from 'lucide-react';
import categories from '@/datalocals/categories';
import { products } from '@/datalocals/product';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Rating from '@mui/material/Rating';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import { motion } from "framer-motion";
import Image from 'next/image';


export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-green-600 to-green-800 text-white lg:bg-gradient-to-r">
        <div className='container mx-auto p-10 mb-10 grid place-items-center gap-6 lg:grid-cols-2'>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className='grid grid-cols-1 place-items-center gap-4 lg:place-items-start xl:gap-8'
          >
            <div className='flex flex-col items-center text-2xl font-bold lg:items-start xl:text-6xl'>
              <h1>Vật Tư Nông Nghiệp</h1>
              <h2 className="text-green-200">Chất lượng cao</h2>
            </div>
            <p className="text-lg text-center text-gray-300 lg:max-w-[90%] lg:text-left xl:max-w-full xl:text-xl">Cung cấp đầy đủ hạt giống, phân bón, thuốc BVTV và máy móc nông nghiệp chính hãng với giá cả cạnh tranh nhất thị trường.</p>
            <div className='flex flex-col lg:flex-row items-center gap-4'>
              <button className="bg-white text-green-600 px-6 py-3 rounded-md hover:bg-gray-200 hover:cursor-pointer transition duration-200 md:text-lg">
                Xem sản phẩm
              </button>
              <button className="border-1 text-white px-6 py-3 rounded-md hover:bg-gray-200 hover:text-green-600 hover:cursor-pointer transition duration-200 md:text-lg">
                Liên hệ tư vấn
              </button>
            </div>
          </motion.div>

          {/* List Banner (Auto Carousel) */}
          <div className='w-full md:place-items-center lg:w-3/4 lg:py-20'>
            <CarouselBanner />
          </div>
        </div>
      </section>

      {/* Featured Section */}
      <section className="grid grid-cols-1 gap-6 p-10 md:grid-cols-3 container mx-auto">
        {[
          {
            icon: <Truck className="text-green-600" size={32} />,
            title: "Giao hàng toàn quốc",
            desc: "Miễn phí vận chuyển cho đơn hàng trên 1 triệu đồng",
          },
          {
            icon: <Shield className="text-green-600" size={32} />,
            title: "Chính hãng 100%",
            desc: "Cam kết sản phẩm chính hãng, có nguồn gốc rõ ràng",
          },
          {
            icon: <Phone className="text-green-600" size={32} />,
            title: "Hỗ trợ 24/7",
            desc: "Đội ngũ chuyên gia tư vấn kỹ thuật miễn phí",
          },
        ].map((item, index) => (
          <div key={index} className="flex flex-col items-center gap-2">
            <motion.div
              animate={{ rotateY: [0, 360] }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "linear",
              }}
              className="bg-green-200 w-16 h-16 rounded-full flex justify-center items-center shadow-lg"
              style={{ perspective: 1000 }}
            >
              {item.icon}
            </motion.div>
            <h1 className="text-xl font-bold">{item.title}</h1>
            <p className="text-gray-500 text-center">{item.desc}</p>
          </div>
        ))}
      </section>

      {/* Categories Section */}
      <section className="py-10 ">
        <div className="container mx-auto px-4 flex flex-col items-center">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-2">Danh mục sản phẩm</h2>
            <p className="text-gray-600 max-w-2xl mx-4">
              Khám phá bộ sưu tập đa dạng các sản phẩm vật tư nông nghiệp chất lượng cao
            </p>
          </div>
          <div className="relative grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {/* Cross line */}
            <div className="hidden pointer-events-none absolute top-1/2 left-0 w-full h-0.5 bg-gray-300 z-10 md:block lg:hidden" />
            <div className="hidden pointer-events-none absolute top-0 left-1/2 h-full w-0.5 bg-gray-300 z-10 md:block lg:hidden" />

            {categories.slice(0, 4).map((category, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ amount: 0.3 }}
              >
                <Link key={index} href="/products" className="group flex flex-col items-center">
                  <Card className="overflow-hidden hover:shadow-xl hover:scale-105 transition-all duration-300 w-[90%] h-64 p-0 rounded-xl">
                    <CardContent className="w-full h-full p-0">
                      <div className="relative w-full h-full">
                        {/* Overlay tối */}
                        <div className="absolute inset-0 bg-black/50 z-10 rounded-xl"></div>

                        {/* Ảnh nền */}
                        <div
                          className="absolute inset-0 bg-cover bg-center"
                          style={{ backgroundImage: `url(${category.image})` || "/placeholder.svg" }}
                          onError={(e) => {
                            e.currentTarget.onerror = null
                            e.currentTarget.style.backgroundImage = 'url(/placeholder.svg)'
                          }}
                        ></div>

                        {/* Nội dung */}
                        <div className="relative z-20 text-center flex flex-col items-center justify-center h-full text-white px-4">
                          <h3 className="text-2xl font-extrabold uppercase tracking-wide drop-shadow-lg">
                            {category.name}
                          </h3>
                          <p className="text-lg mt-2 drop-shadow-md">{category.numberOfProducts} sản phẩm</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Product popular */}
      <section>
        <div className="container mx-auto px-4 py-10 flex flex-col items-center gap-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-2">Sản phẩm nổi bật</h2>
            <p className="text-gray-600 max-w-2xl mx-4">
              Những sản phẩm được khách hàng tin tưởng và lựa chọn nhiều nhất
            </p>
          </div>
          <div className="grid gap-6 w-full max-w-96 md:max-w-full md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {products.slice(0, 12).map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ amount: 0.3 }}
                className="relative"
              >
                <Link href={`/products/${product.id}`}>
                  <Card className="group hover:shadow-lg transition-shadow p-0 cursor-pointer h-full">
                    <CardContent className="p-4 h-full">
                      <div className="relative mb-4">
                        <Image
                          src={product.image}
                          alt={product.name}
                          width={300}
                          height={300}
                          className="w-full h-48 object-cover rounded-lg group-hover:scale-105 transition-transform"
                          onError={(e) => {
                            e.currentTarget.onerror = null
                            e.currentTarget.src = '/placeholder.svg'
                          }}
                        />
                        <Badge className="absolute top-4 right-2 bg-red-500">{product.badge}</Badge>
                      </div>
                      <h1 className="font-semibold mb-2 line-clamp-2 text-lg">{product.name}</h1>
                      <div className="flex items-center mb-2">
                        <div className="flex items-center">
                          <Rating name="read-only" defaultValue={product.rating} precision={0.5} readOnly />
                          <span className="text-sm text-gray-600 ml-1">
                            {product.rating} (100 lượt)
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="text-lg font-bold text-green-600">{product.price.toLocaleString()}đ</span>
                          {product.originalPrice && (
                            <span className="text-sm text-gray-500 line-through ml-2">
                              {product.originalPrice.toLocaleString()}đ
                            </span>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>

                {/* Button nằm ngoài Link để hoạt động được */}
                <Button
                  className='absolute bottom-4 right-4 bg-green-600 text-white rounded-full hover:bg-green-700 transition-colors w-12 h-12 hover:cursor-pointer'
                  onClick={() => alert(`Đã thêm ${product.name} vào giỏ hàng`)}
                >
                  <ShoppingBasketIcon fontSize='medium' />
                </Button>
              </motion.div>
            ))}
          </div>

          <Button className='bg-[#111827] w-auto text-md md:text-lg py-6 md:px-8 md:py-6 hover:cursor-pointer'>
            <Link href="/products">Xem tất cả sản phẩm</Link>
          </Button>
        </div>
      </section>

      {/* Consult */}
      <motion.section
        className="bg-green-600 text-white"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ amount: 0.3 }}
      >
        <div className="p-10 flex flex-col items-center justify-center gap-4 container mx-auto xl:py-20">
          <h2 className="text-2xl font-bold text-center">Bạn cần tư vấn về sản phẩm?</h2>
          <p className="text-lg text-gray-200 text-center">Đội ngũ chuyên gia của chúng tôi sẵn sàng hỗ trợ bạn 24/7</p>
          <div className='flex flex-col items-center gap-4 w-full md:flex-row md:justify-center'>
            <button className="w-2/3 bg-white text-green-600 px-6 py-3 rounded-md hover:bg-gray-200 hover:cursor-pointer transition duration-200 md:w-1/3 md:text-lg lg:w-1/4">
              Liên hệ ngay
            </button>
            <button className='w-2/3 border-1 text-white hover:bg-white hover:text-green-600 hover:cursor-pointer px-6 py-3 rounded-md transition duration-200 md:w-1/3 md:text-lg lg:w-1/4'>
              Chat với chuyên gia
            </button>
          </div>
        </div>
      </motion.section>
    </div>
  )
}
