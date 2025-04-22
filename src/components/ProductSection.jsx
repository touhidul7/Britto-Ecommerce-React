/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useState } from "react";
import { CartContext } from "../context/CartContext";
import Loader from "./Loader";
import { Link, useOutletContext } from "react-router-dom";
import { X } from "lucide-react";

const ProductSection = ({ loading, data, className }) => {
  const { isCartOpen, setIsCartOpen } = useOutletContext();
  const IMAGE_URL = import.meta.env.VITE_API_IMAGE_URL;
  const [cartItems, setCartItems] = useState(new Set());
  const {
    addToCart,
    orderNow,
    cart,
  } = useContext(CartContext);
  const [selectedColors, setSelectedColors] = useState({});
  const [quantities, setQuantities] = useState({});

  /* Color handling functions */
  const getColorCode = (colorName) => {
    const colorMap = {
      yellow: "#FFFF00",
      blue: "#0000FF",
      gray: "#808080",
      red: "#FF0000",
      green: "#008000",
      black: "#000000",
      white: "#FFFFFF",
      orange: "#FFA500",
      purple: "#800080",
      pink: "#FFC0CB",
      brown: "#A52A2A",
    };
    const normalizedColor = colorName?.toLowerCase().trim();
    return colorMap[normalizedColor] || "#CCCCCC";
  };

  // Process colors for each product
  const processProductColors = (product) => {
    if (!product.color) return [];
    return product.color.split(",").map((color) => ({
      name: color.trim(),
      code: getColorCode(color.trim()),
    }));
  };

  // Initialize selected colors and quantities when data loads
  useEffect(() => {
    if (data) {
      const initialColors = {};
      const initialQuantities = {};

      data.forEach((item) => {
        const colors = processProductColors(item);
        if (colors.length > 0) {
          initialColors[item.id] = colors[0].code;
        }
        initialQuantities[item.id] = 1;
      });

      setSelectedColors(initialColors);
      setQuantities(initialQuantities);
    }
  }, [data]);

  // Update cart items when cart changes
  useEffect(() => {
    const cartItemIds = new Set(cart.map((item) => item.id));
    setCartItems(cartItemIds);

    // Update quantities from cart
    const newQuantities = {};
    cart.forEach(item => {
      newQuantities[item.id] = item.quantity;
    });
    setQuantities(prev => ({ ...prev, ...newQuantities }));
  }, [cart]);

  // Handle color selection
  const handleColorSelect = (productId, colorCode) => {
    setSelectedColors((prev) => ({
      ...prev,
      [productId]: colorCode,
    }));
  };

  /*   const pushordernow = (data) => {
      window.dataLayer.push({
        event: "begin_checkout",
        ecommerce: {
          items: [{
            item_id: data.id,
            item_name: data.product_name,
            price: data.selling_price,
            item_category: data.select_category,
            quantity: 1
          }]
        }
      });
    } */


  // Enhanced cart handlers with color validation
  /*   const handleAddToCart = (item) => {
      const colors = processProductColors(item);
      if (colors.length > 0 && !selectedColors[item.id]) {
        alert("Please select a color first");
        return;
      }
      
      addToCart({
        ...item,
        selectedColor: selectedColors[item.id] || null,
        quantity: quantities[item.id] || 1
      });
      setIsCartOpen(!isCartOpen);
    }; */

  /*   const handleOrderNow = (item) => {
      const colors = processProductColors(item);
      if (colors.length > 0 && !selectedColors[item.id]) {
        alert("Please select a color first");
        return;
      }
      orderNow({
        ...item,
        selectedColor: selectedColors[item.id] || null,
        quantity: quantities[item.id] || 1
      });
    }; */
  console.log(selectedColors);

  const formatUrl = (str) => {
    if (!str) return 'product'; // Fallback for null/undefined
    return str
      .toString() // Ensure it's a string
      .replace(/\s+/g, '-') // Replace spaces with hyphens
      .replace(/[^a-zA-Z0-9-]/g, '') // Remove special characters
      .toLowerCase();
  };

  return (
    <>
      <div
        className={`grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2 lg:gap-4 lg:px-10 ${className}`}
      >
        {loading ? (
          <Loader />
        ) : (
          <>
            {data?.map((item) => {
              const colors = processProductColors(item);
              const hasColors = colors.length > 0;
              const isInCart = cartItems.has(item.id);
              const currentQuantity = quantities[item.id] || 1;

              return (
                <div
                  key={item.id}
                  className="bg-white border-1 border-gray-100 p-2 rounded-lg shadow-lg hover:shadow-2xl transition duration-300 ease-in-out transform hover:scale-100"
                >
                  <Link to={`/product/${item.id}/${formatUrl(item.product_name)}`}>
                    <img
                      className="w-full lg:h-40 h-36 rounded-lg object-cover"
                      src={
                        item.product_image
                          ? `${IMAGE_URL}/admin/product/${item.product_image}`
                          : "https://adaptcommunitynetwork.org/wp-content/uploads/2022/01/ef3-placeholder-image.jpg"
                      }
                      alt={item.product_name}
                    />
                  </Link>

                  <Link to={`/product/${item.id}/${formatUrl(item.product_name)}`}>
                    <h3 className="text-lg font-semibold text-gray-800 mt-4">
                      {item.product_name?.substring(0, 27) || "No Name Available"}
                    </h3>
                  </Link>
                  <p className="text-sm text-gray-600 mt-1">{item.select_category}</p>
                  <p className="text-xl font-semibold text-gray-900 mt-2">
                    <span className="line-through mr-4 text-red-500">৳ {item.regular_price}</span>{" "}
                    <span>৳{item.selling_price}</span>
                  </p>

                  {/* Color Selection */}
                  {hasColors && (
                    <div className="mt-2">
                      <div className="flex gap-1 flex-wrap">
                        {colors?.map((color, index) => (
                          <button
                            key={index}
                            onClick={() => handleColorSelect(item.id, color.code)}
                            className={`w-6 h-6 rounded border-2 cursor-pointer ${selectedColors[item.id] === color.code
                              ? "border-gray-400"
                              : "border-gray-300"
                              }`}
                            style={{ backgroundColor: color.code }}
                            title={color.name}
                          />
                        ))}
                      </div>
                    </div>
                  )}



                  <div className="mt-3 flex flex-col gap-2 items-stretch">
                    {isInCart ? (
                      <div className="flex flex-col gap-2">
                        <Link
                          to="/cart"
                          className="bg-black text-white font-bold py-2 px-4 rounded-md hover:bg-[#313131] hover:text-white transition duration-300 cursor-pointer text-center"
                        >
                          কার্ট দেখুন
                        </Link>
                      </div>
                    ) : (
                      <button
                        onClick={() => { addToCart(item, selectedColors[item.id]); setIsCartOpen(!isCartOpen) }}
                        className="bg-black text-white font-bold py-2 px-4 rounded-md hover:bg-[#313131] hover:text-white transition duration-300 cursor-pointer text-center"
                      >
                        কার্টে রাখুন
                      </button>
                    )}

                    <button
                      onClick={() => orderNow(item, selectedColors[item.id])}
                      className="bg-[#ffff00] text-black font-bold py-2 px-4 rounded-md hover:bg-[#ffff00] hover:text-black transition duration-300 cursor-pointer"
                    >
                      অর্ডার করুন
                    </button>
                  </div>
                </div>
              );
            })}
          </>
        )}
      </div>
    </>
  );
};

export default ProductSection;



