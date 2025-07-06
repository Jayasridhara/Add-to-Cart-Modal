// Sidebar Component
const Sidebar = ({ setCategories, isSidebarOpen, closeSidebar, showCategoryDropdown = false, isMobile = true }) => {
  const categories = ["men's clothing", "women's clothing", "jewelery", "electronics"];


  const handleCategoryChange = (e) => {
    const { value, checked } = e.target;
    setCategories(prev => checked ? [...prev, value] : prev.filter(c => c !== value));
  };


  const sidebarContent = (  
    <>
      <div className="mb-6">
        <h3 className="font-bold text-xl mb-3 border-b pb-2">Category</h3>
        {categories.map(category => (
          <div key={category} className="flex items-center mb-2">
            <input
              type="checkbox" id={category} value={category} onChange={handleCategoryChange}
              className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
            />
            <label htmlFor={category} className="ml-3 text-gray-700 capitalize cursor-pointer">{category}</label>
          </div>
        ))}
      </div>
    </>
  );

  return (
    <>
      {/* Mobile Sidebar */}
      <div className="md:hidden">
        <div 
          className={`fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity ${isSidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
          onClick={closeSidebar}
        ></div>
        <aside 
          className={`fixed top-0 left-0 w-52 h-full bg-white p-6 shadow-xl z-50 transform transition-transform duration-300 ease-in-out ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}
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
        <div className="md:block w-[20%] h-1/2 bg-white p-6 rounded-xl shadow-md mt-2">
          {sidebarContent}
        </div>
      )}
    </>
  );
};

export default Sidebar;