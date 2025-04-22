/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import Loader from "./Loader";

const Header = ({ menuopen, setMenuOpen }) => {
  const { cart, user } = useContext(CartContext);
  const [categories, setCategories] = useState([]);
  const [localOrderData, setLocalOrderData] = useState([]);
  const [subCategories, setSubCategories] = useState({});
  const [loading, setLoading] = useState(true);
  const [hoveredCategory, setHoveredCategory] = useState(null);
  const BASE_URL = import.meta.env.VITE_API_BASE_URL;

  // Fetch categories data
  const loadCategories = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${BASE_URL}/products/categories`);
      const result = await response.json();
      setCategories(result[0] || []);

      // Initialize subCategories state with null (not loaded yet)
      const initialSubCategories = {};
      result[0]?.forEach((category) => {
        initialSubCategories[category.name] = null;
      });
      setSubCategories(initialSubCategories);
    } catch (error) {
      console.error("Error fetching categories:", error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch sub-categories for a category
  const loadSubCategories = async (categoryName) => {
    try {
      const response = await fetch(
        `${BASE_URL}/sub-category/category/${categoryName}`
      );
      const result = await response.json();
      setSubCategories((prev) => ({
        ...prev,
        [categoryName]: result.subcategories || [],
      }));
    } catch (error) {
      console.error("Error fetching sub-categories:", error);
      setSubCategories((prev) => ({
        ...prev,
        [categoryName]: [],
      }));
    }
  };

  useEffect(() => {
    loadCategories();
    const guestOrders = JSON.parse(localStorage.getItem("guestOrders")) || [];
    setLocalOrderData(guestOrders);
  }, []);

  const handleCategoryHover = (categoryName) => {
    setHoveredCategory(categoryName);
    // Load sub-categories if not already loaded
    if (subCategories[categoryName] === null) {
      loadSubCategories(categoryName);
    }
  };

  const handleMobileCategoryClick = (e, categoryName) => {
    if (subCategories[categoryName] === null) {
      e.preventDefault();
      loadSubCategories(categoryName);
    } else if (Array.isArray(subCategories[categoryName])) {
      e.preventDefault();
      setSubCategories((prev) => ({
        ...prev,
        [categoryName]: null, // Collapse the submenu
      }));
    }
    // If subCategories[categoryName] is an empty array, let the link work normally
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div
      className="fixed top-0 z-50 w-full"
      onClick={() => (menuopen ? setMenuOpen(false) : "")}
    >
      <header>
        <div className="bg-black border-b border-gray-900">
          <div className="px-4 mx-auto sm:px-6 lg:px-8">
            <nav className="relative flex items-center justify-between h-16 lg:h-20">
              <div className="">
                <div className="flex-shrink-0">
                  <Link to="/" title="" className="flex items-center gap-2">
                    <img
                      className="w-auto h-8 lg:h-14"
                      src="/logo.png"
                      alt=""
                    />
                    <div className="flex ">
                      <h1 className="text-white lg:text-2xl text-lg font-extrabold  uppercase">
                      ভাই দাম কত ? 
                      </h1>
                    </div>
                  </Link>
                </div>
                {/* Mobile Logo */}

              </div>


              {/* Desktop Navigation */}
              <div className="hidden lg:flex lg:items-center lg:space-x-7">
                <Link
                  to="/"
                  className="text-base font-medium text-white capitalize"
                >
                  Home
                </Link>



                {categories.map((category) => {
                  const hasSubCategories =
                    Array.isArray(subCategories[category.name]) &&
                    subCategories[category.name].length > 0;
                  const isHovered = hoveredCategory === category.name;

                  return (
                    <div
                      key={category.id}
                      className="relative group"
                      onMouseEnter={() => handleCategoryHover(category.name)}
                      onMouseLeave={() => setHoveredCategory(null)}
                    >
                      <Link
                        to={`/category/${category.name}`}
                        className="text-base font-medium text-white flex items-center capitalize"
                      >
                        {category.name}
                        {(subCategories[category.name] === null ||
                          hasSubCategories) && (
                            <svg
                              className="w-4 h-4 ml-1"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M19 9l-7 7-7-7"
                              />
                            </svg>
                          )}
                      </Link>

                      {isHovered && hasSubCategories && (
                        <div className="absolute left-0 mt-0 w-48 bg-gray-900 rounded-md shadow-lg py-1 z-50">
                          {subCategories[category.name].map((subCat) => (
                            <Link
                              key={subCat}
                              to={`/sub-category/${category.name}/${subCat}`}
                              className="block px-4 py-2 text-sm text-gray-100 hover:bg-gray-800 capitalize"
                            >
                              {subCat}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}

                <Link
                  to="/shop"
                  className="text-base font-medium text-white capitalize"
                >
                  Shop
                </Link>
              </div>


              {/* Mobile Cart Button */}
              <Link
                to="/cart"
                type="button"
                className="flex items-center justify-center ml-auto text-white bg-black rounded-full w-9 h-9 lg:hidden relative"
              >
                <div className="t-0 absolute left-5 bottom-5">
                  <p className="flex h-2 w-2 items-center justify-center rounded-full bg-red-500 p-3 text-xs text-white">
                    {cart.length > 0 ? cart.length : 0}
                  </p>
                </div>
                <svg
                  className="w-5 h-5"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </Link>

              {/* Mobile Menu Button */}
              <button
                type="button"
                onClick={() => setMenuOpen(!menuopen)}
                className="inline-flex p-2 ml-5 text-white transition-all duration-200 rounded-md lg:hidden focus:bg-gray-900 hover:bg-gray-900"
              >
                <svg
                  className="w-6 h-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16m-7 6h7"
                  />
                </svg>
              </button>

              {/* Desktop User and Cart */}
              <div className="hidden lg:flex lg:items-center lg:space-x-10">
                {user?.user?.uid ? (
                  <div className="relative">
                    <Link to="/account">
                      <img
                        className="w-10 h-10 rounded-full"
                        src="/profile.png"
                        alt=""
                      />
                      <span className="top-0 left-7 absolute w-3.5 h-3.5 bg-green-400 border-2 border-white dark:border-gray-800 rounded-full"></span>
                    </Link>
                  </div>
                ) : (
                  <>
                    {localOrderData && (
                      <Link
                        to="/orders"
                        className="py-2 text-base font-medium text-white transition-all duration-200 focus:text-blue-600"
                      >
                        See Orders
                      </Link>
                    )}
                    <Link
                      to="/login"
                      className="py-2 text-base font-medium text-white transition-all duration-200 focus:text-blue-600"
                    >
                      Sign in
                    </Link>
                  </>
                )}

                <Link
                  to="/cart"
                  className=" flex justify-center items-center mt-[-12px]"
                >
                  <div className="relative">
                    <div className="t-0 absolute left-3">
                      <p className="flex h-2 w-2 items-center justify-center rounded-full bg-red-500 p-3 text-xs text-white">
                        {cart.length > 0 ? cart.length : 0}
                      </p>
                    </div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="file: mt-4 h-6 w-6 text-white"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                      />
                    </svg>
                  </div>
                </Link>
              </div>
            </nav>
          </div>
        </div>

        {/* Mobile Menu */}
        <nav
          className={`py-4 bg-gray-900 lg:hidden ${menuopen ? "block" : "hidden"}`}
        >
          <div className="px-4 mx-auto sm:px-6 lg:px-8">
            <div className="flex items-center justify-between">
              <p className="text-md font-semibold tracking-widest text-gray-black uppercase text-white">
                Menu
              </p>

              <button
                onClick={() => setMenuOpen(false)}
                type="button"
                className="inline-flex p-2 text-white transition-all duration-200 rounded-md focus:bg-gray-900 hover:bg-gray-900"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <div className="mt-6">
              <div className="flex flex-col space-y-2">
                <Link
                  to="/"
                  className="py-2 text-base font-medium text-white transition-all duration-200 focus:text-blue-600 capitalize"
                >
                  Home
                </Link>

                {categories.map((category) => {
                  const hasSubCategories =
                    Array.isArray(subCategories[category.name]) &&
                    subCategories[category.name].length > 0;
                  const isExpanded =
                    subCategories[category.name] !== null &&
                    subCategories[category.name] !== undefined;

                  return (
                    <div key={category.id}>
                      <Link
                        to={`/category/${category.name}`}
                        className="py-2 text-base font-medium text-white transition-all duration-200 focus:text-blue-600 flex items-center justify-between capitalize"
                        onClick={(e) =>
                          handleMobileCategoryClick(e, category.name)
                        }
                      >
                        {category.name}
                        {(subCategories[category.name] === null ||
                          hasSubCategories) && (
                            <svg
                              className={`w-4 h-4 text-white transition-transform ${isExpanded ? "transform rotate-180" : ""
                                }`}
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M19 9l-7 7-7-7"
                              />
                            </svg>
                          )}
                      </Link>

                      {isExpanded && hasSubCategories && (
                        <div className="ml-4">
                          {subCategories[category.name].map((subCat) => (
                            <Link
                              key={subCat}
                              to={`/sub-category/${category.name}/${subCat}`}
                              className="block py-2 text-sm text-gray-100 hover:bg-gray-900 capitalize"
                              onClick={() => setMenuOpen(false)}
                            >
                              {subCat}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}

                <Link
                  to="/shop"
                  className="py-2 text-base font-medium text-white transition-all duration-200 focus:text-blue-600 capitalize"
                >
                  Shop
                </Link>
              </div>

              <hr className="my-4 border-gray-200" />

              <div className="flex flex-col space-y-2">
                {user?.user?.uid ? (
                  <Link
                    to="/account"
                    className="py-2 text-base font-medium text-white transition-all duration-200 focus:text-blue-600"
                  >
                    Account
                  </Link>
                ) : (
                  <>
                    {localOrderData && (
                      <Link
                        to="/orders"
                        className="py-2 text-base font-medium text-white transition-all duration-200 focus:text-blue-600"
                      >
                        See Orders
                      </Link>
                    )}
                    <Link
                      to="/register"
                      className="py-2 text-base font-medium text-white transition-all duration-200 focus:text-blue-600"
                    >
                      Sign up
                    </Link>

                    <Link
                      to="/login"
                      className="py-2 text-base font-medium text-white transition-all duration-200 focus:text-blue-600"
                    >
                      Sign in
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        </nav>
      </header>
    </div>
  );
};

export default Header;
