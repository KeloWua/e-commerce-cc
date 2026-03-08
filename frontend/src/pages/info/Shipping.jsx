import { Truck, Globe, Clock, ShieldCheck, Mail, MapPin } from 'lucide-react';

const Shipping = () => {
    return (
        <div className="min-h-screen bg-gray-50/50 py-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Header Section */}
                <div className="text-center mb-20">
                    <span className="text-xs font-black text-indigo-500 uppercase tracking-[6px] mb-4 inline-block">Worldwide Logistics</span>
                    <h1 className="text-5xl md:text-7xl font-black text-gray-900 mb-6 tracking-tighter">
                        Fast, Safe & <br /> <span className="text-pink-600 underline decoration-8 decoration-pink-500/20 underline-offset-8">Reliable.</span>
                    </h1>
                    <p className="text-gray-500 text-xl font-medium max-w-2xl mx-auto leading-relaxed">
                        We partner with global leaders in logistics to bring your favorite products to your door in record time.
                    </p>
                </div>

                {/* Shipping Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
                    <div className="group bg-white p-10 rounded-[3rem] border border-gray-100 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500">
                        <div className="w-16 h-16 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600 mb-8 transform group-hover:scale-110 transition-transform duration-500">
                            <Clock size={32} />
                        </div>
                        <h3 className="text-2xl font-black text-gray-900 mb-4">Express Handling</h3>
                        <p className="text-gray-500 leading-relaxed font-medium">All orders are processed and shipped within 24 hours (Monday to Friday).</p>
                    </div>

                    <div className="group bg-gray-900 p-10 rounded-[3rem] text-white shadow-2xl shadow-indigo-500/10 hover:-translate-y-2 transition-all duration-500">
                        <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center text-indigo-400 mb-8 transform group-hover:scale-110 transition-transform duration-500">
                            <Globe size={32} />
                        </div>
                        <h3 className="text-2xl font-black mb-4">Global Reach</h3>
                        <p className="text-gray-400 leading-relaxed font-medium">We ship to over 50 countries worldwide using premium international couriers like DHL and FedEx.</p>
                    </div>

                    <div className="group bg-white p-10 rounded-[3rem] border border-gray-100 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500">
                        <div className="w-16 h-16 bg-pink-50 rounded-2xl flex items-center justify-center text-pink-600 mb-8 transform group-hover:scale-110 transition-transform duration-500">
                            <ShieldCheck size={32} />
                        </div>
                        <h3 className="text-2xl font-black text-gray-900 mb-4">In Transit Protection</h3>
                        <p className="text-gray-500 leading-relaxed font-medium">Every shipment is fully insured against damage or loss during delivery with premium packaging.</p>
                    </div>
                </div>

                {/* Rates Table */}
                <div className="bg-white rounded-[3rem] border border-gray-100 shadow-sm overflow-hidden mb-24">
                    <div className="p-12 border-b border-gray-50">
                        <h2 className="text-3xl font-black text-gray-900 mb-2">Shipping Rates</h2>
                        <p className="text-gray-500 font-medium">Transparent pricing based on your location and order value.</p>
                    </div>
                    <div className="p-0 sm:p-12">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead className="bg-gray-50/50 rounded-2xl">
                                    <tr>
                                        <th className="px-8 py-5 text-xs font-black text-gray-400 uppercase tracking-widest">Region</th>
                                        <th className="px-8 py-5 text-xs font-black text-gray-400 uppercase tracking-widest">Estimated Time</th>
                                        <th className="px-8 py-5 text-xs font-black text-gray-400 uppercase tracking-widest">Standard Cost</th>
                                        <th className="px-8 py-5 text-xs font-black text-gray-400 uppercase tracking-widest text-right">Free Tracking</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-50">
                                    {[
                                        { region: "Local (Domestic)", time: "2-3 Days", cost: "$5.00", free: "Over $50" },
                                        { region: "Europe (EU)", time: "3-5 Days", cost: "$12.00", free: "Over $150" },
                                        { region: "United States (US)", time: "5-7 Days", cost: "$18.00", free: "Over $200" },
                                        { region: "Rest of the World", time: "7-14 Days", cost: "$25.00", free: "Over $300" }
                                    ].map((row, i) => (
                                        <tr key={i} className="group hover:bg-gray-50/50 transition-colors">
                                            <td className="px-8 py-6 font-bold text-gray-900">{row.region}</td>
                                            <td className="px-8 py-6 text-gray-500 text-sm font-medium">{row.time}</td>
                                            <td className="px-8 py-6 text-gray-900 font-black">{row.cost}</td>
                                            <td className="px-8 py-6 text-indigo-600 font-black text-right">{row.free}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                {/* Footer Info */}
                <div className="text-center max-w-2xl mx-auto py-12 border-t border-gray-100">
                    <p className="text-sm font-medium text-gray-400 mb-2 uppercase tracking-widest">Still have doubts?</p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mt-4">
                        <div className="flex items-center gap-2 text-gray-900 font-black text-sm">
                            <Mail size={18} className="text-indigo-600" />
                            logistics@vader.com
                        </div>
                        <div className="flex items-center gap-2 text-gray-900 font-black text-sm">
                            <Truck size={18} className="text-pink-600" />
                            Track Your Order
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Shipping;
