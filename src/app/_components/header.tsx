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
import React, { useState } from "react";
import MenuMobile from "./menu-mobile";

export function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

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
                    <button className="w-[67px] xl:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
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
                                <div className="normal-case absolute top-full left-0 w-screen max-w-xs bg-white shadow-2xl border-t-2 border-green-500 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                                    <div className="grid grid-cols-1 gap-0">
                                        {categories.slice(0, 6).map((category, index) => (
                                            <div
                                                key={category.slug}
                                                className="relative group/sub px-4 pt-4 border-r border-b border-gray-200 last:border-r-0 hover:bg-green-100 transition-colors"
                                            >
                                                <Link
                                                    href={`/products?category=${category.slug}`}
                                                    className="font-semibold text-green-700 hover:text-green-800 mb-4 text-lg flex items-center justify-between"
                                                >
                                                    <div className="flex items-center gap-2">
                                                        {category.icon && (
                                                            <img src={category.icon} alt={category.name} className="w-6 h-6" />
                                                        )}
                                                        {category.label}
                                                    </div>
                                                    {category.subCategories.length > 0 && (
                                                        <ChevronRight className="w-4 h-4 transition-transform group-hover/sub:rotate-90" />
                                                    )}
                                                </Link>

                                                {/* Level next */}
                                                {category.subCategories.length > 0 && (
                                                    <div className="absolute ml-1 left-full top-1/2 w-screen max-w-xs bg-white shadow-lg border-t-2 border-yellow-500 opacity-0 invisible group-hover/sub:opacity-100 group-hover/sub:visible transition-all duration-300">
                                                        <div className="grid grid-cols-1 gap-0">
                                                            {category.subCategories.map((subCategory) => (
                                                                <div className="relative group/subsub px-4 py-2 border-b border-gray-200 hover:bg-green-100 transition-colors" key={subCategory.slug}>
                                                                    <Link
                                                                        href={`/products?category=${subCategory.slug}`}
                                                                        className="text-green-700 hover:text-green-800 flex items-center justify-between gap-2"
                                                                    >
                                                                        {subCategory.name}
                                                                        {subCategory.items.length > 0 && (
                                                                            <ChevronRight className="w-4 h-4 transition-transform group-hover/subsub:rotate-90" />
                                                                        )}
                                                                    </Link>

                                                                    {/* Level next */}
                                                                    {subCategory.items.length > 0 && (
                                                                        <div className="absolute ml-1 left-full top-1/2 w-screen max-w-xs bg-white shadow-lg border-t-2 border-yellow-500 opacity-0 invisible group-hover/subsub:opacity-100 group-hover/subsub:visible transition-all duration-300">
                                                                            <div className="grid grid-cols-1 gap-0">
                                                                                {subCategory.items.map((item) => (
                                                                                    <div className="px-4 py-2 border-b border-gray-200 hover:bg-green-100 transition-colors" key={item}>
                                                                                        <Link
                                                                                            href={`/products?category=${item}`}
                                                                                            className="text-green-700 hover:text-green-800"
                                                                                        >
                                                                                            {item}
                                                                                        </Link>
                                                                                    </div>
                                                                                ))}
                                                                            </div>
                                                                        </div>
                                                                    )}
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                )}
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
            <MenuMobile isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
        </header>
    )
}
