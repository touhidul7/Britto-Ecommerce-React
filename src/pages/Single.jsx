/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from "react";
import { Link, useOutletContext, useParams } from "react-router-dom";
import RelatedProduct from "../components/RelatedProduct";
import { CartContext } from "../context/CartContext";
import { IoLogoWhatsapp } from "react-icons/io";
import { RiMessengerLine } from "react-icons/ri";
import { FaCartShopping } from "react-icons/fa6";
// import ReactPixel from 'react-facebook-pixel';

const Single = () => {
  const { id } = useParams();
  const { isCartOpen, setIsCartOpen } = useOutletContext();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [relatedLoading, setRelatedLoading] = useState(true);
  const [selectedImg, setSelectedImg] = useState(null);
  const { cart, addToCart, orderNow } = useContext(CartContext);
  const isInCart = cart.some((item) => item.id === data?.id);
  const BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const IMAGE_URL = import.meta.env.VITE_API_IMAGE_URL;

  /* Track product view when data loads */
  useEffect(() => {

    if (data) {
      /* ReactPixel.track('ViewContent', {
        content_ids: [data.id],
        content_name: data.product_name,
        content_type: 'product',
        value: data.selling_price,
        currency: 'BDT',
        content_category: data.select_category
      }); */

      // Google Analytics view_item
      window.dataLayer.push({
        event: "view_item",
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

    }
  }, [data]);

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

  // Process colors from data
  const colors = data?.color
    ? data.color.split(",").map((color) => ({
        name: color.trim(),
        code: getColorCode(color.trim()),
      }))
    : [];

  // Initialize selectedColor state
  const [selectedColor, setSelectedColor] = useState(null);

  // Set default color when data loads
  useEffect(() => {
    if (data?.color) {
      const firstColor = data.color.split(",")[0].trim();
      setSelectedColor({
        name: firstColor,
        code: getColorCode(firstColor)
      });
    }
  }, [data]);

  /* Data loading functions */
  const loadData = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${BASE_URL}/products/${id}`);
      const result = await response.json();
      setData(result[0]);

      if (result[0].select_category) {
        loadRelatedProducts(result[0].select_category, result[0].id);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const loadRelatedProducts = async (select_category, currentProductId) => {
    setRelatedLoading(true);
    try {
      const response = await fetch(
        `${BASE_URL}/products/category/${select_category}`
      );
      const result = await response.json();
      const filteredProducts = result[0].filter(
        (product) => product.id !== parseInt(currentProductId)
      );
      setRelatedProducts(filteredProducts);
    } catch (error) {
      console.error("Error fetching related products:", error);
    } finally {
      setRelatedLoading(false);
    }
  };

  // Handlers for cart actions
  const handleAddToCart = () => {
    if (colors.length > 0 && !selectedColor) {
      alert("Please select a color first");
      return;
    }
    
    // Track AddToCart event
   /*  ReactPixel.track('AddToCart', {
      content_ids: [data.id],
      content_name: data.product_name,
      content_type: 'product',
      value: data.selling_price,
      currency: 'BDT',
      contents: [{
        id: data.id,
        quantity: 1,
        item_price: data.selling_price
      }]
    }); */

    // Google Analytics add_to_cart
/*     window.dataLayer.push({
      event: "add_to_cart",
      ecommerce: {
        items: [{
          item_id: data.id,
          item_name: data.product_name,
          price: data.selling_price,
          item_category: data.select_category,
          quantity: 1
        }]
      }
    }); */

    addToCart(data, selectedColor?.code || null);
    setIsCartOpen(!isCartOpen);
  };

  const handleOrderNow = () => {
    if (colors.length > 0 && !selectedColor) {
      alert("Please select a color first");
      return;
    }
    
    // Track InitiateCheckout event
    /* ReactPixel.track('InitiateCheckout', {
      content_ids: [data.id],
      content_name: data.product_name,
      content_type: 'product',
      value: data.selling_price,
      currency: 'BDT',
      contents: [{
        id: data.id,
        quantity: 1,
        item_price: data.selling_price
      }],
      num_items: 1
    }); */

    // Google Analytics begin_checkout
    /* window.dataLayer.push({
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
    }); */

    orderNow(data, selectedColor?.code || null);
  };

  useEffect(() => {
    loadData();
    setSelectedImg(null);
  }, [id]);

  return (
    <>
      {loading ? (
        <div className="loader-container">
          <div className="spinner"></div>
          <p>Loading product details...</p>
        </div>
      ) : (
        <div>
          <div className="bg-gray-100 py-8">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex flex-col md:flex-row -mx-4 align-center">
                <div className="md:flex-1 px-4">
                  <div className="lg:h-[460px] rounded-lg bg-white mb-4">
                    <img
                      className="w-full lg:h-full h-auto object-cover"
                      src={
                        selectedImg
                          ? `${IMAGE_URL}/admin/product/gallery/${selectedImg}`
                          : `${IMAGE_URL}/admin/product/${data.product_image}`
                      }
                      alt={data.product_name}
                    />
                  </div>
                  <div className="flex gap-4">
                    <button
                      onClick={() => setSelectedImg("")}
                      className="w-1/4 h-auto cursor-pointer hover:shadow-sm"
                    >
                      <img
                        src={`${IMAGE_URL}/admin/product/${data.product_image}`}
                        alt={`Product view`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                    {data?.image_gallary?.map((item, i) => (
                      <button
                        onClick={() => setSelectedImg(item)}
                        className="w-1/4 h-auto cursor-pointer hover:shadow-sm"
                        key={i}
                      >
                        <img
                          src={`${IMAGE_URL}/admin/product/gallery/${item}`}
                          alt={`Product view ${i + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                </div>
                <div className="md:flex-1 px-4">
                  <h2 className="text-2xl font-bold text-gray-800 mb-2">
                    {data.product_name}
                  </h2>
                  <p className="text-gray-600 text-sm mb-4">
                    {data.select_category}
                  </p>
                  <div className="flex mb-4">
                    <div className="mr-4">
                      <span className="font-bold text-gray-700">Price: </span>
                      <span className="text-gray-600 text-xl font-semibold">
                        ৳ {data.selling_price}
                      </span>
                      {data.regular_price && (
                        <span className="line-through ml-2 text-red-500 text-sm">
                          ৳{data.regular_price}
                        </span>
                      )}
                    </div>
                    <div>
                      <span className="font-bold text-gray-700">
                        Availability:{" "}
                      </span>
                      <span className="text-gray-600">{data.availability}</span>
                    </div>
                  </div>
                  <div>
                    <span className="font-bold text-gray-700">Product Description:</span>
                    <div className="text-gray-600 text-sm mt-2">
                      {data.p_short_des?.split(',').map((line, index) => (
                        <p key={index} className="mb-1">
                          {line.trim()}
                        </p>
                      ))}
                    </div>
                  </div>
                  {colors.length > 0 && (
                  <div className="mt-4">
                    <span className="font-bold text-gray-700">
                      Choose Color:
                    </span>
                    <div className="flex gap-2 mt-2">
                      {colors.map((color, index) => (
                        <button
                          key={index}
                          onClick={() => setSelectedColor(color)}
                          className={`w-8 h-8 rounded border-2 transition-all ${
                            selectedColor?.code === color.code
                              ? "border-black shadow-md"
                              : "border-gray-300"
                          } hover:shadow-sm`}
                          style={{ backgroundColor: color.code }}
                          title={color.name}
                          aria-label={`Select color ${color.name}`}
                        />
                      ))}
                    </div>
                    {selectedColor && (
                      <p className="text-sm text-gray-600 mt-1">
                        Selected: {selectedColor.name}
                      </p>
                    )}
                  </div>
                )}
                  <div className="flex justify-items-stretch gap-4 lg:-mx-2 mb-4 pt-8">
                    <div className="w-full">
                      {isInCart ? (
                        <button className="bg-[black] text-white font-bold h-full rounded-md hover:bg-[#313131] hover:text-white transition duration-300 cursor-pointer w-full">
                          <Link to="/cart" className="py-2 h-full px-4 w-full">
                            কার্ট দেখুন
                          </Link>
                        </button>
                      ) : (
                        <button
                          onClick={handleAddToCart}
                          className="bg-[black] text-white font-bold py-2 px-4 rounded-md hover:bg-[#313131] hover:text-white transition duration-300 cursor-pointer w-full"
                        >
                          কার্টে রাখুন
                        </button>
                      )}
                    </div>
                    <div className="w-full">
                      <button
                        onClick={handleOrderNow}
                        className="bg-[#ffff00] text-black font-bold py-2 px-4 rounded-md hover:bg-[#ffff00] hover:text-black transition duration-300 cursor-pointer w-full"
                      >
                        অর্ডার করুন
                      </button>
                    </div>
                  </div>
                  <div className="w-full my-4">
                    <button
                      onClick={handleOrderNow}
                      className="w-full bg-[#F69603] text-black py-2 px-4 font-bold hover:bg-[#f6a503] cursor-pointer flex gap-2 justify-center items-center transition-colors"
                    >
                      <FaCartShopping size={25} /> ক্যাশ অন ডেলিভারিতে অর্ডার
                      করুণ
                    </button>
                  </div>
                  <div className="w-full flex gap-2">
                    <Link
                      target="_blank"
                      to="https://wa.me/+8801851003265"
                      className="w-full bg-[#25D366] text-white py-2 px-4 font-bold hover:bg-[#25d365d0] cursor-pointer flex gap-2 justify-center items-center transition-colors"
                    >
                      <IoLogoWhatsapp size={25} /> WhatsApp
                    </Link>
                    <Link
                      target="_blank"
                      to="https://web.facebook.com/messages/t/116061797769426/"
                      className="w-full bg-[#0863F7] text-white py-2 px-4 font-bold hover:bg-[#0864f7c9] cursor-pointer flex gap-2 justify-center items-center transition-colors"
                    >
                      <RiMessengerLine size={25} /> Messenger
                    </Link>
                  </div>
                </div>
              </div>

              <div className="lg:py-8">
                <div className="text-2xl font-bold text-gray-800">
                  Description
                </div>
                <div className="mt-2 text-gray-700">
                  {data.product_description}
                </div>
              </div>
            </div>
          </div>

          <RelatedProduct products={relatedProducts} loading={relatedLoading} />
        </div>
      )}
    </>
  );
};

export default Single;