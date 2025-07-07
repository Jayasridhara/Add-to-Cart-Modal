import { useState ,useEffect} from 'react';
import './App.css'
import ProductCard from './components/ProductCard';
import Navbar from './components/Navbar';
import CartModal from './components/CartModal';
import loadingImage from './assets/loding.gif'; 
import Sidebar from './components/Sidebar';
import Toolbar from './components/Toolbar';

function App() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategories, setCategories] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const [searchHistory, setSearchHistory] = useState([]);
const [isSearchFocused, setIsSearchFocused] = useState(false);

   useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('https://fakestoreapi.com/products');
        const data = await response.json();
        setProducts(data);
        setFilteredProducts(data);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
      finally {
        setLoading(false); // Set loading to false after fetching is complete
      }
    };
    fetchProducts();
  }, []);

    // Effect to filter products when search or categories change
  useEffect(() => {
    let tempProducts = [...products];
   if (searchTerm.trim().length > 1) {
  const matches = products.filter(product =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );
  tempProducts = matches;
  if (matches.length > 0 && !searchHistory.includes(searchTerm)) {
    setSearchHistory(prev => {
      const updatedHistory = [searchTerm, ...prev.filter(term => term !== searchTerm)];
      return updatedHistory.slice(0, 5); // Keep last 5 items
    });
  }
}


    if (selectedCategories.length > 0) {
      tempProducts = tempProducts.filter(product =>
        selectedCategories.includes(product.category)
      );
    }

    console.log("Filtering with:", {
  searchTerm,
  selectedCategories,
  resultCount: tempProducts.length,
});
    setFilteredProducts(tempProducts);


  }, [searchTerm, selectedCategories, products]);

  const addToCart = (product) => {
    if (cart.find(item => item.id === product.id)) {
      alert('Item already added to the cart');
    } else {
      setCart(prevCart => [...prevCart, product]);
    }
  };

  const removeFromCart = (productId) => {
    setCart(prevCart => prevCart.filter(item => item.id !== productId));
  };

   const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

   const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const closeSidebar = () => setIsSidebarOpen(false);
  return (
    <>
    {loading ? (
            <div className="flex justify-center items-center h-screen">
              <img src={loadingImage} alt="Loading..." className='w-full h-full object-contain'/>
            </div>
          ) : (
   <div className="min-h-screen  bg-gray-50 font-sans">
  <Navbar cartCount={cart.length} openModal={openModal} />

  <div className="flex-1 container mx-auto px-4 py-8 flex flex-col">
  <Toolbar
    searchTerm={searchTerm} 
    setSearchTerm={setSearchTerm}
    toggleSidebar={toggleSidebar}
    showCategoryDropdown={showCategoryDropdown}
    setShowCategoryDropdown={setShowCategoryDropdown}
    searchHistory={searchHistory}
    isSearchFocused={isSearchFocused}
    setIsSearchFocused={setIsSearchFocused}
  />

    <div className="flex flex-col md:flex-row gap-8 flex-1">
       <Sidebar
        setCategories={setCategories}
        isSidebarOpen={isSidebarOpen}
        closeSidebar={closeSidebar}
        showCategoryDropdown={showCategoryDropdown}
        isMobile={false}
      />
    <main className="flex-1">
      <div className="min-h-[300px] w-full">
      
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {(filteredProducts.length > 0 ? filteredProducts : products).map(product => (
            <ProductCard key={product.id} product={product} addToCart={addToCart} />
            ))}
          </div>
      </div>
    </main>
     
    </div>
  </div>

  <CartModal
    isOpen={isModalOpen}
    closeModal={closeModal}
    cartItems={cart}
    removeFromCart={removeFromCart}
  />
</div>

     )}
    </>
  )
}

export default App
