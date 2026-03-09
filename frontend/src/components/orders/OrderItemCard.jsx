import { Trash2, Plus, Minus } from 'lucide-react';

const OrderItemCard = ({ item, isCart = false, onUpdateQty, onDelete }) => {
    return (
        <div className="flex items-center gap-6 p-6 bg-white dark:bg-gray-900 rounded-3xl border border-gray-100 dark:border-indigo-500/10 shadow-sm hover:shadow-md dark:shadow-indigo-500/5 transition-all">
            <div className="w-24 h-24 bg-gray-100 dark:bg-gray-800 rounded-2xl flex items-center justify-center overflow-hidden shrink-0">
                <img
                    src={item.image_url}
                    alt={item.name}
                    className="object-cover w-full h-full mix-blend-multiply dark:mix-blend-normal"
                />
            </div>

            <div className="flex-grow">
                <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold text-gray-900 dark:text-white text-lg">
                        {item.name}
                    </h3>

                    {isCart ? (
                        <button
                            onClick={() => onDelete && onDelete(item.product_id)}
                            className="text-gray-400 hover:text-red-500 transition-colors"
                        >
                            <Trash2 className="h-5 w-5" />
                        </button>
                    ) : (
                        <span className="text-sm text-gray-500 dark:text-gray-400 font-bold">
                            x{item.quantity}
                        </span>
                    )}
                </div>

                <p className="text-sm font-black text-gray-900 dark:text-white">
                    ${Number(item.price).toFixed(2)}
                    {isCart && " | "}
                    {isCart && (
                        <span className="text-gray-500 dark:text-gray-400 ml-2 font-medium">
                            Subtotal: ${(item.price * item.quantity).toFixed(2)}
                        </span>
                    )}
                </p>

                {!isCart && (
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 font-medium">
                        Subtotal: ${(item.price * item.quantity).toFixed(2)}
                    </p>
                )}

                {isCart && (
                    <div className="mt-4 flex items-center gap-4">
                        <div className="flex items-center border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden bg-white dark:bg-gray-800">
                            <button
                                onClick={() => onUpdateQty && onUpdateQty(item.product_id, item.quantity - 1)}
                                className="px-3 py-1 text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                            >
                                <Minus className="h-4 w-4" />
                            </button>

                            <span className="px-4 text-sm font-bold text-gray-900 dark:text-white">
                                {item.quantity}
                            </span>

                            <button
                                onClick={() => onUpdateQty && onUpdateQty(item.product_id, item.quantity + 1)}
                                className="px-3 py-1 border-l border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                            >
                                <Plus className="h-4 w-4" />
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default OrderItemCard;
