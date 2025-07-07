import React from 'react'

function ProductCard({ product, addToCart }) {
   const { title, price, image } = product;
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden flex flex-col  transform transition-transform duration-300 hover:scale-105 hover:shadow-xl ">
      <div className="h-60 overflow-hidden">
        <img className="w-full h-full object-contain p-4" src={image} alt={title} />
      </div>
      <div className="p-4 flex flex-col flex-grow">
        <h2 className="text-lg font-semibold text-gray-800 mb-2 truncate font-rowdies" title={title}>{title}</h2>
        <p className="text-gray-700 font-bold text-xl mb-4 font-rowdies">${price.toFixed(2)}</p>
        <div className="mt-auto">
          <button
            onClick={() => addToCart(product)}
            className="font-rowdies w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-300"
          >
            Add to Cart
          </button>
        </div>
    </div>
    </div>
  );
}

export default ProductCard;