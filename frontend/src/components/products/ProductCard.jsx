import { ShoppingBag, ShoppingCart, Star, Heart } from 'lucide-react';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { Link } from 'react-router-dom';
import { useCart } from '../../hooks/useCart';

const ProductCard = ({ id, name, price, category, image_url: image, rating }) => {
    const { user } = useContext(AuthContext);
    const { getItemQuantity, isInCart, addToCart } = useCart();

    return (
        <div className="group relative bg-white dark:bg-[#110e1b] rounded-2xl overflow-hidden shadow-sm hover:shadow-xl dark:shadow-none dark:hover:shadow-[0_8px_30px_rgb(99,102,241,0.15)] transition-all duration-300 border border-gray-100 dark:border-[#2f2b4a] dark:hover:border-indigo-500/50 p-2">

            {/* Image and link */}
            <div className="relative aspect-[4/5] bg-gray-100 dark:bg-[#19152a] rounded-xl overflow-hidden group-hover:dark:bg-[#1f1a36] transition-colors duration-300">
                <Link to={`/products/${id}`}>
                    <div className="absolute inset-0 flex items-center justify-center text-gray-400 font-medium">
                        <img src={image} alt={name} className="object-cover w-full h-full mix-blend-multiply dark:mix-blend-normal dark:brightness-90 transition-all dark-force" />
                    </div>
                </Link>

                {/* Add to cart */}
                <div
                    className="
            absolute inset-x-2 bottom-2 
            translate-y-0            
            sm:translate-y-full      
            sm:group-hover:translate-y-0 
            transition-transform duration-300
          "
                >
                    {isInCart(id) ? (
                        <div className="flex gap-2">
                            <button
                                onClick={() => addToCart(id)}
                                disabled={!user}
                                className="flex-1 py-3 bg-emerald-600 text-white font-bold rounded-lg flex items-center justify-center space-x-2 shadow-lg active:scale-95 transition-transform"
                            >
                                <ShoppingBag className="h-4 w-4" />
                                <span className="text-xs">Add ({getItemQuantity(id)})</span>
                            </button>
                            <Link
                                to="/cart"
                                className="p-3 bg-indigo-600 text-white rounded-lg flex items-center justify-center shadow-lg active:scale-95 transition-transform"
                            >
                                <ShoppingCart className="h-4 w-4" />
                            </Link>
                        </div>
                    ) : (
                        <button
                            onClick={() => addToCart(id)}
                            disabled={!user}
                            className="w-full py-3 bg-gray-900 dark:bg-indigo-600 text-white font-bold rounded-lg flex items-center justify-center space-x-2 shadow-lg active:scale-95 transition-transform"
                        >
                            <ShoppingBag className="h-4 w-4" />
                            <span className="text-xs">Add to Cart</span>
                        </button>
                    )}
                </div>
            </div>

            {/* Product info */}
            <Link to={`/products/${id}`}>
                <div className="p-4">
                    <div className="flex justify-between items-start mb-1">
                        <span className="text-[10px] font-bold text-indigo-500 uppercase tracking-widest">{category}</span>
                        <div className="flex items-center text-yellow-400">
                            <Star className="h-3 w-3 fill-current" />
                            <span className="text-[10px] ml-1 text-gray-500 font-medium">{rating || '0'}</span>
                        </div>
                    </div>

                    <h3 className="text-sm font-bold text-gray-900 dark:text-gray-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-300 transition-colors truncate">{name}</h3>
                    <p className="mt-1 text-lg font-black text-gray-900 dark:text-white">${price}</p>
                </div>
            </Link>
        </div>
    );
};

export default ProductCard;
