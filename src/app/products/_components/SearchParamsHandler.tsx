"use client";

import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import categories from "@/datalocals/categories";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import Link from "next/link";

export default function SearchParamsHandler({ setOptionCategory }: { setOptionCategory: (value: string | null) => void }) {
    const searchParams = useSearchParams();
    const categorySlug = searchParams.get("category");
    const subcategorySlug = searchParams.get("subcategory");
    const typeSlug = searchParams.get("type");

    // Tìm tên tương ứng từ categories
    const category = categories.find((c) => c.slug === categorySlug);
    const subcategory = category?.subCategories.find((sc) => sc.slug === subcategorySlug);
    const type = subcategory?.types.find((t) => t.slug === typeSlug);

    // Cập nhật optionCategory khi categorySlug thay đổi
    useEffect(() => {
        setOptionCategory(categorySlug);
    }, [categorySlug, setOptionCategory]);

    return (
        <Breadcrumb>
            <BreadcrumbList className="text-base">
                <BreadcrumbItem>
                    <BreadcrumbLink asChild>
                        <Link href="/">Trang chủ</Link>
                    </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                {category ? (
                    <BreadcrumbItem>
                        <BreadcrumbLink href="/products">Sản phẩm</BreadcrumbLink>
                    </BreadcrumbItem>
                ) : (
                    <BreadcrumbPage>Sản phẩm</BreadcrumbPage>
                )}
                {category && (
                    <>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            {subcategory ? (
                                <BreadcrumbLink href={`/products?category=${category.slug}`}>
                                    {category.name}
                                </BreadcrumbLink>
                            ) : (
                                <BreadcrumbPage>{category.name}</BreadcrumbPage>
                            )}
                        </BreadcrumbItem>
                    </>
                )}
                {subcategory && (
                    <>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            {type ? (
                                <BreadcrumbLink href={`/products?category=${category?.slug}&subcategory=${subcategory.slug}`}>
                                    {subcategory.name}
                                </BreadcrumbLink>
                            ) : (
                                <BreadcrumbPage>{subcategory.name}</BreadcrumbPage>
                            )}
                        </BreadcrumbItem>
                    </>
                )}
                {type && (
                    <>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbPage>{type.name}</BreadcrumbPage>
                        </BreadcrumbItem>
                    </>
                )}
            </BreadcrumbList>
        </Breadcrumb>
    );
}