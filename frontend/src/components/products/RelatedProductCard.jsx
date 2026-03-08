import { ShoppingBag, Star, Heart } from 'lucide-react';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { Link } from 'react-router-dom';
import { useCart } from '../../hooks/useCart';

const RelatedProductCard = ({ id, name, price, category, image_url: image }) => {
    const { user } = useContext(AuthContext);
    const { getItemQuantity, isInCart, addToCart } = useCart();

    return (
        <div className="group relative bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all border border-gray-100 p-1">
            <div className="relative aspect-[4/5] bg-gray-100 rounded-lg overflow-hidden">
                {/* Image */}
                <div className="absolute inset-0 flex items-center justify-center text-gray-400 font-medium">
                    <img src={image} alt={name} className="object-cover w-full h-full" />
                </div>

                {/* Favourite */}
                <button className="absolute top-2 right-2 p-1 bg-white/80 backdrop-blur-md rounded-full text-gray-400 hover:text-pink-500 transition-colors shadow-sm">
                    <Heart className="h-3 w-3" />
                </button>

                {/* Add to cart */}
                <div className="absolute inset-x-1 bottom-1 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    {isInCart(id) ? (
                        <button
                            onClick={() => addToCart(id)}
                            disabled={!user}
                            className="w-full py-2 bg-green-900 text-white font-bold rounded-md flex items-center justify-center space-x-1 shadow-sm text-[10px]"
                        >
                            <ShoppingBag className="h-3 w-3" />
                            <span>Add more</span>
                            <span className="opacity-60">Qty: {getItemQuantity(id) ?? 0}</span>
                        </button>
                    ) : (
                        <button
                            onClick={() => addToCart(id)}
                            disabled={!user}
                            className="w-full py-2 bg-gray-900 text-white font-bold rounded-md flex items-center justify-center space-x-1 shadow-sm text-[10px]"
                        >
                            <ShoppingBag className="h-3 w-3" />
                            <span>Add</span>
                        </button>
                    )}
                </div>
            </div>

            <div className="p-2">
                <div className="flex justify-between items-start mb-1">
                    <span className="text-[8px] font-bold text-indigo-500 uppercase tracking-widest">{category}</span>
                    <div className="flex items-center text-yellow-400">
                        <Star className="h-3 w-3 fill-current" />
                        <span className="text-[9px] ml-1 text-gray-500 font-medium">0</span>
                    </div>
                </div>

                <Link to={`/products/${id}`}>
                    <h3 className="text-[12px] font-bold text-gray-900 group-hover:text-indigo-600 transition-colors truncate">{name}</h3>
                </Link>

                <p className="mt-1 text-sm font-black text-gray-900">${price}</p>
            </div>
        </div>
    );
};

export default RelatedProductCard;
