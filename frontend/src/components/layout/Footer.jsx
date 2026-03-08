import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-gray-300">
            <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div className="col-span-1 md:col-span-2">
                        <span className="text-2xl font-black bg-gradient-to-r from-indigo-400 to-pink-400 bg-clip-text text-transparent">
                            Vad.er
                        </span>
                        <p className="mt-4 text-sm max-w-xs">
                            Your one-stop destination for everything you need. From the latest electronics to home essentials, we've got you covered with premium service and fast delivery.
                        </p>
                    </div>
                    <div>
                        <h3 className="text-white font-bold mb-4">Shop</h3>
                        <ul className="space-y-2 text-sm">
                            <li><Link to="/products" className="hover:text-indigo-400">All Products</Link></li>
                            <li><Link to="/products?sort=rating_desc" className="hover:text-indigo-400">Featured</Link></li>
                            <li><Link to="/products?sort=newest" className="hover:text-indigo-400">New Arrivals</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-white font-bold mb-4">Support</h3>
                        <ul className="space-y-2 text-sm">
                            <li><Link to="/about-us" className="hover:text-indigo-400">About Us</Link></li>
                            <li><Link to="/faq" className="hover:text-indigo-400">FAQ</Link></li>
                            <li><Link to="/shipping" className="hover:text-indigo-400">Shipping</Link></li>
                            <li><Link to="/returns" className="hover:text-indigo-400">Returns</Link></li>
                        </ul>
                    </div>
                </div>
                <div className="mt-12 pt-8 border-t border-gray-800 text-center text-xs">
                    © 2026 Vad.er E-Commerce. All rights reserved. Built with ❤️ for the future of retail.
                </div>
            </div>
        </footer>
    );
};

export default Footer;
