const Toolbar = ({
  searchTerm,
  setSearchTerm,
  toggleSidebar,
  showCategoryDropdown,
  setShowCategoryDropdown,
  searchHistory = [],
  isSearchFocused,
  setIsSearchFocused
}) => {
  return (
    <div className="flex items-center gap-4 mb-6 relative font-rowdies">
      {/* Mobile Sidebar Button */}
      <button
        onClick={toggleSidebar}
        className="p-2 border border-gray-300 rounded-lg md:hidden hover:bg-gray-100 transition-colors"
        aria-label="Open filters">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" />
        </svg>
      </button>

      <div className="relative flex-grow flex items-center">
        {/* Dropdown Button */}
      <div className="hidden md:block">
    <button
      onClick={() => setShowCategoryDropdown(prev => !prev)}
      className="flex items-center gap-2 p-3 border border-gray-300 bg-white rounded-l-lg  rounded-r-none hover:bg-gray-100 transition-colors"
      aria-label="Toggle categories"
    >
      <span className="text-gray-700 font-medium">Category</span>
      <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 transform transition-transform ${showCategoryDropdown ? 'rotate-180' : 'rotate-0'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
      </svg>
    </button>
  </div>

        {/* Input and History */}
        <div className="relative w-full font-righteous">
         <input
            type="text"
            maxLength={30}
            value={searchTerm}  // <- controlled input
            placeholder="Search for products..."
            onFocus={() => setIsSearchFocused(true)}
            onBlur={() => setTimeout(() => setIsSearchFocused(false), 200)}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-3 pr-10 border border-gray-300 rounded-l-none rounded-r-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-shadow"
          />
          <span className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
            <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
            </svg>
          </span>

          {/* Search History Dropdown */}
          {isSearchFocused && searchHistory.length > 0 && (
            <ul className="absolute top-full left-0 w-full bg-white border border-gray-300 shadow-lg z-10 rounded-b-lg overflow-hidden">
              {searchHistory.map((term, index) => (
                <li
                  key={index}
                  onMouseDown={() => setSearchTerm(term)} // use mouseDown to avoid blur
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm text-gray-700 text-left"
                >
                  {term}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default Toolbar;