"use client"

import { ChevronRight, Mail, Phone, Truck } from "lucide-react"
import { Button } from "../../components/ui/button"
import { Badge } from "../../components/ui/badge"
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import SearchIcon from '@mui/icons-material/Search';
import MenuIcon from '@mui/icons-material/Menu';
import { Input } from "../../components/ui/input"
import Link from "next/link";
import categories from "@/datalocals/categories";

export function Header() {
    return (
        <header className="flex flex-col items-center shadow-sm">
            {/* Top Bar */}
            <div className="bg-green-600 text-white w-full">
                <div className="container mx-auto w-full">
                    <div className="hidden w-full text-white text-base px-4 md:flex md:items-center md:justify-between md:text-sm">
                        <div className="md:flex md:items-center md:gap-4">
                            <div className="flex justify-start items-center gap-2 py-2 animate-pulse">
                                <Phone />
                                <p>Hotline: 1900-6789</p>
                            </div>
                            <div className="flex justify-start items-center gap-2 py-2 animate-pulse">
                                <Mail />
                                <p>info@vattunongnghiep.com</p>
                            </div>
                        </div>
                        <div className="flex justify-start items-center gap-2 py-2 animate-pulse">
                            <Truck />
                            <p>Giao hàng toàn quốc - Miễn phí từ 1 triệu</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main header */}
            <div className="w-full container">
                <div className="flex justify-between items-center p-4">
                    {/* Menu */}
                    <button className="w-[67px] xl:hidden">
                        <MenuIcon fontSize="large" />
                    </button>

                    {/* Logo */}
                    <div className="flex items-center gap-2">
                        <div className="w-14 h-14 text-2xl font-bold text-white bg-green-600 flex justify-center items-center rounded-lg">VT</div>
                        <div>
                            <h1 className="text-2xl font-bold text-green-600">Vật Tư</h1>
                            <p className="text-lg text-gray-500">Nông Nghiệp</p>
                        </div>
                    </div>

                    {/* Search */}
                    <div className="hidden lg:flex items-center gap-2 w-1/2">
                        <Input
                            type="text"
                            placeholder="Tìm kiếm sản phẩm..."
                            className="w-96 h-10 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 md:w-full md:h-10 md:text-md"
                        />
                        <Button variant="default" size={"lg"} className="hover:cursor-pointer">
                            <SearchIcon fontSize="medium" />
                        </Button>
                    </div>

                    {/* Actions */}
                    <div className="flex justify-between items-center gap-4">
                        <Button variant="ghost" size="lg" className="relative hover:cursor-pointer">
                            <ShoppingCartIcon fontSize="large" />
                            <Badge className="absolute -top-2 right-0 w-5 h-5 rounded-full p-0 flex items-center justify-center text-xs">
                                3
                            </Badge>
                        </Button>
                    </div>
                </div>

                {/* Search */}
                <div className="flex justify-center items-center gap-2 px-4 pb-4 lg:hidden">
                    <Input
                        type="text"
                        placeholder="Tìm kiếm sản phẩm..."
                        className="w-96 h-10 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 md:w-full md:h-12"
                    />
                    <Button variant="default" size={"lg"}>
                        <SearchIcon fontSize="medium" />
                    </Button>
                </div>
            </div>

            {/* Navigation */}
            <nav className="border-t w-full hidden xl:block">
                <div className="container mx-auto px-4">
                    <div className="hidden md:block">
                        <div className="flex items-center gap-2 py-4 uppercase">
                            <Link href="/" className="px-4 py-2 hover:text-green-600 hover:shadow-green-800 hover:shadow-2xl hover:rounded-xl font-medium">
                                Trang chủ
                            </Link>
                            <Link href="/products" className="px-4 py-2 hover:text-green-600 hover:shadow-green-800 hover:shadow-2xl hover:rounded-xl font-medium">
                                Sản phẩm
                            </Link>

                            <div className="relative group">
                                <button className="px-4 py-2 text-base uppercase hover:text-green-600 hover:shadow-green-800 hover:shadow-2xl hover:rounded-xl font-medium flex items-center">
                                    Danh mục
                                    <ChevronRight className="w-4 h-4 ml-1 transition-transform group-hover:rotate-90" />
                                </button>

                                {/* Main navigation */}
                                <div className="normal-case absolute top-full left-0 w-screen max-w-7xl bg-white shadow-2xl border-t-2 border-green-500 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                                    <div className={`grid grid-cols-${categories.length} gap-0`}>
                                        {categories.slice(0, 6).map((category, index) => (
                                            <div
                                                key={category.slug}
                                                className="p-6 border-r border-gray-100 last:border-r-0 hover:bg-green-50 transition-colors"
                                            >
                                                <Link
                                                    href={`/products?category=${category.slug}`}
                                                    className="font-semibold text-green-700 hover:text-green-800 mb-4 text-md flex items-center"
                                                >
                                                    {category.icon && (
                                                        <img src={category.icon} alt={category.name} className="w-6 h-6 mr-2" />
                                                    )}
                                                    {category.label}
                                                </Link>
                                                <div className="space-y-3">
                                                    {category.subCategories.slice(0, 5).map((sub) => (
                                                        <div key={sub.slug}>
                                                            <Link
                                                                href={`/products?category=${category.slug}&sub=${sub.slug}`}
                                                                className="block font-medium text-gray-700 hover:text-green-600 mb-2 text-sm"
                                                            >
                                                                {sub.name}
                                                            </Link>
                                                            <ul className="space-y-1">
                                                                {sub.items.slice(0, 4).map((item, itemIndex) => (
                                                                    <li key={itemIndex}>
                                                                        <Link
                                                                            href={`/products?search=${encodeURIComponent(item)}`}
                                                                            className="block text-xs text-gray-500 hover:text-green-600 py-1"
                                                                        >
                                                                            {item}
                                                                        </Link>
                                                                    </li>
                                                                ))}
                                                                {sub.items.length > 4 && (
                                                                    <li>
                                                                        <Link
                                                                            href={`/products?category=${category.slug}&sub=${sub.slug}`}
                                                                            className="block text-xs text-green-600 hover:text-green-700 py-1 font-medium"
                                                                        >
                                                                            Xem thêm ({sub.items.length - 4}+)
                                                                        </Link>
                                                                    </li>
                                                                )}
                                                            </ul>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <Link href="/about" className="px-4 py-2 hover:text-green-600 hover:shadow-green-800 hover:shadow-2xl hover:rounded-xl font-medium">
                                Giới thiệu
                            </Link>
                            <Link href="/contact" className="px-4 py-2 hover:text-green-600 hover:shadow-green-800 hover:shadow-2xl hover:rounded-xl font-medium">
                                Liên hệ
                            </Link>
                            <Link href="/news" className="px-4 py-2 hover:text-green-600 hover:shadow-green-800 hover:shadow-2xl hover:rounded-xl font-medium">
                                Tin tức
                            </Link>
                            <Link href="/handbook" className="px-4 py-2 hover:text-green-600 hover:shadow-green-800 hover:shadow-2xl hover:rounded-xl font-medium">
                                Sổ tay mùa vụ
                            </Link>
                        </div>
                    </div>
                </div>
            </nav>

        </header>
    )
}
