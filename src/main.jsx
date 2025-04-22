import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Single from "./pages/Single.jsx";
import MainLayout from "./layout/MainLayout.jsx";
import Cart from "./pages/Cart.jsx";
import { Toaster } from "react-hot-toast";
import { CartProvider } from "./context/CartContext.jsx";
import Checkout from "./pages/Checkout.jsx";
import Account from "./pages/Account.jsx";
import Register from "./pages/Register.jsx";
import Login from "./pages/Login.jsx";
import OrderSuccess from "./pages/OrderSuccess.jsx";
import PrivateRoute from "./PrivateRoute.jsx";
import CategoryProduct from "./pages/CategoryProduct.jsx";
import OrderDtails from "./pages/OrderDtails.jsx";
import SubCategory from "./pages/SubCategory.jsx";
import Shop from "./pages/Shop.jsx";
import MyOrders from "./pages/MyOrders.jsx";
import ReactPixel from 'react-facebook-pixel';

// const PIXEL_ID = import.meta.env.VITE_API_PIXEL_ID;
const GTM_ID = import.meta.env.VITE_API_GTM_ID;

// Initialize Google Tag Manager Data Layer
(function (w, d, s, l, i) {
  w[l] = w[l] || [];
  w[l].push({ 'gtm.start': new Date().getTime(), event: 'gtm.js' });
  var f = d.getElementsByTagName(s)[0],
    j = d.createElement(s),
    dl = l != 'dataLayer' ? '&l=' + l : '';
  j.async = true;
  j.src = 'https://www.googletagmanager.com/gtm.js?id=' + i + dl;
  f.parentNode.insertBefore(j, f);
})(window, document, 'script', 'dataLayer', `${GTM_ID}`); 

// Initialize Meta Pixel
/* const advancedMatching = {};
const options = {
  autoConfig: true,
  debug: false,
};
ReactPixel.init(PIXEL_ID, advancedMatching, options);
ReactPixel.pageView();  */

// Create router configuration using createBrowserRouter
const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/product/:id/:name",
        element: <Single />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path: "/checkout",
        element: <Checkout />,
      },
      {
        path: "/shop",
        element: <Shop />,
      },
      {
        path: "/category/:id",
        element: <CategoryProduct />,
      },
      {
        path: "/my-orders",
        element: <MyOrders />,
      },
      {
        path: "/sub-category/:category/:subCategory",
        element: <SubCategory />,
      },
      {
        path: "/account",
        element: (
          <PrivateRoute>
            <Account />
          </PrivateRoute>
        ),
      },
      {
        path: "/orders",
        element: (
          // <PrivateRoute>
          <Account />
          // </PrivateRoute>
        ),
      },
      {
        path: "/order-details/:id",
        element: (
          // <PrivateRoute>
          <OrderDtails />
          // </PrivateRoute>
        ),
      },
      {
        path: "/order-success",
        element: (
          // <PrivateRoute>
          <OrderSuccess />
          // </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/login",
    element: <Login />,
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router}>
      <CartProvider>
        <Toaster />
      </CartProvider>
    </RouterProvider>
  </StrictMode>
);