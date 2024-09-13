import PropTypes from 'prop-types';
import { useCallback } from 'react';

const Cart = ({ cartItems, updateQuantity, removeFromCart, onBuyNow }) => {
  const handleQuantityChange = useCallback(
    (product, quantity) => {
      if (quantity <= 0) {
        removeFromCart(product);
      } else {
        updateQuantity(product, quantity);
      }
    },
    [updateQuantity, removeFromCart]
  );

  const handleRemoveItem = (product) => {
    removeFromCart(product);
  };

  return (
    <div className="container max-w-screen-sm px-2 py-4 mx-auto">
      <h2 className="mb-4 text-xl font-semibold text-gray-900">Your Cart</h2>
      {cartItems.length === 0 ? (
        <p className="text-base text-gray-500">Your cart is empty.</p>
      ) : (
        <div className="grid gap-4">
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="flex items-start overflow-hidden bg-white border border-gray-200 rounded-lg shadow-sm"
            >
              <img
                src={item.image}
                alt={item.name}
                className="object-cover w-24 h-24"
                loading="lazy"
              />
              <div className="flex flex-col flex-grow p-2">
                <h3 className="text-base font-semibold text-gray-800">{item.name}</h3>
                <p className="text-sm text-gray-600">{item.price}</p>
                <div className="flex items-center mt-2 space-x-1">
                  <button
                    onClick={() => handleQuantityChange(item, item.quantity - 1)}
                    className="flex items-center justify-center w-6 h-6 text-white bg-blue-600 rounded-full hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  >
                    -
                  </button>
                  <span className="flex items-center justify-center w-8 h-6 text-sm font-medium bg-gray-100 rounded">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => handleQuantityChange(item, item.quantity + 1)}
                    className="flex items-center justify-center w-6 h-6 text-white bg-blue-600 rounded-full hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  >
                    +
                  </button>
                </div>
                <div className="flex items-center justify-between mt-2">
                  <p className="text-sm font-semibold text-gray-900">
                    ${(parseFloat(item.price.slice(1)) * item.quantity).toFixed(2)}
                  </p>
                  <div className="flex space-x-1">
                    <button
                      onClick={() => handleRemoveItem(item)}
                      className="px-2 py-1 text-xs font-semibold text-white bg-red-600 rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-400"
                    >
                      Remove
                    </button>
                    <button
                      onClick={() => onBuyNow(item)}
                      className="px-2 py-1 text-xs font-semibold text-gray-800 bg-gray-100 rounded-lg hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-400"
                    >
                      Buy Now
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

Cart.propTypes = {
  cartItems: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
      price: PropTypes.string.isRequired,
      quantity: PropTypes.number.isRequired,
    })
  ).isRequired,
  updateQuantity: PropTypes.func.isRequired,
  removeFromCart: PropTypes.func.isRequired,
  onBuyNow: PropTypes.func.isRequired,
};

export default Cart;
