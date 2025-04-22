import React from "react";
import ProductSection from "./ProductSection";

const RelatedProduct = ({ products, loading }) => {
  // const { addToCart, orderNow } = useContext(CartContext);
  const IMAGE_URL = import.meta.env.VITE_API_IMAGE_URL;

  return (
    <div style={{ marginTop: "30px" }}>
      <div class="container mx-auto px-8">
    
        <div class="mb-4 flex items-center justify-between gap-4 md:mb-8">
          <h2 class="text-xl font-semibold text-gray-900  sm:text-2xl">
            Related Products
          </h2>

          <a
            href="#"
            title=""
            class="flex items-center text-base font-medium  hover:underline dark:text-primary-500"
          >
            See more products
            <svg
              class="ms-1 h-5 w-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M19 12H5m14 0-4 4m4-4-4-4"
              />
            </svg>
          </a>
        </div>
        <ProductSection data={products} loading={loading}/>
      </div>
    </div>
  );
};

export default RelatedProduct;
