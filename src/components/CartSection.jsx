import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import { Link } from 'react-router-dom';
const CartSection = () => {
      const {
        cart,
        increaseQuantity,
        decreaseQuantity,
        removeFromCart,
      } = useContext(CartContext);
      const IMAGE_URL = import.meta.env.VITE_API_IMAGE_URL;


      const formatUrl = (str) => {
        if (!str) return 'product'; // Fallback for null/undefined
        return str
          .toString() // Ensure it's a string
          .replace(/\s+/g, '-') // Replace spaces with hyphens
          .replace(/[^a-zA-Z0-9-]/g, '') // Remove special characters
          .toLowerCase();
      };
    return (
        <div>
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
                        <Link
                        to={`/product/${item.id}/${formatUrl(item.product_name)}`}
                          className="text-base font-medium text-gray-900 hover:underline"
                        >
                          {item.product_name}
                        </Link>{" "}
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
    );
};

export default CartSection;