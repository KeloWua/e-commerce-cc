import { CreditCard, Truck, ShieldCheck, ArrowRight } from 'lucide-react';

const Checkout = () => {
    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="flex flex-col lg:flex-row gap-16">
                {/* Checkout Forms */}
                <div className="flex-grow space-y-12">
                    <section>
                        <div className="flex items-center space-x-4 mb-8">
                            <div className="w-10 h-10 bg-indigo-600 text-white rounded-full flex items-center justify-center font-bold">1</div>
                            <h2 className="text-2xl font-black text-gray-900">Shipping Information</h2>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <input type="text" placeholder="First Name" className="w-full px-5 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all" />
                            <input type="text" placeholder="Last Name" className="w-full px-5 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all" />
                            <input type="text" placeholder="Address" className="md:col-span-2 w-full px-5 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all" />
                            <input type="text" placeholder="City" className="w-full px-5 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all" />
                            <input type="text" placeholder="Postal Code" className="w-full px-5 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all" />
                        </div>
                    </section>

                    <section>
                        <div className="flex items-center space-x-4 mb-8">
                            <div className="w-10 h-10 bg-gray-200 text-gray-600 rounded-full flex items-center justify-center font-bold">2</div>
                            <h2 className="text-2xl font-black text-gray-900">Payment Method</h2>
                        </div>
                        <div className="p-8 bg-gray-900 rounded-3xl text-white">
                            <div className="flex justify-between items-center mb-10">
                                <CreditCard className="h-8 w-8 text-indigo-400" />
                                <div className="flex space-x-2">
                                    <div className="w-8 h-5 bg-gray-700 rounded-sm"></div>
                                    <div className="w-8 h-5 bg-gray-700 rounded-sm"></div>
                                </div>
                            </div>
                            <div className="space-y-6">
                                <input type="text" placeholder="Card Number" className="w-full bg-gray-800 border-none rounded-xl py-4 px-6 text-white placeholder-gray-500 focus:ring-2 focus:ring-indigo-500 transition-all" />
                                <div className="grid grid-cols-2 gap-4">
                                    <input type="text" placeholder="MM/YY" className="bg-gray-800 border-none rounded-xl py-4 px-6 text-white placeholder-gray-500 focus:ring-2 focus:ring-indigo-500 transition-all" />
                                    <input type="text" placeholder="CVC" className="bg-gray-800 border-none rounded-xl py-4 px-6 text-white placeholder-gray-500 focus:ring-2 focus:ring-indigo-500 transition-all" />
                                </div>
                            </div>
                        </div>
                    </section>
                </div>

                {/* Order Summary */}
                <div className="lg:w-96">
                    <div className="glass p-8 rounded-3xl border border-white/40 shadow-xl sticky top-24">
                        <h3 className="text-xl font-black text-gray-900 mb-6">Order Summary</h3>
                        <div className="space-y-4 mb-8">
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-500">Subtotal (2 items)</span>
                                <span className="font-bold text-gray-900">$130.00</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-500">Shipping</span>
                                <span className="text-green-500 font-bold">FREE</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-500">Tax</span>
                                <span className="font-bold text-gray-900">$10.40</span>
                            </div>
                            <div className="h-px bg-gray-100 my-4"></div>
                            <div className="flex justify-between text-lg font-black text-gray-900">
                                <span>Total</span>
                                <span>$140.40</span>
                            </div>
                        </div>

                        <button className="w-full py-4 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200">
                            Complete Purchase
                        </button>

                        <div className="mt-8 flex items-center justify-center space-x-4 text-[10px] text-gray-400 font-bold tracking-widest uppercase">
                            <span className="flex items-center"><ShieldCheck className="h-3 w-3 mr-1" /> SECURE</span>
                            <span className="flex items-center"><Truck className="h-3 w-3 mr-1" /> FAST DELIVERY</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Checkout;
