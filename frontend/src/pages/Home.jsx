import { ArrowRight, Star, Truck, ShieldCheck, RefreshCw } from 'lucide-react';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div className="space-y-20 pb-20">
            {/* Hero Section */}
            <section className="relative h-[80vh] flex items-center overflow-hidden bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="max-w-2xl">
                        <span className="inline-block px-3 py-1 bg-indigo-100 text-indigo-700 text-xs font-bold rounded-full mb-6 tracking-wider uppercase">
                            New Season 2026
                        </span>
                        <h1 className="text-6xl md:text-7xl font-black text-gray-900 leading-tight mb-6">
                            Style That <span className="bg-gradient-to-r from-indigo-600 to-pink-500 bg-clip-text text-transparent">Empowers</span> Your Presence.
                        </h1>
                        <p className="text-lg text-gray-600 mb-10 max-w-lg">
                            Explore our curated collection of contemporary fashion pieces designed for those who lead with confidence and elegance.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <Link to="/products" className="px-8 py-4 bg-gray-900 text-white font-bold rounded-full hover:bg-black transition-all flex items-center justify-center group">
                                Shop Collection
                                <ArrowRight className="ml-2 h-5 w-5 transform group-hover:translate-x-1 transition-transform" />
                            </Link>
                            <button className="px-8 py-4 border-2 border-gray-200 text-gray-900 font-bold rounded-full hover:bg-gray-50 transition-all">
                                Learn More
                            </button>
                        </div>
                    </div>
                </div>
                {/* Abstract Background Elements */}
                <div className="absolute right-0 top-0 w-1/2 h-full bg-gradient-to-l from-indigo-50 to-transparent hidden lg:block">
                    <div className="absolute right-10 top-1/2 -translate-y-1/2 w-96 h-96 bg-pink-200/30 rounded-full blur-[100px] animate-pulse"></div>
                    <div className="absolute right-40 top-1/2 -translate-y-1/3 w-80 h-80 bg-indigo-200/30 rounded-full blur-[80px]"></div>
                </div>
            </section>

            {/* Featured Categories */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {['Elegance', 'Minimal', 'Street'].map((cat, i) => (
                        <div key={i} className="group relative h-96 bg-gray-200 rounded-3xl overflow-hidden shadow-lg hover-scale cursor-pointer">
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-8">
                                <h3 className="text-white text-3xl font-black mb-2">{cat}</h3>
                                <p className="text-gray-200 text-sm mb-4 opacity-0 group-hover:opacity-100 transition-opacity">Discover the curation</p>
                                <div className="h-1 w-0 group-hover:w-full bg-pink-500 transition-all duration-500"></div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Trust Badges */}
            <section className="bg-white py-16 border-y border-gray-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {[
                            { icon: Truck, title: 'Free Shipping', desc: 'On orders over $150' },
                            { icon: RefreshCw, title: 'Easy Returns', desc: '30-day window' },
                            { icon: ShieldCheck, title: 'Secure Pay', desc: '100% encryption' },
                            { icon: Star, title: 'Top Rated', desc: '4.9/5 satisfaction' }
                        ].map((item, i) => (
                            <div key={i} className="flex flex-col items-center text-center space-y-3">
                                <div className="p-4 bg-indigo-50 rounded-2xl text-indigo-600">
                                    <item.icon className="h-6 w-6" />
                                </div>
                                <h4 className="font-bold text-gray-900">{item.title}</h4>
                                <p className="text-xs text-gray-500">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
