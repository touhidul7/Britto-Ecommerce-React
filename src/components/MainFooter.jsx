/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import bkash from "/bkash.svg";
import nagad from "/nagad.png";
import rocket from "/rocket.png";
import whatsapp from "/WhatsApp.svg.webp";
import americanexpress from "/americanexpress.png";
import { Link } from "react-router-dom";
import { FaFacebookF, FaPhoneAlt, FaWhatsapp } from "react-icons/fa";
import { IoLogoWhatsapp } from "react-icons/io";

const MainFooter = () => {
  // const [menuopen, setMenuOpen] = useState(false);

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const BASE_URL = import.meta.env.VITE_API_BASE_URL;

  // Fetch data
  const loadData = async () => {
    try {
      const response = await fetch(`${BASE_URL}/products/categories`);
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
  }, []);

  return (
    <section class="py-10 bg-black sm:pt-16 lg:pt-16 mt-20">
      <div class="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
        <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-y-12 gap-x-8 xl:gap-x-12">
          <div class="col-span-2 md:col-span-4 xl:pr-8">
            <Link to="/"><img class="w-auto h-14" src="/logo.png" alt="" /></Link>

            <p class="text-base leading-relaxed text-gray-200 mt-7">
              Discover the latest tech at Gadgetex – your one-stop shop for
              innovative gadgets and accessories. Shop smart, stay ahead.
            </p>

            <Link
              to="https://web.facebook.com/messages/t/116061797769426/"
              target="_blank"
              class="inline-flex items-center justify-center px-6 py-4 font-semibold text-white transition-all duration-200 bg-blue-600 rounded-md hover:bg-blue-700 focus:bg-blue-700 mt-7"
            >
              <svg
                class="w-6 h-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                />
              </svg>
              Start Live Chat
            </Link>
          </div>

          <div class="lg:col-span-2">
            <p class="text-md font-semibold text-gray-100">Categories</p>

            <ul class="mt-6 space-y-2">
              {data[0]?.slice(0, 5).map((item) => (
                <li key={item.id}>
                  <Link
                    className="flex text-sm font-semibold text-gray-200 transition-all duration-200 hover:text-green-600 focus:text-orange-600"
                    style={{ textTransform: "capitalize" }}
                    to={`/category/${item.name}`}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div class="lg:col-span-2">
            <p class="text-md font-semibold text-gray-100">Contact</p>

            <ul class="mt-6 space-y-2">
              <li>
                <a
                  href="tel:+8801851003265"
                  target="_blank"
                  class="flex items-center gap-2  text-sm font-semibold text-gray-200 transition-all duration-200 hover:text-green-600 focus:text-orange-600"
                >
                  <FaPhoneAlt /> +880 1851003265
                </a>
              </li>
              <li>
                <a
                  href="https://web.facebook.com/vai.dam.koto"
                  target="_blank"
                  class="flex items-center gap-2  text-sm font-semibold text-gray-200 transition-all duration-200 hover:text-green-600 focus:text-orange-600"
                >
                  <FaFacebookF className="text-blue-600" size={15} /> Facebook
                </a>
              </li>
              <li>
                <a
                  href="https://wa.me/+8801851003265"
                  target="_blank"
                  class="flex items-center gap-2  text-sm font-semibold text-gray-200 transition-all duration-200 hover:text-green-600 focus:text-orange-600"
                >
                  {" "}
                  <IoLogoWhatsapp className="text-green-600" size={15} />
                  WhatsApp{" "}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div class="lg:col-span-2 lg:-mt-16 mt-10">
          <ul class="flex justify-center lg:justify-end items-stretch gap-6 ">
            <li className="border-1 border-gray-300 bg-white cursor-pointer rounded flex justify-between items-start p-1">
              <img src={bkash} className="w-10 h-8" alt="" />
            </li>

            <li className="border-1 border-gray-300 bg-white cursor-pointer rounded flex justify-between items-start p-1">
              <img src={nagad} className="w-10 h-8" alt="" />
            </li>

            <li className="border-1 border-gray-300 bg-white cursor-pointer rounded flex justify-between items-start p-1">
              <img src={rocket} className="w-10 h-8" alt="" />
            </li>

            <li className="border-1 border-gray-300 bg-white cursor-pointer rounded flex justify-between items-start p-1">
              <img src={americanexpress} className="w-10 h-8" alt="" />
            </li>
          </ul>
        </div>
        <hr class="mt-16 mb-10 border-gray-200" />

        <div class="sm:flex sm:items-center justify-center">
          <p class="text-sm text-gray-300">
            © Copyright 2021, All Rights Reserved by Vai Dam Koto
          </p>
        </div>
      </div>
      <div className="fixed bottom-4 right-4 z-50">
        <Link to={"https://wa.me/+8801851003265"} target="_blank">
          {" "}
          <img src={whatsapp} className="w-18" alt="" />
        </Link>
      </div>
    </section>
  );
};

export default MainFooter;
