/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import ProductSection from "../components/ProductSection";

const CategoryProduct = () => {
  const { id } = useParams();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const BASE_URL = import.meta.env.VITE_API_BASE_URL;

  const { addToCart } = useContext(CartContext);

  // Fetch data
  const loadData = async () => {
    try {
      const response = await fetch(`${BASE_URL}/products/category/${id}`);
      const result = await response.json();
      setData(result);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [id]);
  return (
    <div>
      <div class="text-center p-10 bg-green-700">
        <h1 class="font-bold text-4xl mb-4 text-white">{id.toUpperCase()}</h1>
      </div>
      <div className="mt-16 lg:px-8">
        <ProductSection loading={loading} data={data[0]} />
      </div>
    </div>
  );
};

export default CategoryProduct;
