import React, { useEffect, useState } from 'react';
import ProductSection from '../components/ProductSection';

const Shop = () => {
     const [data, setData] = useState([]);
      const [loading, setLoading] = useState(true);
      const BASE_URL = import.meta.env.VITE_API_BASE_URL;
    
      // Fetch data
      const loadData = async () => {
        try {
          const response = await fetch(`${BASE_URL}/products`);
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
    
      console.log(data);
    return (
          <div>
            <div class="text-center p-10 bg-green-700">
              <h1 class="font-bold text-4xl mb-4 text-white">SHOP</h1>
            </div>
            <div className="mt-16 lg:px-8">
            <ProductSection loading={loading} data={data[0]}/>
            </div>
          </div>
    );
};

export default Shop;