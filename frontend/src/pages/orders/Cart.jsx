import { CreditCard } from 'lucide-react';
import { useContext } from 'react';
import { OrderContext } from '../../context/OrderContext';
import OrderItemCard from '../../components/orders/OrderItemCard';

const Cart = () => {


    const { order, updateItemQty, stripePaymentCheckout } = useContext(OrderContext);


    if (!order || order.items.length === 0) {
        return (
            <div className="text-center py-20 dark:bg-gray-950 transition-colors duration-300 min-h-screen">
                <h2 className="text-2xl font-bold dark:text-gray-200">Your cart is empty</h2>
            </div>
        );
    }


    const total = order.total;


    const handleUpdateQty = async (productId, newQty) => {
        if (newQty < 1) return;
        await updateItemQty(productId, newQty);
    };


    const handleDelete = async (productId) => {
        await updateItemQty(productId, 0);
    };

    const handleCheckOut = async () => {
        try {
            const url = await stripePaymentCheckout(); // get Stripe URL
            if (url) {
                // Redirect to Stripe checkout
                window.location.href = url;
            }
        } catch (error) {
            console.error("Error loading checkout:", error);
        }
    };
    return (
        <div className="max-w-7xl mx-auto px-4 py-16 dark:bg-gray-950 transition-colors duration-300 min-h-screen">

            <h1 className="text-4xl font-black mb-12 dark:text-indigo-200">
                Your Shopping Cart
            </h1>

            <div className="flex flex-col lg:flex-row gap-12">

                {/* ITEMS LIST */}
                <div className="flex-grow space-y-6">

                    {order.items.map((item) => (
                        <OrderItemCard
                            key={item.id}
                            item={item}
                            isCart={true}
                            onUpdateQty={handleUpdateQty}
                            onDelete={handleDelete}
                        />
                    ))}

                </div>

                {/* SUMMARY */}
                <div className="lg:w-96">
                    <div className="bg-gray-900 border border-gray-100 dark:border-indigo-500/10 text-white p-10 rounded-[40px] sticky top-24 shadow-xl dark:shadow-indigo-500/5">

                        <h2 className="text-2xl font-black mb-8 dark:text-white">
                            Order Summary
                        </h2>

                        <div className="flex justify-between text-xl font-black">
                            <span>Total</span>
                            <span className="text-pink-400 dark:text-pink-400">
                                ${total}
                            </span>
                        </div>

                        <button
                            onClick={handleCheckOut}
                            className="w-full py-5 mt-8 bg-white dark:bg-indigo-600 text-gray-900 dark:text-white font-bold rounded-2xl flex justify-center hover:bg-gray-100 dark:hover:bg-indigo-500 transition-colors"
                        >
                            Proceed to Checkout
                            <CreditCard className="ml-3 h-5 w-5" />
                        </button>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Cart;
