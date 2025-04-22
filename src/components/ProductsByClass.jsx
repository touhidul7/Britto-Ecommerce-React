import React, { useEffect, useState } from "react";
import ProductSection from "./ProductSection";
import { Link } from "react-router-dom";

const ProductsByClass = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const BASE_URL = import.meta.env.VITE_API_BASE_URL;

  // Fetch data
  const loadData = async () => {
    try {
      const response = await fetch(`${BASE_URL}/products`);
      const result = await response.json();
      setData(result[0]); // Access the array of products from the "0" property
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // Filter products by class
  const popularProducts = data.filter(product => product.type === "Popular Products");
  const newArrivalProducts = data.filter(product => product.type === "New Arrival");
  const trandingProducts = data.filter(product => product.type === "Tranding Product");

  return (
    <div style={{ marginTop: "50px" }}>
      <div className="container mx-auto lg:px-8 px-2">
        <div className="mb-4 flex lg:px-10 items-center justify-between gap-4 md:mb-8">
          <h2 className="text-xl font-semibold text-gray-900 sm:text-2xl">
            Popular Products
          </h2>
          <Link
            to={"/shop"}
            className="flex items-center text-base font-medium text-gray-900 hover:underline"
          >
            See more products
            <svg
              className="ms-1 h-5 w-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 12H5m14 0-4 4m4-4-4-4"
              />
            </svg>
          </Link>
        </div>
        
        <ProductSection loading={loading} data={popularProducts}/>
      </div>
      
      <div className="container mx-auto lg:px-8 px-2 mt-8">
        <div className="mb-4 flex lg:px-10 items-center justify-between gap-4 md:mb-8">
          <h2 className="text-xl font-semibold text-gray-900 sm:text-2xl">
            New Arrival
          </h2>
        </div>
        
        <ProductSection loading={loading} data={newArrivalProducts}/>
      </div>
      
      <div className="container mx-auto lg:px-8 px-2 mt-8">
        <div className="mb-4 flex lg:px-10 items-center justify-between gap-4 md:mb-8">
          <h2 className="text-xl font-semibold text-gray-900 sm:text-2xl">
            Tranding Product
          </h2>
        </div>
        
        <ProductSection loading={loading} data={trandingProducts}/>
      </div>
    </div>
  );
};

export default ProductsByClass;