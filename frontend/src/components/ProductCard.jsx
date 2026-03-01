import { ShoppingBag, Star, Heart } from 'lucide-react';
import { useContext } from 'react';
import { ProductsContext } from '../context/ProductsProvider';
import { AuthContext } from '../context/AuthContext';
import { OrderContext } from '../context/OrderContext';


const ProductCard = ({ id, name, price, category, image_url: image }) => {

    const { addItem } = useContext(ProductsContext);
    const { order } = useContext(OrderContext)
    const { user } = useContext(AuthContext);
    
    const getItemInCart = (productId) => {
        const item = (order?.items ?? []).find(item => item.product_id === productId);
        return item.quantity?? 0;
    };



    const handleItemInCart = (productId) => {
        const isInCart = (order?.items ?? []).some(item => item.product_id === productId);
        return isInCart;
    }

    const handleAddProductToOrder = async (productId) => {
        await addItem(productId)
    };

    return (
        <div className="group relative bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all border border-gray-100 p-2">
            <div className="relative aspect-[4/5] bg-gray-100 rounded-xl overflow-hidden">
                {/* Placeholder for Product Image */}
                <div className="absolute inset-0 flex items-center justify-center text-gray-400 font-medium">
                    <img src={image} alt={name} />
                </div>
                <button className="absolute top-3 right-3 p-2 bg-white/80 backdrop-blur-md rounded-full text-gray-400 hover:text-pink-500 transition-colors shadow-sm">
                    <Heart className="h-4 w-4" />
                </button>
                <div className="absolute inset-x-2 bottom-2 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    {/* Add to cart toggle effect */}
                    {
                        handleItemInCart(id)
                            ?
                            <>
                                <button
                                    onClick={() => handleAddProductToOrder(id)}
                                    disabled={!user}
                                    className="w-full py-3 bg-green-900 text-white font-bold rounded-lg flex items-center justify-center space-x-2 shadow-lg">
                                    <ShoppingBag className="h-4 w-4" />
                                    <span className="text-xs">Add more</span>
                                    <span className="text-xs opacity-60">Qty: {getItemInCart(id) ?? 0}</span>
                                </button>
                            </>
                            :
                            <>
                                <button
                                    onClick={() => handleAddProductToOrder(id)}
                                    disabled={!user}
                                    className="w-full py-3 bg-gray-900 text-white font-bold rounded-lg flex items-center justify-center space-x-2 shadow-lg">
                                    <ShoppingBag className="h-4 w-4" />
                                    <span className="text-xs">Add to Cart</span>
                                </button>
                            </>

                    }
                </div>
            </div>
            <div className="p-4">
                <div className="flex justify-between items-start mb-1">
                    <span className="text-[10px] font-bold text-indigo-500 uppercase tracking-widest">{category}</span>
                    <div className="flex items-center text-yellow-400">
                        <Star className="h-3 w-3 fill-current" />
                        <span className="text-[10px] ml-1 text-gray-500 font-medium">0</span>
                    </div>
                </div>
                <h3 className="text-sm font-bold text-gray-900 group-hover:text-indigo-600 transition-colors truncate">{name}</h3>
                <p className="mt-1 text-lg font-black text-gray-900">${price}</p>
            </div>
        </div>
    );
};

export default ProductCard;
