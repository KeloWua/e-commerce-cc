import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchOrderById } from '../services/order.service';
import { ArrowLeft } from 'lucide-react';


const OrderDetail = () => {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);
  const [items, setItems] = useState([]);
  useEffect(() => {
    const loadOrder = async () => {
      const data = await fetchOrderById(orderId);
      setOrder(data.order[0]);
      setItems(data.items);
    };

    loadOrder();
  }, [orderId]);

  if (!order) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-24 text-center">
        <p className="text-gray-500 text-lg">Loading order...</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">

      {/* Header */}
      <div className="flex items-center justify-between mb-12">
        <div>
          <h1 className="text-4xl font-black text-gray-900">
            Order #{order.id}
          </h1>
          <p className="text-gray-500 mt-2 text-sm">
            Status: <span className="font-bold text-indigo-600">{order.status}</span>
          </p>
        </div>

        <Link
          to="/orders"
          className="flex items-center text-gray-600 hover:text-gray-900 transition-colors font-bold"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Orders
        </Link>
      </div>

      {/* Shipping Address & User Info */}
      <div className="flex flex-col md:flex-row md:justify-between gap-6 pb-5">
        {/* User Info */}
        <div className="bg-white shadow-md rounded-lg p-4 border border-gray-200 flex-1">
          <h2 className="text-lg font-bold mb-2">User Information</h2>
          <div className="flex flex-col gap-1 text-gray-700 text-sm">
            <div>
              <span className="font-semibold">Name:</span> <span className="font-light">{order.shipping_name}</span>
            </div>
            <div>
              <span className="font-semibold">Email:</span> <span className="font-light">{order.shipping_email}</span>
            </div>
            <div>
              <span className="font-semibold">Phone:</span> <span className="font-light">{order.shipping_phone || "N/A"}</span>
            </div>
          </div>
        </div>

        {/* Shipping Address */}
        <div className="bg-white shadow-md rounded-lg p-4 border border-gray-200 flex-1">
          <h2 className="text-lg font-bold mb-2">Shipping Address</h2>
          <div className="flex flex-col gap-1 text-gray-700 text-sm">
            <div>
              <span className="font-semibold">Address line 1:</span> <span className="font-light">{order.shipping_address_line1}</span>
            </div>
            {order.shipping_address_line2 && (
              <div>
                <span className="font-semibold">Address line 2:</span> <span className="font-light">{order.shipping_address_line2}</span>
              </div>
            )}
            <div>
              <span className="font-semibold">City:</span> <span className="font-light">{order.shipping_city}</span>
            </div>
            <div>
              <span className="font-semibold">Post Code:</span> <span className="font-light">{order.shipping_postal_code}</span>
            </div>
            <div>
              <span className="font-semibold">Country:</span> <span className="font-light">{order.shipping_country}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-12">

        {/* Items List */}
        <div className="flex-grow space-y-6">
          {items.map((item, i) => (
            <div
              key={i}
              className="flex items-center gap-6 p-6 bg-white rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-all"
            >
              <div className="w-24 h-24 bg-gray-100 rounded-2xl flex items-center justify-center">
                <img
                  src={item.image_url}
                  alt={item.name}
                  className="rounded-lg object-cover w-full h-full"
                />
              </div>

              <div className="flex-grow">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-bold text-gray-900 text-lg">
                    {item.name}
                  </h3>
                  <span className="text-sm text-gray-500 font-bold">
                    x{item.quantity}
                  </span>
                </div>

                <p className="text-sm font-black text-gray-900">
                  ${Number(item.price).toFixed(2)}
                </p>

                <p className="text-xs text-gray-500 mt-1">
                  Subtotal: ${(item.price * item.quantity).toFixed(2)}
                </p>
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
                <span>Items</span>
                <span>{items.length}</span>
              </div>

              <div className="flex justify-between text-gray-400 text-sm">
                <span>Subtotal</span>
                <span>${Number(order.total || 0).toFixed(2)}</span>
              </div>

              <div className="h-px bg-gray-800 my-4"></div>

              <div className="flex justify-between text-xl font-black">
                <span>Total</span>
                <span className="text-pink-400">
                  ${Number(order.total || 0).toFixed(2)}
                </span>
              </div>
            </div>

            <div className="text-[11px] text-gray-400 text-center">
              Order placed on {new Date(order.created_at).toLocaleDateString()}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default OrderDetail;