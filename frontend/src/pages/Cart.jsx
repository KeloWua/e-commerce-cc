import { Trash2, Plus, Minus, CreditCard } from 'lucide-react';
import { useContext } from 'react';
import { OrderContext } from '../context/OrderContext';

const Cart = () => {


  const { order, updateItemQty, stripePaymentCheckout } = useContext(OrderContext);


  if (!order || order.items.length === 0) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold">Your cart is empty</h2>
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
    <div className="max-w-7xl mx-auto px-4 py-16">

      <h1 className="text-4xl font-black mb-12">
        Your Shopping Cart
      </h1>

      <div className="flex flex-col lg:flex-row gap-12">

        {/* ITEMS LIST */}
        <div className="flex-grow space-y-6">

          {order.items.map((item) => (

            <div
              key={item.id}
              className="flex items-center gap-6 p-6 bg-white rounded-3xl border shadow-sm"
            >

              <img
                src={item.image_url}
                alt={item.name}
                className="w-24 h-24 rounded-xl"
              />

              <div className="flex-grow">

                <div className="flex justify-between mb-2">
                  <h3 className="font-bold">{item.name}</h3>

                  <button
                    onClick={() => handleDelete(item.product_id)}
                    className="text-gray-400 hover:text-red-500"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>

                <p className="text-sm font-bold">
                  ${item.price.toFixed(2)} |
                  <span className="text-gray-500 ml-2">
                    Subtotal: ${(item.price * item.quantity).toFixed(2)}
                  </span>
                </p>

                <div className="mt-4 flex items-center gap-4">

                  <div className="flex items-center border rounded-lg overflow-hidden">

                    <button
                      onClick={() => handleUpdateQty(item.product_id, item.quantity - 1)}
                      className="px-3"
                    >
                      <Minus className="h-3 w-3" />
                    </button>

                    <span className="px-4 text-xs font-bold">
                      {item.quantity}
                    </span>

                    <button
                      onClick={() => handleUpdateQty(item.product_id, item.quantity + 1)}
                      className="px-3 border-l"
                    >
                      <Plus className="h-3 w-3" />
                    </button>

                  </div>

                </div>
              </div>
            </div>
          ))}

        </div>

        {/* SUMMARY */}
        <div className="lg:w-96">
          <div className="bg-gray-900 text-white p-10 rounded-[40px] sticky top-24">

            <h2 className="text-2xl font-black mb-8">
              Order Summary
            </h2>

            <div className="flex justify-between text-xl font-black">
              <span>Total</span>
              <span className="text-pink-400">
                ${total}
              </span>
            </div>

            <button

              onClick={handleCheckOut}
              className="w-full py-5 mt-8 bg-black text-gray-100 font-bold rounded-2xl flex justify-center"
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