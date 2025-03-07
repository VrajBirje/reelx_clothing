"use client";
import React, { useEffect, useState } from "react";
import CardBox from "@/components/shared/card";
import "./page.css";
import FlyingBird from "@/components/animatedLogo";
interface Product {
  product_id: number;
  name: string;
  price: number;
  discountedprice: number;
  category: string;
  color: string;
  size: string;
  tag: string;
  images: string[];
}

const Page: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [page, setPage] = useState<number>(1);
  const limit: number = 12; // Default limit
  const [sortBy, setSortBy] = useState<string>("desc"); // Default sorting
  const [category, setCategory] = useState<string>(""); // Default category
  const [totalPages, setTotalPages] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false); // Loading state
  // Fetch products from API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);

        const queryParams = new URLSearchParams({
          page: page.toString(),
          limit: limit.toString(),
          ...(sortBy ? { sort: sortBy } : {}),
          ...(category ? { category_id: category } : {}),
        });

        console.log("Fetching Products:", queryParams.toString());

        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products/products/paginated2?${queryParams}`);
        const data = await response.json();

        console.log("API Response:", data);

        if (data.success) {
          setProducts(data.data.products || []);
          setTotalPages(data.totalPages || Math.ceil((data.data.total || 1) / limit));
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [page, sortBy, category]); // Fetch data on any change


  return (
    <div className="shop flex flex-col bg-white px-[4%] w-full">
      <div className="shopright w-[100%] flex flex-col justify-start">
        {/* Filters */}
        <div className="w-full flex justify-between my-4">
          {/* Category Filter */}
          <select
            className="text-sm border border-black w-[200px] py-2 px-4"
            value={category}
            onChange={(e) => {
              setCategory(e.target.value);
              setPage(1); // Reset to page 1 when category changes
            }}
          >
            <option value="">All Categories</option>
            <option value="1">Minimals</option>
            <option value="1">Street Wear</option>
            <option value="2">Combos</option>
          </select>

          {/* Sorting Filter */}
          <select
            className="text-sm border w-[200px] border-white text-white bg-black py-1 px-4"
            value={sortBy}
            onChange={(e) => {
              setSortBy(e.target.value);
              setPage(1); // Reset to page 1 when sorting changes
            }}
          >
            <option value="desc">Price (High to Low)</option>
            <option value="asc">Price (Low to High)</option>
          </select>
        </div>

        {/* Products Grid */}
        <div className="w-full flex flex-wrap justify-between gap-4">
          {loading ? (
            <FlyingBird />
          ) : products.length > 0 ? (
            products.map((product) => (
              <div key={product.product_id} className="shopcardbox">
                <CardBox
                  product_id={product.product_id}
                  name={product.name}
                  price={product.discountedprice}
                  discountedPrice={product.price}
                  image={product.images?.[0] || "/assets/img4.png"}
                  tag={product.tag}
                />
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500">No products found.</p>
          )}
        </div>

        {/* Pagination Controls */}
        <div className="w-full flex justify-center my-6 gap-4">
          <button
            className="bg-gray-300 px-4 py-2 rounded-md"
            disabled={page <= 1}
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          >
            Previous
          </button>
          <span className="text-lg font-semibold">
            {page} / {totalPages}
          </span>
          <button
            className="bg-gray-300 px-4 py-2 rounded-md"
            disabled={page >= totalPages}
            onClick={() => setPage((prev) => prev + 1)} // Fixed next button
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Page;
