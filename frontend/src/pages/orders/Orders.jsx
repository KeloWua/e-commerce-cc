import { Package, ChevronRight, Clock } from 'lucide-react';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { OrderContext } from '../../context/OrderContext';

const Orders = () => {

    const [orders, setOrders] = useState([])
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);
    const { getUserOrders } = useContext(OrderContext);

    useEffect(() => {
        const loadOrders = async () => {
            const userOrders = await getUserOrders();
            setOrders(userOrders)
        }
        if (user)
            loadOrders();
    }, [])

    const handleGetOrder = async (orderId) => {
        navigate(`/orders/${orderId}`)
    }
    if (!user) {
        navigate('/')
    }
    if (!orders) {
        return (
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="flex items-center justify-between mb-12">
                    <h1 className="text-4xl font-black text-gray-900">No orders</h1>
                </div>
            </div>
        )
    }
    return (
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 dark:bg-gray-950 transition-colors duration-300">
            <div className="flex items-center justify-between mb-12">
                <h1 className="text-4xl font-black text-gray-900 dark:text-white">Your Orders</h1>
                <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
                    {/**{<Clock className="h-4 w-4" />
                    <span>Last 6 months</span>} */}
                </div>
            </div>

            <div className="space-y-6">
                {orders?.map((order, i) => (
                    <div key={i} className="group bg-white dark:bg-gray-900 rounded-3xl border border-gray-100 dark:border-indigo-500/10 p-8 shadow-sm hover:shadow-md dark:shadow-indigo-500/5 transition-all flex flex-col md:flex-row md:items-center justify-between gap-6">
                        <div className="flex items-center space-x-6">
                            <div className="w-16 h-16 bg-gray-50 dark:bg-gray-800 rounded-2xl flex items-center justify-center text-indigo-600 dark:text-indigo-400">
                                <Package className="h-8 w-8" />
                            </div>
                            <div>
                                <h3 className="font-black text-gray-900 dark:text-white text-lg">#-{order.id}</h3>
                                <p className="text-gray-400 dark:text-gray-500 text-sm font-medium">{order.date}</p>
                            </div>
                        </div>

                        <div className="flex items-center justify-between md:justify-end flex-grow gap-12">
                            <div className="text-right">
                                <p className="text-gray-400 dark:text-gray-500 text-xs font-bold uppercase tracking-widest mb-1">Total Amount</p>
                                <p className="text-xl font-black text-gray-900 dark:text-white">${order.total}</p>
                            </div>

                            <div className="text-right">
                                <span className={`px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-tighter ${order.status === 'pending' ? 'bg-blue-100 text-blue-600' : 'bg-green-100 text-green-600'
                                    }`}>
                                    {order.status}
                                </span>
                            </div>

                            <button
                                onClick={() => order.status === 'pending' ? navigate('/cart') : handleGetOrder(order.id)}
                                className="p-3 bg-gray-50 dark:bg-gray-800 rounded-full text-gray-400 dark:text-gray-500 group-hover:bg-indigo-600 dark:group-hover:bg-indigo-500 group-hover:text-white transition-all">
                                <ChevronRight className="h-5 w-5" />
                            </button>
                        </div>
                    </div>
                ))}

                {orders?.length === 0 && (
                    <div className="text-center py-24 bg-gray-50 dark:bg-gray-900/50 rounded-[40px] border-2 border-dashed border-gray-200 dark:border-gray-800">
                        <Package className="h-12 w-12 text-gray-300 dark:text-gray-700 mx-auto mb-4" />
                        <p className="text-gray-500 dark:text-gray-400 font-medium">No orders found yet. Time to go shopping!</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Orders;
