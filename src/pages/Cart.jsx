/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect } from "react";
import { CartContext } from "../context/CartContext";
import { Link } from "react-router-dom";
import Alert from "../components/Alert";
import { FaPlus } from "react-icons/fa";
// import ReactPixel from 'react-facebook-pixel';
const Cart = () => {

  const {
    cart,
    totalPrice,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
  } = useContext(CartContext);
  const IMAGE_URL = import.meta.env.VITE_API_IMAGE_URL;



  useEffect(() => {


    // if (cart.length > 0) {


    //   ReactPixel.track('InitiateCheckout', {
    //     content_ids: cart.map(item => item.id),
    //     contents: cart.map(item => ({
    //       id: item.id,
    //       quantity: item.quantity,
    //       item_price: item.selling_price
    //     })),
    //     content_type: 'product',
    //     value: cart.reduce((sum, item) => sum + (item.selling_price * item.quantity), 0),
    //     currency: 'BDT',
    //     num_items: cart.length
    //   });

    // }


    // Meta Pixel ViewCart
    /* ReactPixel.track('ViewCart', {
      content_ids: cart.map(item => item.id),
      contents: cart.map(item => ({
        id: item.id,
        quantity: item.quantity,
        item_price: item.selling_price
      })),
      content_type: 'product',
      value: totalPrice,
      currency: 'BDT',
      num_items: cart.length
    }); */

    // Google Analytics view_cart
    window.dataLayer.push({
      event: "view_cart",
      ecommerce: {
        items: cart.map(item => ({
          item_id: item.id,
          item_name: item.product_name,
          price: item.selling_price,
          item_category: item.select_category,
          quantity: item.quantity
        })),
        value: totalPrice,
        currency: "BDT"
      }
    });





  }, [cart]);






  // console.log(cart);
  return (
    <section className="bg-white py-8 antialiased md:py-16 lg:px-10">
      {cart.length === 0 ? (
        <Alert />
      ) : (
        <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
          <h2 className="text-xl font-semibold text-gray-900 sm:text-2xl">
            Shopping Cart
          </h2>
          <div className="mt-6 sm:mt-8 md:gap-6 lg:flex lg:items-start xl:gap-8">
            <div className="mx-auto w-full flex-none lg:max-w-2xl xl:max-w-4xl">
              <div className="space-y-6">
                {cart.map((item) => (
                  <div
                    key={item.id}
                    className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm md:p-6"
                  >
                    <div className="space-y-4 md:flex md:items-center md:justify-between md:gap-6 md:space-y-0">
                      <a href="#" className="shrink-0 md:order-1">
                        <img
                          className="h-20 w-20"
                          src={`${IMAGE_URL}/admin/product/${item.product_image}`}
                          alt={item.title}
                        />
                      </a>

                      <div className="flex items-center justify-between md:order-3 md:justify-end gap-4">
                        <div
                          className={` w-8 h-8 border border-gray-200 rounded hover:shadow-sm cursor-pointer`}
                          style={{ backgroundColor: item.selectedColor }}
                        ></div>
                        <div className="flex items-center">
                          <button
                            onClick={() => decreaseQuantity(item.id)}
                            type="button"
                            className="cursor-pointer inline-flex h-5 w-5 items-center justify-center rounded-md border border-gray-300 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-100"
                          >
                            <svg
                              className="h-2.5 w-2.5 text-gray-900"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 18 2"
                            >
                              <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M1 1h16"
                              />
                            </svg>
                          </button>
                          <input
                            type="text"
                            className="w-10 shrink-0 border-0 bg-transparent text-center text-sm font-medium text-gray-900 focus:outline-none focus:ring-0"
                            value={item.quantity}
                            disabled
                          />
                          <button
                            onClick={() => increaseQuantity(item.id)}
                            type="button"
                            className="cursor-pointer inline-flex h-5 w-5 items-center justify-center rounded-md border border-gray-300 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-100"
                          >
                            {" "}
                            +
                          </button>
                        </div>

                        <div className="text-end md:order-4 md:w-32">
                          <p className="text-base font-bold text-gray-900">
                            ৳ {(item.quantity * item.selling_price).toFixed(2)}
                          </p>
                        </div>
                      </div>
                      <div className="w-full min-w-0 flex-1 space-y-4 md:order-2 md:max-w-md">
                        <a
                          href="#"
                          className="text-base font-medium text-gray-900 hover:underline"
                        >
                          {item.product_name}
                        </a>{" "}
                        <br />
                        <button
                          onClick={() => removeFromCart(item.id)}
                          type="button"
                          className="cursor-pointer mt-2 inline-flex items-center text-sm font-medium text-red-600 hover:underline"
                        >
                          <svg
                            class="me-1.5 h-5 w-5"
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
                              d="M6 18 17.94 6M18 18 6.06 6"
                            />
                          </svg>
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="mx-auto mt-6 max-w-4xl flex-1 space-y-6 lg:mt-0 lg:w-full">
              <div className="space-y-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm sm:p-6">
                <p className="text-xl font-semibold text-gray-900">
                  Order summary
                </p>
                <div className="space-y-4">
                  <dl className="flex items-center justify-between gap-4 border-t border-gray-200 pt-2">
                    <dt className="text-base font-bold text-gray-900">Total</dt>
                    <dd className="text-base font-bold text-gray-900">
                      ৳ {totalPrice.toFixed(2)}
                    </dd>
                  </dl>
                </div>
                <Link
                  to="/checkout"
                  className="flex w-full items-center justify-center rounded-lg bg-[#2A59FF] px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300"
                >
                  Proceed to Checkout
                </Link>
                <div className="flex items-center justify-center gap-2">
                  <span className="text-sm font-normal text-gray-500">
                    {" "}
                    or{" "}
                  </span>
                  <Link
                    to="/"
                    className="inline-flex items-center gap-2 text-sm font-medium text-blue-700 underline hover:no-underline"
                  >
                    Continue Shopping
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Cart;
