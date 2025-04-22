/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import HeroHeader from './HeroHeader';

const Hero = () => {

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
    <div>
      <div className="sh-add-slider-container lg:mb-0 mb-10">
        <HeroHeader />
      </div>

      {/* Category */}
      <section class="bg-[#00A651] antialiased py-10   md:py-16 hidden">
        <div class="mx-auto max-w-screen-xl px-4 2xl:px-0">
          <div class="mb-4 flex items-center justify-between gap-4 md:mb-8">
            <h2 class="text-xl font-semibold text-white  sm:text-2xl">Shop by category</h2>
          </div>
          <div class="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {loading ? (
              <div className="loader-container">
                <div className="spinner"></div>
                <p>Loading, please wait...</p>
              </div>
            ) : (
              <>
                {data[0].map(item => {
                  return (
                    <>
                      <Link to={`/category/${item.name}`} class="flex items-center rounded-md text-center  bg-[#00A651] border-1  px-4 py-2 hover:bg-[#00a62c]  border-white ">
                        <span class="text-sm font-medium text-white  text-center w-full">{item.name.toUpperCase()}</span>
                      </Link>
                    </>
                  )
                })}
              </>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Hero;
