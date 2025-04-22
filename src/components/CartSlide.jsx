import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { X } from 'lucide-react';
import { CartContext } from '../context/CartContext';

const CartSlide = ({setIsCartOpen, isCartOpen}) => {
  const { 
    cart, 
    increaseQuantity, 
    decreaseQuantity, 
    removeFromCart 
  } = useContext(CartContext);
  

  const IMAGE_URL = import.meta.env.VITE_API_IMAGE_URL;

  // Helper function to process product colors
  const processProductColors = (product) => {
    if (!product.color) return [];
    const colorMap = {
      yellow: "#FFFF00",
      blue: "#0000FF",
      gray: "#808080",
      red: "#FF0000",
      green: "#008000",
      black: "#000000",
      white: "#FFFFFF",
      orange: "#FFA500",
      purple: "#800080",
      pink: "#FFC0CB",
      brown: "#A52A2A",
    };
    
    return product.color.split(",").map((color) => ({
      name: color.trim(),
      code: colorMap[color.trim().toLowerCase()] || "#CCCCCC"
    }));
  };

  // Calculate total items and total price
  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
  const totalPrice = cart.reduce((total, item) => total + (item.selling_price * item.quantity), 0).toFixed(2);

  return (
    <>
      {/* Floating cart button */}
      {cart.length > 0 && (
        <button 
          onClick={() => setIsCartOpen(true)}
          className="fixed bottom-28 right-4 bg-[#193CB8] text-white p-3 rounded-full shadow-lg hover:bg-blue-700 transition z-50 flex items-center justify-center cursor-pointer"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-6 w-6 flex items-center justify-center">
            {totalItems}
          </span>
        </button>
      )}

      {/* Cart sidebar */}
      <div
        className={`fixed top-0 right-0 w-full sm:w-96 h-full bg-white lg:px-6 px-4 shadow-lg transition-transform transform ${
          isCartOpen ? "translate-x-0" : "translate-x-full"
        } duration-300 ease-in-out z-[999] overflow-y-auto`}
      >
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-semibold">Shopping Cart ({totalItems} items)</h2>
          <button 
            onClick={() => setIsCartOpen(false)} 
            className="text-gray-500 hover:text-gray-900 cursor-pointer"
          >
            <X size={24} />
          </button>
        </div>

        <div className="p-4 overflow-y-auto flex flex-col gap-5 h-[calc(100%-180px)]">
          {cart.length > 0 ? (
            cart.map((item) => {
              const colors = processProductColors(item);
              const selectedColor = item.selectedColor;
              const colorName = colors.find(c => c.code === selectedColor)?.name;

              return (
                <div key={`${item.id}-${selectedColor}`} className="flex items-center bg-gray-100 rounded-lg px-3 py-3">
                  <img
                    src={
                      item.product_image
                        ? `${IMAGE_URL}/admin/product/${item.product_image}`
                        : "https://via.placeholder.com/150"
                    }
                    alt={item.product_name}
                    className="w-14 h-14 rounded-md object-cover"
                  />
                  <div className="ml-3 flex-1">
                    <h3 className="text-sm font-semibold">{item.product_name}</h3>
                    {selectedColor && (
                      <div className="flex items-center mt-1">
                        <div 
                          className="w-3 h-3 rounded-full mr-1 border border-gray-300"
                          style={{ backgroundColor: selectedColor }}
                        />
                        <span className="text-xs text-gray-500">{colorName}</span>
                      </div>
                    )}
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center">
                        <button
                          onClick={() => decreaseQuantity(item.id)}
                          className="w-5 h-5 flex items-center justify-center border border-gray-300 rounded-sm cursor-pointer"
                        >
                          -
                        </button>
                        <span className="mx-2 text-sm">{item.quantity}</span>
                        <button
                          onClick={() => increaseQuantity(item.id)}
                          className="w-5 h-5 flex items-center justify-center border border-gray-300 rounded-sm cursor-pointer"
                        >
                          +
                        </button>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-red-500 hover:text-red-700 cursor-pointer"
                      >
                        <svg
                          className="h-4 w-4"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M6 18 17.94 6M18 18 6.06 6"
                          />
                        </svg>
                      </button>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">৳{item.selling_price} × {item.quantity} = ৳{(item.selling_price * item.quantity).toFixed(2)}</p>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="text-center mt-10">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-16 w-16 mx-auto text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1}
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              <p className="text-gray-500 mt-4">Your cart is empty</p>
            </div>
          )}
        </div>

        {cart.length > 0 && (
          <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200 bg-white">
            <div className="flex justify-between mb-2">
              <span className="font-semibold">Total:</span>
              <span className="font-semibold">৳{totalPrice}</span>
            </div>
            <div className="flex flex-col gap-2">
              <Link
                to="/cart"
                className="bg-black text-white font-bold  py-2 px-4 rounded-md hover:bg-[#313131] hover:text-white transition duration-300 cursor-pointer text-center"
                onClick={() => setIsCartOpen(false)}
              >
                View Cart
              </Link>
              <Link
                to="/checkout"
                className="bg-[#ffff00] text-black font-bold py-2 px-4 rounded-md hover:bg-[#ffff00] hover:text-black transition duration-300 cursor-pointer text-center"
                onClick={() => setIsCartOpen(false)}
              >
                Checkout
              </Link>
            </div>
          </div>
        )}
      </div>

      {/* Overlay when cart is open */}
      {isCartOpen && (
        <div 
          className="fixed inset-0 z-[998]"
          onClick={() => setIsCartOpen(false)}
        />
      )}
    </>
  );
};

export default CartSlide;