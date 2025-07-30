"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { ArrowUpDown, Funnel, Grid, List } from "lucide-react";
import CartProduct from "./_components/CartProduct";
import { products } from "@/datalocals/product";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import categories from "@/datalocals/categories";
import Rating from "@mui/material/Rating";
import Stack from "@mui/material/Stack";
import Pagination from "@mui/material/Pagination";
import Modal from "@mui/material/Modal";
import { Suspense } from "react";
import SearchParamsHandler from "./_components/SearchParamsHandler";

const ProductPage = () => {
  const [viewMode, setViewMode] = React.useState<"grid" | "list">("grid");
  const [sortOption, setSortOption] = React.useState<"featured" | "newest" | "price-low" | "price-high" | "rating">("featured");
  const [selectedRating, setSelectedRating] = React.useState<number | null>(null);
  const [optionCategory, setOptionCategory] = React.useState<string | null>(null);
  const [page, setPage] = React.useState(1);
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className="container mx-auto mb-10">
      <div className="grid grid-cols-1 gap-4 p-4">
        {/* Breadcrumb được bọc trong Suspense */}
        <Suspense fallback={<p>Đang tải breadcrumb...</p>}>
          <SearchParamsHandler setOptionCategory={setOptionCategory} />
        </Suspense>

        {/* Title */}
        <div className="flex flex-col gap-2">
          <h1 className="text-xl text-center xl:text-3xl font-bold sm:text-left">Danh sách sản phẩm vật tư nông nghiệp</h1>
          <p className="text-base text-center text-gray-600 sm:text-left xl:text-lg">Hãy tìm những sản phẩm phù hợp với nhu cầu của bạn</p>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-4 gap-8 w-full">
          {/* Bộ lọc */}
          <div className="hidden col-span-1 w-full border rounded-lg border-gray-300 shadow-xl bg-white h-fit xl:p-6 xl:block">
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

          {/* Section danh sách sản phẩm */}
          <div className="xl:col-span-3 w-full flex flex-col gap-4 max-w-md place-self-center md:max-w-none xl:place-self-start">
            <div className="flex items-center justify-between">
              <div className="hidden md:flex items-center gap-2">
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
              <div className="flex items-center justify-between w-full gap-2 md:w-auto">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline">
                      <ArrowUpDown className="w-4 h-4 mr-2" />
                      Sắp xếp theo
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="m-0">
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

                <div className="xl:hidden">
                  <Button variant="outline" onClick={handleOpen}>
                    <Funnel className="w-4 h-4" />
                  </Button>
                  <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="parent-modal-title"
                    aria-describedby="parent-modal-description"
                    className="flex items-center justify-center m-8"
                  >
                    <div className="flex flex-col justify-center items-center bg-white w-full rounded-lg p-4 md:w-2/3">
                      <div className="mb-6 w-full">
                        <h4 className="font-medium mb-3 text-xl">Danh mục</h4>
                        <div className="flex flex-col gap-3">
                          <Label className="flex items-center space-x-2 cursor-pointer">
                            <Checkbox
                              checked={optionCategory === null}
                              onCheckedChange={() => setOptionCategory(null)}
                            />
                            <span className="text-base">Tất cả</span>
                          </Label>
                          {categories.map((category) => (
                            <Label key={category.id} className="flex items-center space-x-2 cursor-pointer">
                              <Checkbox
                                checked={optionCategory === category.slug}
                                onCheckedChange={() =>
                                  setOptionCategory((prev) => (prev === category.slug ? null : category.slug))
                                }
                              />
                              <span className="text-base">{category.name}</span>
                            </Label>
                          ))}
                        </div>
                      </div>

                      {/* Rating */}
                      <div className="mb-6 w-full">
                        <h4 className="font-medium mb-3 text-xl">Đánh giá</h4>
                        <div className="flex flex-col gap-3">
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
                                size="medium"
                                className="text-yellow-500"
                              />
                              <span className="text-base">{rating} sao</span>
                            </Label>
                          ))}
                        </div>
                      </div>
                      <Button variant="outline" onClick={handleClose} className="mt-4 text-base">
                        Đóng
                      </Button>
                    </div>
                  </Modal>
                </div>
              </div>
            </div>

            {/* List sản phẩm */}
            <div className={`grid grid-cols-1 ${viewMode === "grid" ? "md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4" : "grid-cols-1"} gap-4`}>
              {products.slice((page - 1) * 12, page * 12).map((product) => (
                <CartProduct key={product.id} product={product} viewMode={viewMode} />
              ))}
            </div>

            {/* Pagination */}
            {products.length / 12 > 1 && (
              <div className="mt-5 place-self-center">
                <Stack spacing={2}>
                  <Pagination
                    size="large"
                    count={Math.ceil(products.length / 12)}
                    color="secondary"
                    page={page}
                    onChange={(event, value) => setPage(value)}
                  />
                </Stack>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;