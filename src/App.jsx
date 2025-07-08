// App.jsx
import { useState ,useEffect} from 'react';
import './App.css'
import ProductCard from './components/ProductCard';
import Navbar from './components/Navbar';
import CartModal from './components/CartModal';
import loadingImage from './assets/loding.gif';
import Sidebar from './components/Sidebar';
import Toolbar from './components/Toolbar';
import CustomAlert from './components/CustomAlert';

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

  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [selectedPriceRange, setSelectedPriceRange] = useState('');

  const [selectedColors, setSelectedColors] = useState([]); // NEW STATE: for colors

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('https://fakestoreapi.com/products');
        const data = await response.json();

        // --- START: MOCKING COLOR DATA (as explained above) ---
        const productsWithColors = data.map(product => {
          if (product.category === "men's clothing" || product.category === "women's clothing") {
            let availableColors = [];
            // Assign some common colors for clothing categories
            if (product.title.toLowerCase().includes('backpack')|| product.title.toLowerCase().includes('mens casual slim fit')) {
              availableColors = ['Blue'];
            }
            else if(product.title.toLowerCase().includes('neck v'))
            {
              availableColors = ['White'];
            }
             else if(product.title.toLowerCase().includes('moto biker'))
            {
              availableColors = ['Black'];
            }
            else if(product.title.toLowerCase().includes('rain jacket'))
            {
               availableColors = ['Blue','White'];
            }
            else if (product.title.toLowerCase().includes('premium')) {
              availableColors = ['Black','Grey'];
            }
            else if (product.title.toLowerCase().includes('mens cotton jacket')) {
              availableColors = ['Black','Brown'];
            }
            else if (product.title.toLowerCase().includes('3-in-1') || product.title.toLowerCase().includes('3-in-1')|| product.title.toLowerCase().includes('womens t shirt casual')) {
              availableColors = [ 'Violet'];
            } else if (product.title.toLowerCase().includes('moisture')) {
              availableColors = ['Red'];
            } 

            else { // Generic clothing item
                availableColors = ['Yellow', 'Green','Pink'];
            }
            return { ...product, colors: availableColors };
          }
          return { ...product, colors: [] };
        });
        setProducts(productsWithColors);
        setFilteredProducts(productsWithColors);
        // --- END: MOCKING COLOR DATA ---

      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
      finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // Effect to filter products when search, categories, price range, or colors change
  useEffect(() => {
    let tempProducts = [...products];

    // Apply search term filter
    if (searchTerm.trim().length > 1) {
      const matches = products.filter(product =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
      tempProducts = matches;
      if (matches.length > 0 && !searchHistory.includes(searchTerm)) {
        setSearchHistory(prev => {
          const updatedHistory = [searchTerm, ...prev.filter(term => term !== searchTerm)];
          return updatedHistory.slice(0, 5);
        });
      }
    }

    // Apply category filter
    if (selectedCategories.length > 0) {
      tempProducts = tempProducts.filter(product =>
        selectedCategories.includes(product.category)
      );
    }

    // Apply price range filter
    if (selectedPriceRange) {
      const [minStr, maxStr] = selectedPriceRange.split('-');
      const minPrice = parseFloat(minStr);
      const maxPrice = maxStr ? parseFloat(maxStr) : Infinity;

      tempProducts = tempProducts.filter(product =>
        product.price >= minPrice && product.price <= maxPrice
      );
    }

    // NEW: Apply color filter
    if (selectedColors.length > 0) {
      tempProducts = tempProducts.filter(product =>
        // Check if the product has any of the selected colors
        product.colors && selectedColors.some(color => product.colors.includes(color))
      );
    }


    console.log("Filtering with:", {
      searchTerm,
      selectedCategories,
      selectedPriceRange,
      selectedColors, // Log new state
      resultCount: tempProducts.length,
    });
    setFilteredProducts(tempProducts);
  }, [searchTerm, selectedCategories, selectedPriceRange, selectedColors, products]); // Add selectedColors to dependencies

  const addToCart = (product) => {
    if (cart.find(item => item.id === product.id)) {
      setAlertMessage('Item is already in your cart!');
      setShowAlert(true);
    } else {
      setCart(prevCart => [...prevCart, product]);
      setAlertMessage(`${product.title} added to cart!`);
      setShowAlert(true);
    }
  };

  const removeFromCart = (productId) => {
    setCart(prevCart => prevCart.filter(item => item.id !== productId));
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const closeSidebar = () => setIsSidebarOpen(false);

  const closeAlert = () => setShowAlert(false);

  return (
    <>
    {loading ? (
      <div className="flex justify-center items-center h-screen">
        <img src={loadingImage} alt="Loading..." className='w-full h-full object-contain'/>
      </div>
    ) : (
      <div className="min-h-screen bg-gray-50 font-sans">
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
              selectedPriceRange={selectedPriceRange}
              setSelectedPriceRange={setSelectedPriceRange}
              selectedCategories={selectedCategories} // Pass selectedCategories to Sidebar
              selectedColors={selectedColors}         // Pass selectedColors to Sidebar
              setSelectedColors={setSelectedColors}   // Pass setSelectedColors to Sidebar
              allProducts={products} // Pass all products to derive available colors dynamically
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

        <CustomAlert
          isOpen={showAlert}
          message={alertMessage}
          onClose={closeAlert}
        />
      </div>
    )}
    </>
  )
}

export default App