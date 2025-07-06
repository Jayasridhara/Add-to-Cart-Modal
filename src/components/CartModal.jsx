// src/components/CartModal.js
import React from 'react';

function CartModal({ isOpen, closeModal, cartItems, removeFromCart }) {
  if (!isOpen) return null;
  const totalPrice = cartItems.reduce((sum, item) => sum + item.price, 0);
  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex justify-center items-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto transform scale-95 transition-transform duration-300 ease-out">
        <div className="flex justify-between items-center border-b p-4">
          <h2 className="text-2xl font-bold text-gray-800">Your Cart</h2>
           <button onClick={closeModal} className="text-gray-500 hover:text-gray-800 text-3xl">&times;</button>
        </div>
        <div className="p-4">
          {cartItems.length === 0 ? (
            <p className="text-gray-600 text-center py-8">Your cart is empty.</p>
          ) : (
            <ul>
              {cartItems.map((item) => (
                <li
                  key={item.id}
                  className="flex items-center justify-between border-b last:border-b-0 py-3"
                >
                  <div className="flex items-center flex-grow">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-16 h-16 object-contain mr-4 rounded"
                    />
                    <div>
                      <h4 className="text-lg font-medium text-gray-800 line-clamp-1">
                        {item.title}
                      </h4>
                      <p className="text-gray-600">${item.price.toFixed(2)}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="ml-4 bg-red-500 text-white py-1 px-3 rounded-full hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-75 transition duration-300 ease-in-out text-sm"
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="p-4 border-t">
        <div className="flex justify-between items-center mb-4">
          <span className="text-lg font-semibold text-gray-800">Total:</span>
          <span className="text-xl font-bold text-indigo-600">${totalPrice.toFixed(2)}</span>
        </div>
        <button
          onClick={closeModal}
          className="w-full bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-300">
          Close
        </button>
        </div>

      </div>
    </div>
  );
}

export default CartModal;