import { Trash2, Plus, Minus, ArrowRight, CreditCard, Podcast } from 'lucide-react';
import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { fetchOrder } from '../services/order.service';
import { updateQtyProduct } from '../services/order.service';
import { productsContext } from '../context/ProductsProvider';


const Cart = () => {

    const { user } = useContext(AuthContext);
    const [cart, setCart] = useState({ items: [], total: 0 });
    useEffect(() => {
        if (!user) {
            return
        } else {
            const load = async () => {
                const data = await fetchOrder();

                const total = Number(data.total) || 0;
                const items = data.items.map(item => ({
                    ...item,
                    price: Number(item.price),
                    quantity: Number(item.quantity)
                }));
                setCart({ items, total });
            }
            load()
        }
    }, []);


    const handleUpdateQty = async (productId, newQty) => {
        setCart(prevCart => {
            const newItems = prevCart.items.map(item =>
                item.product_id === productId
                    ? { ...item, quantity: newQty }
                    : item
            );

            const newTotal = newItems.reduce((acc, item) => acc + item.quantity * item.price, 0);

            return {
                ...prevCart,
                items: newItems,
                total: newTotal
            };
        });

        try {
            await updateQtyProduct(productId, newQty);
        } catch (error) {
            console.error("Error updating quantity: ", error);
            const data = await fetchOrder();
            setCart(data);
        }
    };

    const handleDelete = async (productId) => {
        try {
            await updateQtyProduct(productId, 0);
            const data = await fetchOrder();
            setCart(data);
        } catch (error) {
            console.error("Error deleting product: ", error);
            const data = await fetchOrder();
            setCart(data);
        }
    }


    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <h1 className="text-4xl font-black text-gray-900 mb-12">Your Shopping Cart</h1>

            <div className="flex flex-col lg:flex-row gap-12">
                {/* Cart Items List */}
                <div className="flex-grow space-y-6">
                    {cart.items?.map((item, i) => (
                        <div key={i} className="flex items-center gap-6 p-6 bg-white rounded-3xl border border-gray-100 shadow-sm transition-all hover:shadow-md">
                            <div className="w-24 h-24 bg-gray-100 rounded-2xl flex items-center justify-center text-xs font-bold text-gray-400">
                                <img src={item.image_url} alt={item.name} className='rounded-lg' />
                            </div>
                            <div className="flex-grow">
                                <div className="flex justify-between items-start mb-2">
                                    <h3 className="font-bold text-gray-900">{item.name}</h3>
                                    <button
                                        onClick={() => handleDelete(item.product_id)}
                                        className="text-gray-400 hover:text-red-500 transition-colors">
                                        <Trash2 className="h-4 w-4" />
                                    </button>
                                </div>
                                <p className="text-sm font-black text-gray-900">${item.price} | <span className='text-gray-500'>Subotal: {(item.price * item.quantity).toFixed(2)}</span></p>

                                <div className="mt-4 flex items-center gap-4">
                                    <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden">
                                        <button
                                            onClick={() => handleUpdateQty(item.product_id, item.quantity - 1)}
                                            disabled={item.quantity <= 1}
                                            className="p-1 px-3 hover:bg-gray-100 transition-colors"><Minus className="h-3 w-3" /></button>
                                        <span className="px-4 text-xs font-bold">{item.quantity}</span>
                                        <button
                                            onClick={() => handleUpdateQty(item.product_id, item.quantity + 1)}
                                            className="p-1 px-3 hover:bg-gray-100 transition-colors border-l border-gray-200"><Plus className="h-3 w-3" /></button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Order Summary Sidebar */}
                <div className="lg:w-96">
                    <div className="bg-gray-900 text-white p-10 rounded-[40px] shadow-2xl sticky top-24">
                        <h2 className="text-2xl font-black mb-8">Order Summary</h2>

                        <div className="space-y-4 mb-8">
                            <div className="flex justify-between text-gray-400 text-sm">
                                <span>Subtotal</span>
                                <span>${Number(cart.total || 0).toFixed(2)}</span>
                            </div>
                            <div className="h-px bg-gray-800 my-4"></div>
                            <div className="flex justify-between text-xl font-black">
                                <span>Total</span>
                                <span className="text-pink-400">${Number(cart.total || 0).toFixed(2)}</span>
                            </div>
                        </div>

                        <Link to="/checkout" className="w-full py-5 bg-white text-gray-900 font-bold rounded-2xl hover:bg-pink-400 hover:text-white transition-all flex items-center justify-center group shadow-xl">
                            Proceed to Checkout
                            <CreditCard className="ml-3 h-5 w-5" />
                        </Link>

                        <p className="mt-6 text-[10px] text-gray-400 text-center">
                            Secure checkout guaranteed. Multiple payment methods supported.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;
