/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useState } from "react";
import { doSignOut } from "../firebase/auth";
import { CartContext } from "../context/CartContext";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { get } from "jquery";

const Account = () => {
  const [orderData, setOrderData] = useState([]);
  const [loading, setLoading] = useState(true);
  const BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const [getUser, setGetUser] = useState(null);
  const navigate = useNavigate();
  const { setUser } = useContext(CartContext);

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

  const logout = async () => {
    try {
      await doSignOut();
      localStorage.removeItem("user");
      setUser(null);
      toast.success("Logged out successfully");
      navigate("/");
    } catch (error) {
      console.error("Logout error:", error.message);
    }
  };

  const loadData = async () => {
    if (!getUser?.uid) return; // Prevent fetching with invalid user
    try {
      const response = await fetch(`${BASE_URL}/order/${getUser.uid}`);
      if (!response.ok) throw new Error("Failed to fetch");
      const result = await response.json();
      setOrderData(result.data);
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
      const guestOrders = JSON.parse(localStorage.getItem("guestOrders")) || [];
      setOrderData(guestOrders);
    }
  }, [getUser, BASE_URL]);

  /* format date */
  const formatDate = (isoDate) => {
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(new Date(isoDate));
  };

  console.log(orderData);

  return (
    <div>
      <section className="bg-white py-8 antialiased md:py-8">
        <div className="mx-auto max-w-screen-lg px-4 2xl:px-0">
          <h2 className="mb-4 text-xl font-semibold text-gray-900  sm:text-2xl md:mb-6">
          {getUser? " User Dashboard":"Orders History"} 
          </h2>
          {getUser ? (
            <div className="py-4 md:py-8">
              <div className="mb-4 grid gap-4 sm:grid-cols-2 sm:gap-8 lg:gap-16">
                <div className="space-y-4">
                  <div className="flex space-x-4">
                    <img
                      className="h-16 w-16 rounded-lg"
                      src="/profile.png"
                      alt="Helene avatar"
                    />
                    <div>
                      <h2 className="flex items-start text-xl font-bold leading-none text-gray-900  sm:text-2xl pt-5 flex-col">
                        User Id:{" "}
                        <span className="text-sm"> {getUser?.uid} </span>
                      </h2>
                    </div>
                  </div>
                  <dl className="">
                    <dt className="font-semibold text-gray-900 ">
                      Email Address
                    </dt>
                    <dd className="text-gray-500 ">{getUser?.email}</dd>
                  </dl>
                </div>
              </div>
              <button
                onClick={logout}
                type="button"
                data-modal-target="accountInformationModal2"
                data-modal-toggle="accountInformationModal2"
                className="bg-[red] inline-flex w-full items-center justify-center rounded-lg bg-primary-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300  sm:w-auto cursor-pointer"
              >
                <svg
                  className="-ms-0.5 me-1.5 h-4 w-4"
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
                    d="m14.304 4.844 2.852 2.852M7 7H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-4.5m2.409-9.91a2.017 2.017 0 0 1 0 2.853l-6.844 6.844L8 14l.713-3.565 6.844-6.844a2.015 2.015 0 0 1 2.852 0Z"
                  ></path>
                </svg>
                Logout
              </button>
            </div>
          ) : (
            <></>
          )}

          <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 ">
            <h3 className="mb-4 text-xl font-semibold text-gray-900 ">
              {orderData?.length === 0 ? "No orders yet" : " Latest orders"}
            </h3>
            {orderData?.map((order, i) => (
              <div
                key={i}
                className="flex flex-wrap items-center gap-y-4 border-b border-gray-200 pb-4 "
              >
                {getUser ? (
                  <dl className="w-1/2 sm:w-48">
                    <dt className="text-base font-medium text-gray-500 ">
                      Order ID:
                    </dt>
                    <dd className="mt-1.5 text-base font-semibold text-gray-900 ">
                      <a href="#" className="hover:underline">
                        #{order.order_id}
                      </a>
                    </dd>
                  </dl>
                ):
                
                <dl className="w-1/2 sm:w-48">
                    <dt className="text-base font-medium text-gray-500 ">
                      Order ID:
                    </dt>
                    <dd className="mt-1.5 text-base font-semibold text-gray-900 ">
                      <a href="#" className="hover:underline">
                        #{order.client_order_id}
                      </a>
                    </dd>
                  </dl>
                }

                <dl className="w-1/2 sm:w-1/4 md:flex-1 lg:w-auto">
                  <dt className="text-base font-medium text-gray-500 ">
                    Date:
                  </dt>
                  <dd className="mt-1.5 text-base font-semibold text-gray-900 ">
                    {order?.created_at ? formatDate(order?.created_at) : ""}
                  </dd>
                </dl>

                <dl className="w-1/2 sm:w-1/5 md:flex-1 lg:w-auto">
                  <dt className="text-base font-medium text-gray-500 ">
                    Price:{" "}
                  </dt>
                  <dd className="mt-1.5 text-base font-semibold text-gray-900 ">
                    ৳ {order.total_price}
                  </dd>
                </dl>

                {getUser &&  <dl className="w-1/2 sm:w-1/4 sm:flex-1 lg:w-auto">
                  <dt className="text-base font-medium text-gray-500 ">
                    Status:
                  </dt>
                  <dd className="me-2 mt-1.5 inline-flex shrink-0 items-center rounded bg-yellow-100 px-2.5 py-0.5 text-xs font-medium text-yellow-800 ">
                    <svg
                      className="me-1 h-3 w-3"
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
                        d="M13 7h6l2 4m-8-4v8m0-8V6a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v9h2m8 0H9m4 0h2m4 0h2v-4m0 0h-5m3.5 5.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Zm-10 0a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Z"
                      ></path>
                    </svg>
                    {order.status === 0
                      ? "Pending"
                      : order.status === 1
                      ? "Completed"
                      : "Cancelled"}
                  </dd>
                </dl>}

               

                <div className="w-full sm:flex sm:w-32 sm:items-center sm:justify-end sm:gap-4">
                  <Link
                    to={`/order-details/${order.order_id}`}
                    type="button"
                    className="flex w-full items-center justify-center rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100 "
                  >
                    View order
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Account;
