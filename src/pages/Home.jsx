import React from 'react';
import Hero from '../components/Hero';
import Products from '../components/Products';
import ProductsByClass from '../components/ProductsByClass';

const Home = () => {
    return (
        <div>
            <Hero />
            <ProductsByClass/>
            {/* <Products /> */}
        </div>
    );
};

export default Home;