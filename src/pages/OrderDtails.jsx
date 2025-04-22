/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Loader from "../components/Loader";
const OrderDtails = () => {
  const [orderData, setOrderData] = useState(null);
  const [loading, setLoading] = useState(true);
  const BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const [getUser, setGetUser] = useState(null);
  const { id } = useParams(); // Get the order_id from URL params
  const IMAGE_URL = import.meta.env.VITE_API_IMAGE_URL;

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setGetUser(parsedUser.user);
      } catch (error) {
        console.error("Error parsing user data:", error);
      }
    }
  }, []);

  const loadData = async () => {
    if (!getUser?.uid) return; // Prevent fetching with invalid user
    try {
      const response = await fetch(`${BASE_URL}/order/${getUser.uid}`);
      if (!response.ok) throw new Error("Failed to fetch");
      const result = await response.json();

      // Find the specific order by order_id
      const specificOrder = result.data.find((order) => order.order_id === id);
      setOrderData(specificOrder || null); // Set the specific order or null if not found
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (getUser?.uid) {
      loadData();
    } else {
      // For guest users, get the specific order from localStorage using the order ID
      const guestOrders = JSON.parse(localStorage.getItem("guestOrders")) || [];
      const specificGuestOrder = guestOrders.find(order => order.order_id === id);

      if (specificGuestOrder) {
        setOrderData(specificGuestOrder);
      } else {
        setOrderData(null); // No order found
      }
      setLoading(false);
    }
  }, [getUser, BASE_URL, id]);

  if (loading) {
    return <Loader />;
  }

  if (!orderData) {
    return <Loader />;
  }

  const formatUrl = (str) => {
    if (!str) return 'product'; // Fallback for null/undefined
    return str
      .toString() // Ensure it's a string
      .replace(/\s+/g, '-') // Replace spaces with hyphens
      .replace(/[^a-zA-Z0-9-]/g, '') // Remove special characters
      .toLowerCase();
  };

  console.log(orderData);


  return (
    <section class="bg-white py-8 antialiased md:py-8">
      <div class="mx-auto max-w-screen-lg px-4 2xl:px-0">
        <h2 class="mb-4 text-xl font-semibold text-gray-900  sm:text-2xl md:mb-6">
          Order overview
        </h2>

        <div>
          <div class="rounded-lg border border-gray-200 bg-gray-50 p-4 ">
            <h3 class="mb-4 text-xl font-semibold text-gray-900 ">
              {orderData?.length === 0
                ? "No Products Found"
                : "Orderd Products"}
            </h3>
            <div class="flex flex-wrap items-center gap-y-4 border-b border-gray-200 pb-4 ">
              <dl class="w-1/2  lg:w-1/10  hidden lg:block">
                <dt class="text-base font-medium text-gray-500 ">Image</dt>
              </dl>
              <dl class="w-1/2 sm:w-1/4 md:flex-1 lg:w-auto mr-6 hidden lg:block">
                <dt class="text-base font-medium text-gray-500 ">
                  Product Name:
                </dt>
              </dl>
              

              <dl class="w-1/2  lg:w-1/10 hidden lg:block">
                <dt class="text-base font-medium text-gray-500 ">Color</dt>
              </dl>
              <dl class="w-1/2  lg:w-1/10 hidden lg:block">
                <dt class="text-base font-medium text-gray-500 ">Category</dt>
              </dl>

              <dl class="w-1/2  lg:w-1/10 hidden lg:block">
                <dt class="text-base font-medium text-gray-500 ">Price </dt>
              </dl>

              <dl class="w-1/2  lg:w-1/10 hidden lg:block">
                <dt class="text-base font-medium text-gray-500 ">Quantity</dt>
              </dl>
            </div>
            {orderData.cart.map((product, i) => (
              <div
                key={i}
                class="flex flex-wrap items-center gap-y-4 border-b border-gray-200 pb-4 "
              >
                <dl class="w-1/2  lg:w-1/10">

                  <dd class="mt-1.5 text-base font-semibold text-gray-900 ">
                    <Link to={`/product/${product.id}/${formatUrl(product.product_name)}`} class="hover:underline">
                      <img
                        src={`${IMAGE_URL}/admin/product/${product.product_image}`}
                        className="w-8 h-8"
                        alt=""
                      />
                    </Link>
                  </dd>
                </dl>
                <dl class="w-1/2 sm:w-1/4 md:flex-1 lg:w-auto mr-6">
                  <dl class="w-1/2  lg:w-1/10 lg:hidden block">
                    <dt class="text-base font-medium text-gray-500 ">Name</dt>
                  </dl>
                  <dd class="mt-1.5 text-base font-semibold text-gray-900 ">
                    <Link to={`/product/${product.id}/${formatUrl(product.product_name)}`} class="hover:underline">
                      {product?.product_name}
                    </Link>
                  </dd>
                </dl>

                {product?.selectedColor &&

                  <dl class="w-1/2  lg:w-1/10">
                    <dl class="w-1/2  lg:w-1/10 lg:hidden block">
                      <dt class="text-base font-medium text-gray-500 ">Selected Color</dt>
                    </dl>
                    <dd class="mt-1.5 text-base font-semibold text-gray-900 ">
                      {/* {product?.selectedColor} */}
                      <div
                          className={` w-8 h-8 border border-gray-200 rounded hover:shadow-sm cursor-pointer`}
                          style={{ backgroundColor: product.selectedColor }}
                        ></div>
                    </dd>
                  </dl>

                }


                <dl class="w-1/2  lg:w-1/10">
                  <dl class="w-1/2  lg:w-1/10 lg:hidden block">
                    <dt class="text-base font-medium text-gray-500 ">Category</dt>
                  </dl>
                  <dd class="mt-1.5 text-base font-semibold text-gray-900 ">
                    {product?.select_category}
                  </dd>
                </dl>

                <dl class="w-1/2  lg:w-1/10">
                  <dl class="w-1/2  lg:w-1/10 lg:hidden block">
                    <dt class="text-base font-medium text-gray-500 ">Price</dt>
                  </dl>
                  <dd class="mt-1.5 text-base font-semibold text-gray-900 ">
                    ৳ {product?.selling_price}
                  </dd>
                </dl>

                <dl class="w-1/2  lg:w-1/10">
                  <dl class="w-1/2  lg:w-1/10 lg:hidden block">
                    <dt class="text-base font-medium text-gray-500 ">Quantity</dt>
                  </dl>
                  <dd class="me-2 mt-1.5 inline-flex shrink-0 items-center rounded text-base px-2.5 py-0.5  font-medium text-gray-900">
                    {product?.quantity}
                  </dd>
                </dl>
              </div>
            ))}
          </div>

          {/*  */}

          {/*  */}
        </div>
      </div>
    </section>
  );
};

export default OrderDtails;
