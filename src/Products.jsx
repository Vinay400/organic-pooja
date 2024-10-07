import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { motion, useAnimation } from 'framer-motion';
import ProductCard from './components/ProductCard';
import ProductModal from './components/ProductModal';

const allProducts = [
  { id: 1, name: 'Cosmic Face Serum', image: 'img/pro1.jpg', price: '₹99.99', category: 'Skincare' },
  { id: 2, name: 'Nebula Water Spray', image: 'img/pro2.jpg', price: '₹149.99', category: 'Haircare' },
  { id: 3, name: 'Stardust Serum', image: 'img/pro3.jpg', price: '₹149.99', category: 'Skincare' },
  { id: 4, name: 'Galaxy Shampoo & Conditioner', image: 'img/pro4.jpg', price: '₹149.99', category: 'Haircare' },
  { id: 5, name: 'Solar Flare Face Serum', image: 'img/pro5.jpg', price: '₹149.99', category: 'Skincare' },
  { id: 6, name: 'Asteroid Body Lotion', image: 'img/sec2.jpg', price: '₹199.99', category: 'Bodycare' },
  { id: 7, name: 'Lunar Hand Cream', image: 'img/section.jpg', price: '₹129.99', category: 'Bodycare' },
  { id: 8, name: 'Comet Hair Oil', image: 'img/hair.png', price: '₹99.99', category: 'Haircare' },
  { id: 9, name: 'Supernova Vitamin C Serum', image: 'img/shampoo.jpg', price: '₹199.99', category: 'Skincare' },
  { id: 10, name: 'Black Hole Hair Mask', image: 'img/sec3.jpg', price: '₹179.99', category: 'Haircare' },
  { id: 11, name: 'Meteor Shower Scrub', image: 'img/sec4.jpg', price: '₹129.99', category: 'Skincare' },
  { id: 12, name: 'Interstellar Shampoo', image: 'img/sec5.jpg', price: '₹159.99', category: 'Haircare' },
  { id: 13, name: 'Cosmic Ray Body Cream', image: 'img/pro2.jpg', price: '₹219.99', category: 'Bodycare' },
  { id: 14, name: 'Time Warp Face Cream', image: 'img/pro5.jpg', price: '₹249.99', category: 'Skincare' },
  { id: 15, name: 'Neutron Star Hair Serum', image: 'img/pro1.jpg', price: '₹139.99', category: 'Haircare' },
  { id: 16, name: 'Dark Matter Cleansing Oil', image: 'img/sc.png', price: '₹109.99', category: 'Skincare' },
  { id: 17, name: 'Galactic Face Mask', image: 'img/sec2.jpg', price: '₹159.99', category: 'Skincare' },
  { id: 18, name: 'Moonwalk Foot Cream', image: 'img/sec6.jpg', price: '₹119.99', category: 'Bodycare' },
  { id: 19, name: 'Starlight Eye Cream', image: 'img/skin.jpg', price: '₹189.99', category: 'Skincare' },
  { id: 20, name: 'Cosmic Dust Oil Blend', image: 'img/sc.png', price: '₹139.99', category: 'Bodycare' },
];

const categories = ['All', 'Skincare', 'Haircare', 'Bodycare'];

const Products = ({ addToCart }) => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const controls = useAnimation();

  useEffect(() => {
    controls.start({ opacity: 1, y: 0 });
  }, [controls]);

  const filteredProducts = selectedCategory === 'All'
    ? allProducts
    : allProducts.filter(product => product.category === selectedCategory);

  const handleProductDetails = (product) => {
    setSelectedProduct(product);
  };

  const handleCloseModal = () => {
    setSelectedProduct(null);
  };
  
  return (
    <div className="relative min-h-screen overflow-hidden bg-black">
      {/* Space background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/img/space-bg.jpg')] bg-cover bg-center opacity-50"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-purple-900/30 via-blue-900/30 to-black/70"></div>
      </div>

      {/* Content */}
      <div className="container relative px-4 py-16 mx-auto">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={controls}
          className="mb-12 text-5xl font-bold text-center text-purple-300"
        >
          Our Cosmic Collection
        </motion.h1>

        {/* Category Filter */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={controls}
          transition={{ delay: 0.2 }}
          className="mb-16"
        >
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => (
              <motion.button
                key={category}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-6 py-3 text-sm font-medium rounded-full transition-all duration-300 ease-in-out ${
                  selectedCategory === category
                    ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/50'
                    : 'bg-gray-800 text-purple-300 hover:bg-gray-700 border border-purple-500'
                }`}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Products Section */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={controls}
          transition={{ delay: 0.4 }}
          className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
        >
          {filteredProducts.map((product, index) => (
            <motion.div 
              key={product.id} 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <ProductCard
                product={product}
                onAddToCart={addToCart}
                onMoreDetails={handleProductDetails}
                className="bg-gray-900 border border-purple-500 shadow-lg shadow-purple-500/20"
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Modal Section */}
        {selectedProduct && (
          <ProductModal
            product={selectedProduct}
            onClose={handleCloseModal}
            onAddToCart={addToCart}
            className="bg-gray-900 border border-purple-500"
          />
        )}
      </div>
    </div>
  );
};

Products.propTypes = {
  addToCart: PropTypes.func.isRequired,
};

export default Products;