"use client"

import React from "react";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { ArrowUpDown, Funnel, Grid, List } from "lucide-react";
import CartProduct from "./_components/CartProduct";
import products from "@/datalocals/product";
import { Pagination as PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious, Pagination } from "@/components/ui/pagination";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import categories from "@/datalocals/categories";
import Rating from "@mui/material/Rating";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import Link from "next/link";
import { useSearchParams } from "next/navigation";


const ProductPage = () => {
  const [viewMode, setViewMode] = React.useState<"grid" | "list">("grid")
  const [sortOption, setSortOption] = React.useState<"featured" | "newest" | "price-low" | "price-high" | "rating">("featured");
  const [selectedRating, setSelectedRating] = React.useState<number | null>(null);
  const [optionCategory, setOptionCategory] = React.useState<string | null>(null);

  const searchParams = useSearchParams();

  const categorySlug = searchParams.get("category");
  const subcategorySlug = searchParams.get("subcategory");
  const itemSlug = searchParams.get("item");

  // Tìm tên tương ứng từ categories
  const category = categories.find((c) => c.slug === categorySlug);
  const subcategory = category?.subCategories.find((sc) => sc.slug === subcategorySlug);
  const item = subcategory?.items.find((i) => i.slug === itemSlug);

  // Cập nhật optionCategory nếu có categorySlug
  React.useEffect(() => {
    if (categorySlug) {
      setOptionCategory(categorySlug);
    }
  }, [categorySlug]);

  return (
    <div className="container mx-auto">
      <div className="grid grid-cols-1 gap-4 p-4">

        {/* Breadcrunb */}
        <div>
          <Breadcrumb>
            <BreadcrumbList className="text-base">
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href="/">Trang chủ</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>

              <BreadcrumbSeparator />

              {
                category ? (
                  <BreadcrumbItem>
                    <BreadcrumbLink href="/products">Sản phẩm</BreadcrumbLink>
                  </BreadcrumbItem>
                ) : (
                  <BreadcrumbPage>Sản phẩm</BreadcrumbPage>
                )
              }

              {category && (
                <>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    {
                      subcategory ? (
                        <BreadcrumbLink href={`/products?category=${category.slug}`}>
                          {category.label}
                        </BreadcrumbLink>
                      ) : (
                        <BreadcrumbPage>{category.name}</BreadcrumbPage>
                      )
                    }
                  </BreadcrumbItem>
                </>
              )}

              {subcategory && (
                <>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    {
                      item ? (
                        <BreadcrumbLink href={`/products?category=${category?.slug}&subcategory=${subcategory.slug}`}>
                          {subcategory.name}
                        </BreadcrumbLink>
                      ) : (
                        <BreadcrumbPage>{subcategory.name}</BreadcrumbPage>
                      )
                    }
                  </BreadcrumbItem>
                </>
              )}

              {item && (
                <>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbPage>{item.name}</BreadcrumbPage>
                  </BreadcrumbItem>
                </>
              )}
            </BreadcrumbList>
          </Breadcrumb>
        </div>

        {/* Title */}
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold">Danh sách sản phẩm vật tư nông nghiệp</h1>
          <p className="text-gray-600 text-lg">Hãy tìm những sản phẩm phù hợp với nhu cầu của bạn</p>
        </div>

        <div className="grid grid-cols-4 gap-8 w-full">
          {/* Bộ lộc */}
          <div className="col-span-1 w-full border rounded-lg border-gray-300 shadow-xl bg-white h-fit xl:p-6">
            <h3 className="font-bold mb-4 flex items-center text-xl">
              <Funnel className="w-4 h-4 mr-2" />
              Bộ lọc
            </h3>

            {/* Categories */}
            <div className="mb-6">
              <h4 className="font-medium mb-3">Danh mục</h4>
              <div className="flex flex-col gap-2">
                <Label className="flex items-center space-x-2 cursor-pointer">
                  <Checkbox
                    checked={optionCategory === null}
                    onCheckedChange={() => setOptionCategory(null)}
                  />
                  <span className="text-sm">Tất cả</span>
                </Label>
                {categories.map((category) => (
                  <Label key={category.id} className="flex items-center space-x-2 cursor-pointer">
                    <Checkbox
                      checked={optionCategory === category.slug}
                      onCheckedChange={() =>
                        setOptionCategory((prev) => (prev === category.slug ? null : category.slug))
                      }
                    />
                    <span className="text-sm">{category.name}</span>
                  </Label>
                ))}
              </div>
            </div>

            {/* Rating */}
            <div className="mb-6">
              <h4 className="font-medium mb-3">Đánh giá</h4>
              <div className="flex flex-col gap-2">
                {[5, 4, 3, 2, 1].map((rating) => (
                  <Label key={rating} className="flex items-center space-x-2 cursor-pointer">
                    <Checkbox
                      checked={selectedRating === rating}
                      onCheckedChange={() =>
                        setSelectedRating((prev) => (prev === rating ? null : rating))
                      }
                    />
                    <Rating
                      name={`rating-${rating}`}
                      value={rating}
                      readOnly
                      precision={0.5}
                      size="small"
                      className="text-yellow-500"
                    />
                    <span className="text-sm">{rating} sao</span>
                  </Label>
                ))}
              </div>
            </div>
          </div>

          {/* Section list sản phẩm */}
          <div className="col-span-3 w-full flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Button
                  variant={viewMode === "grid" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setViewMode("grid")}
                  className="hover:cursor-pointer"
                >
                  <Grid className="w-5 h-5" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setViewMode("list")}
                  className="hover:cursor-pointer"
                >
                  <List className="w-5 h-5" />
                </Button>
              </div>
              <div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline">
                      <ArrowUpDown className="w-4 h-4 mr-2" />
                      Sắp xếp theo
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuRadioGroup
                      value={sortOption}
                      onValueChange={(value) =>
                        setSortOption(value as "featured" | "newest" | "price-low" | "price-high" | "rating")
                      }
                    >
                      <DropdownMenuRadioItem value="featured">Nổi bật</DropdownMenuRadioItem>
                      <DropdownMenuRadioItem value="newest">Mới nhất</DropdownMenuRadioItem>
                      <DropdownMenuRadioItem value="price-low">Giá: Thấp đến cao</DropdownMenuRadioItem>
                      <DropdownMenuRadioItem value="price-high">Giá: Cao đến thấp</DropdownMenuRadioItem>
                      <DropdownMenuRadioItem value="rating">Đánh giá cao nhất</DropdownMenuRadioItem>
                    </DropdownMenuRadioGroup>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>

            {/* List sản phẩm */}
            <div className={`grid ${viewMode === "grid" ? "grid-cols-4" : "grid-cols-1"} gap-4`}>
              {products.map((product) => (
                <CartProduct key={product.id} product={product} />
              ))}
            </div>

            {/* Pagination */}
            <div className="mt-10">

            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductPage;