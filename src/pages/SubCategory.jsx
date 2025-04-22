/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import ProductSection from "../components/ProductSection";

const SubCategory = () => {
  const { category, subCategory } = useParams();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const BASE_URL = import.meta.env.VITE_API_BASE_URL;

  const loadData = async () => {
    try {
      const response = await fetch(
        `${BASE_URL}/products/subByCategory/${subCategory}/${category}`
      );
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
  }, [subCategory, category]);

  return (
    <div>
      <div className="text-center p-10 bg-green-700">
        <h1 className="font-bold text-4xl mb-4 text-white">
          {subCategory.toUpperCase()}
        </h1>
      </div>
      <div className="mt-16 lg:px-8">
        <ProductSection loading={loading} data={data[0]} />
      </div>
    </div>
  );
};

export default SubCategory;
