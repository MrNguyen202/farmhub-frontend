"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import categories from "@/datalocals/categories";
import { ChevronDown, ChevronRight } from "lucide-react";
import Link from "next/link";

interface MobileMenuProps {
    isOpen: boolean
    onClose: () => void
}

const MenuMobile = ({ isOpen, onClose }: MobileMenuProps) => {
    const [openCategories, setOpenCategories] = useState<string[]>([])
    const [openSubcategories, setOpenSubcategories] = useState<string[]>([])

    const toggleCategory = (slug: string) => {
        setOpenCategories((prev) => (prev.includes(slug) ? prev.filter((s) => s !== slug) : [...prev, slug]))
    }

    const toggleSubcategory = (slug: string) => {
        setOpenSubcategories((prev) => (prev.includes(slug) ? prev.filter((s) => s !== slug) : [...prev, slug]))
    }
    
    
    return (
        <div
            className={`fixed inset-0 z-50 xl:hidde bg-opacity-50 transition-opacity duration-300 ${isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
            onClick={onClose}
        >
            <div onClick={(e) => e.stopPropagation()}
                className={`fixed inset-y-0 left-0 w-[80%] bg-white shadow-xl overflow-y-auto transform transition-transform duration-300 ease-in-out ${isOpen ? "translate-x-0" : "-translate-x-full"} md:w-[60%] `}
            >
                <div className="p-4 border-b">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <div className="w-14 h-14 text-2xl font-bold text-white bg-green-600 flex justify-center items-center rounded-lg">VT</div>
                            <div>
                                <h1 className="text-2xl font-bold text-green-600">Vật Tư</h1>
                                <p className="text-lg text-gray-500">Nông Nghiệp</p>
                            </div>
                        </div>
                        <Button variant="ghost" size="sm" onClick={onClose}>
                            ✕
                        </Button>
                    </div>
                </div>

                <div className="p-4">
                    <nav className="space-y-2">
                        <Link href="/" className="flex items-center py-2 gap-2 font-bold text-gray-700 hover:text-green-600" onClick={onClose}>
                            <img src="/icons/home.webp" alt="" className="w-10 h-10" />
                            Trang chủ
                        </Link>
                        <Link href="/products" className="flex items-center gap-2 font-bold py-2 text-gray-700 hover:text-green-600" onClick={onClose}>
                            <img src="/icons/product.jpg" alt="" className="w-10 h-10" />
                            Sản phẩm
                        </Link>

                        {/* Categories */}
                        {categories.map((category) => (
                            <Collapsible key={category.slug} open={openCategories.includes(category.slug)}>
                                <CollapsibleTrigger
                                    className="flex items-center justify-between w-full py-2 text-left text-gray-700 hover:text-green-600"
                                    onClick={() => toggleCategory(category.slug)}
                                >
                                    <div className="flex items-center gap-2">
                                        {category.icon && (
                                            <img src={category.icon} alt={category.name} className="w-10 h-10" />
                                        )}
                                        <span className="font-bold">{category.label}</span>
                                    </div>
                                    <ChevronDown
                                        className={`w-4 h-4 transition-transform ${openCategories.includes(category.slug) ? "rotate-180" : ""}`}
                                    />
                                </CollapsibleTrigger>
                                <CollapsibleContent className="pl-4 space-y-1 border-l-2 border-green-800 ml-5">
                                    {category.subCategories.map((sub) => (
                                        <Collapsible key={sub.slug} open={openSubcategories.includes(sub.slug)}>
                                            <CollapsibleTrigger
                                                className="flex items-center justify-between w-full py-1 text-left text-gray-600 hover:text-green-600"
                                                onClick={() => toggleSubcategory(sub.slug)}
                                            >
                                                <span className="text-green-600 font-medium">{sub.name}</span>
                                                <ChevronRight
                                                    className={`w-3 h-3 transition-transform ${openSubcategories.includes(sub.slug) ? "rotate-90" : ""}`}
                                                />
                                            </CollapsibleTrigger>
                                            <CollapsibleContent className="pl-4 space-y-1">
                                                {sub.items.map((item, index) => (
                                                    <Link
                                                        key={index}
                                                        href={`/products?category=${category.slug}&subcategory=${sub.slug}&item=${item.slug}`}
                                                        className="block py-1 text-gray-500 hover:text-green-600"
                                                        onClick={onClose}
                                                    >
                                                        {item.name}
                                                    </Link>
                                                ))}
                                            </CollapsibleContent>
                                        </Collapsible>
                                    ))}
                                </CollapsibleContent>
                            </Collapsible>
                        ))}

                        <Link href="/about" className="flex items-center gap-2 font-bold py-2 text-gray-700 hover:text-green-600" onClick={onClose}>
                            <img src="/icons/introdution.jpg" alt="" className="w-10 h-10" />
                            Giới thiệu
                        </Link>
                        <Link href="/contact" className="flex items-center gap-2 font-bold py-2 text-gray-700 hover:text-green-600" onClick={onClose}>
                            <img src="/icons/helpdesk.gif" alt="" className="w-10 h-10" />
                            Liên hệ
                        </Link>
                        <Link href="/news" className="flex items-center gap-2 font-bold  py-2 text-gray-700 hover:text-green-600" onClick={onClose}>
                            <img src="/icons/newspaper.png" alt="" className="w-10 h-10" />
                            Tin tức
                        </Link>
                        <Link href="/handbook" className="flex items-center gap-2 font-bold py-2 text-gray-700 hover:text-green-600" onClick={onClose}>
                            <img src="/icons/hand-notebook.jpg" alt="" className="w-10 h-10" />
                            Sổ tay mùa vụ
                        </Link>
                    </nav>
                </div>
            </div>
        </div>
    );
}

export default MenuMobile;