import { ArrowRight, Star, Truck, ShieldCheck, RefreshCw } from 'lucide-react';
import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ProductsContext } from '../../context/ProductsContext';


const Home = () => {

    {/* Categories Provider */ }
    const { categories } = useContext(ProductsContext);
    const navigate = useNavigate();

    const toTitleCase = (str) => str.replace(/\w\S*/g, w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase());

    const FALLBACK_CATEGORIES = [
        { name: 'Newest', params: '?sort=newest' },
        { name: 'Lower Price', params: '?sort=price_asc' },
        { name: 'Best Sellers', params: '?sort=rating_desc' },
    ];
    const displayCategories = categories && categories.length > 0
        ? [...categories]
            .sort(() => Math.random() - 0.5)
            .slice(0, 3)
            .map(cat => ({
                name: toTitleCase(cat.name),
                params: `?category=${cat.id}`
            }))
        : FALLBACK_CATEGORIES;

    {/* Home Icons */ }
    const HOME_ICONS = [
        {
            icon: Truck, title: 'Free Shipping', desc: 'On orders over $50',
            promo: { newDesc: 'On orders over $0', label: 'Just this month!' }
        },
        { icon: RefreshCw, title: 'Easy Returns', desc: '30-day window' },
        { icon: ShieldCheck, title: 'Secure Pay', desc: '100% encryption' },
        { icon: Star, title: 'Top Rated', desc: '4.9/5 satisfaction' }];

    return (
        <div className="space-y-20 pb-20">
            {/* Hero Section */}
            <section className="relative min-h-[80vh] py-28 md:py-32 flex items-center overflow-hidden bg-gray-50 dark:bg-gray-900/50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="max-w-2xl">
                        <span className="inline-block px-3 py-1 bg-indigo-100 text-indigo-700 text-[10px] sm:text-xs font-bold rounded-full mb-4 sm:mb-6 tracking-wider uppercase">
                            Everything You Need
                        </span>
                        <h1 className="text-4xl sm:text-6xl md:text-7xl font-black text-gray-900 dark:text-white leading-[1.1] mb-4 sm:mb-6">
                            Your One-Stop Shop for <span className="bg-gradient-to-r from-indigo-600 to-pink-500 bg-clip-text text-transparent">Everything</span> You Love.
                        </h1>
                        <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400 mb-8 sm:mb-10 max-w-lg">
                            From the latest tech to home essentials and trending fashion—discover millions of products at unbeatable prices with lightning-fast delivery.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <Link to="/products" className="px-8 py-4 bg-gray-900 text-white font-bold rounded-full hover:bg-black transition-all flex items-center justify-center group text-sm sm:text-base dark:bg-indigo-600">
                                Start Shopping
                                <ArrowRight className="ml-2 h-5 w-5 transform group-hover:translate-x-1 transition-transform" />
                            </Link>
                            <Link to="/about-us" className="px-8 py-4 border-2 border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white font-bold rounded-full hover:bg-gray-50 dark:hover:bg-gray-600 transition-all text-sm sm:text-base flex items-center justify-center dark:bg-indigo-400">
                                Contact Us
                            </Link>
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
                    {displayCategories.map((cat, i) => (
                        <div
                            key={i}
                            onClick={() => navigate(`/products${cat.params}`)}
                            className="group relative h-48 md:h-56 bg-gray-200 dark:bg-gray-800 rounded-3xl overflow-hidden shadow-lg hover-scale cursor-pointer"
                        >
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent flex flex-col justify-end p-8">
                                <h3 className="text-white text-3xl font-black mb-2">{cat.name}</h3>
                                <p className="text-gray-200 text-sm mb-4 opacity-0 group-hover:opacity-100 transition-opacity">Explore Category</p>
                                <div className="h-1 w-0 group-hover:w-full bg-pink-500 transition-all duration-500"></div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Trust Badges */}
            <section className="bg-white dark:bg-gray-900 py-16 border-y border-gray-100 dark:border-gray-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {HOME_ICONS.map((item, i) => (
                            <div key={i} className="flex flex-col items-center text-center space-y-3">
                                <div className="p-4 bg-indigo-50 dark:bg-indigo-900/30 rounded-2xl text-indigo-600 dark:text-indigo-400">
                                    <item.icon className="h-6 w-6" />
                                </div>
                                <h4 className="font-bold text-gray-900 dark:text-white">{item.title}</h4>

                                <div className="space-y-0.5">
                                    <p className={`text-xs ${item.promo ? 'text-gray-300 dark:text-gray-600 line-through' : 'text-gray-500 dark:text-gray-400'}`}>
                                        {item.desc}
                                    </p>
                                    {item.promo && (
                                        <>
                                            <p className="text-xs font-semibold text-indigo-600 dark:text-indigo-400">{item.promo.newDesc}</p>
                                            <p className="text-xs text-gray-400 dark:text-gray-500 italic">{item.promo.label}</p>
                                        </>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
