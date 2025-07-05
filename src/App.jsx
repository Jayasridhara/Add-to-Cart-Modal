import { useState ,useEffect} from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import ProductCard from './components/ProductCard';
import Navbar from './components/Navbar';
import CartModal from './components/CartModal';

function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

   useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('https://fakestoreapi.com/products');
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
    };
    fetchProducts();
  }, []);
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
  const closeModal = () => setIsModalOpen(false)
  return (
    <>
    <div className="bg-gray-50 font-sans">
      <Navbar cartCount={cart.length} openModal={openModal} />
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {products.map(product => (
            <ProductCard  key={product.id} product={product} addToCart={addToCart} />
            
          ))}
        </div>
      </main>
      <CartModal
        isOpen={isModalOpen}
        closeModal={closeModal}
        cartItems={cart}
        removeFromCart={removeFromCart}
      />
    </div>
    </>
  )
}

export default App
