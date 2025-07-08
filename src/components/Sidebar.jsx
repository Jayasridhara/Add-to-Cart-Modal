import React, { useEffect, useState } from 'react'; 

const Sidebar = ({
  setCategories,
  isSidebarOpen,
  closeSidebar,
  showCategoryDropdown = false,
  isMobile = true,
  selectedPriceRange,
  setSelectedPriceRange,
  selectedCategories, 
  selectedColors,     
  setSelectedColors, 
  allProducts 
}) => {
  const categories = ["men's clothing", "women's clothing", "jewelery", "electronics"];
  const priceRanges = [
    { label: 'All Prices', value: '' },
    { label: '$0 - $50', value: '0-50' },
    { label: '$50 - $100', value: '50-100' },
    { label: '$100 - $200', value: '100-200' },
    { label: '$200+', value: '200-Infinity' },
  ];

  const clothingCategories = ["men's clothing", "women's clothing"];
  const showColorFilter = selectedCategories.some(cat => clothingCategories.includes(cat));

  // State to hold unique colors available in selected clothing categories
  const [availableColors, setAvailableColors] = useState([]);

  // Effect to derive available colors whenever products or selected categories change
  useEffect(() => {
    if (showColorFilter) {
      const colors = new Set();
      allProducts.forEach(product => {
        if (clothingCategories.includes(product.category) && product.colors) {
          product.colors.forEach(color => colors.add(color));
        }
      });
      setAvailableColors(Array.from(colors).sort()); 
    } else {
      setAvailableColors([]);
      setSelectedColors([]); // Clear selected colors if filter is hidden
    }
  }, [selectedCategories, allProducts, showColorFilter, setSelectedColors]);


  const handleCategoryChange = (e) => {
    const { value, checked } = e.target;
    setCategories(prev => checked ? [...prev, value] : prev.filter(c => c !== value));
  };

  const handlePriceChange = (e) => {
    setSelectedPriceRange(e.target.value);
  };

  // NEW: handle color filter change
  const handleColorChange = (e) => {
    const { value, checked } = e.target;
    setSelectedColors(prev => checked ? [...prev, value] : prev.filter(color => color !== value));
  };

  const sidebarContent = (
    <>
      <div className="mb-6">
        <h3 className="font-bold text-xl mb-3 border-b pb-2">Category</h3>
        {categories.map(category => (
          <div key={category} className="flex items-center mb-2">
            <input
              type="checkbox"
              id={category}
              value={category}
              onChange={handleCategoryChange}
              // Check if category is currently selected to maintain state
              checked={selectedCategories.includes(category)}
              className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
            />
            <label htmlFor={category} className="ml-3 text-gray-700 capitalize cursor-pointer">{category}</label>
          </div>
        ))}
      </div>

      <div className="mb-6">
        <h3 className="font-bold text-xl mb-3 border-b pb-2">Price Range</h3>
        {priceRanges.map(range => (
          <div key={range.value} className="flex items-center mb-2">
            <input
              type="radio"
              id={`price-${range.value}`}
              name="price-filter"
              value={range.value}
              checked={selectedPriceRange === range.value}
              onChange={handlePriceChange}
              className="h-4 w-4 text-indigo-600 border-gray-300 focus:ring-indigo-500"
            />
            <label htmlFor={`price-${range.value}`} className="ml-3 text-gray-700 cursor-pointer">{range.label}</label>
          </div>
        ))}
      </div>

      
      {showColorFilter && availableColors.length > 0 && (
        <div className="mb-6">
          <h3 className="font-bold text-xl mb-3 border-b pb-2">Colors</h3>
          <div className="grid grid-cols-1  gap-2"> 
            {availableColors.map(color => (
              <div key={color} className="flex items-center mb-2">
                <input
                  type="checkbox"
                  id={`color-${color}`}
                  value={color}
                  onChange={handleColorChange}
                  checked={selectedColors.includes(color)} 
                  className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                />
                <label htmlFor={`color-${color}`} className="ml-2 text-gray-700 capitalize cursor-pointer flex items-center">
                  <span
                    className="inline-block w-4 h-4 rounded-full mr-2 border border-gray-300"
                    style={{ backgroundColor: color.toLowerCase() }}
                    title={color}
                  ></span>
                  {color}
                </label>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );

  return (
    <>
      {/* Mobile Sidebar */}
      <div className="md:hidden font-righteous">
        <div
          className={`fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity ${isSidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
          onClick={closeSidebar}
        ></div>
        <aside
          className={`fixed top-0 left-0 w-64  bg-white p-6 shadow-xl z-50 transform transition-transform duration-300 ease-in-out ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}
        >
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-xl">Filters</h3>
            <button onClick={closeSidebar} className="text-gray-500 hover:text-gray-800 text-2xl">&times;</button>
          </div>
          {sidebarContent}
        </aside>
      </div>
      {/* Desktop Sidebar */}
      
      {!isMobile && showCategoryDropdown && (
        <div className="md:block w-[20%]  overflow-y-auto bg-white p-6 rounded-xl shadow-md mt-2 font-righteous">
          {sidebarContent}
        </div>
      )}
    </>
  );
};

export default Sidebar;