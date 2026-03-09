import { ShoppingCart, User, LogOut, Menu, Search, X, Sun, Moon } from 'lucide-react';
import { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { OrderContext } from '../../context/OrderContext';
import { useTheme } from '../../context/ThemeContext';

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [userLoggedIn, setUserLoggedIn] = useState(false);

    const { user, logout } = useContext(AuthContext);
    const { theme, toggleTheme } = useTheme();
    const { order } = useContext(OrderContext);
    let cartCount = order?.items?.length

    useEffect(() => {
        if (user) {
            console.log('user contected');
            setUserLoggedIn(true)
        } else {
            setUserLoggedIn(false)
        }
    }, [user]);

    return (
        <nav className="sticky top-0 z-50 glass shadow-sm dark:bg-gray-900/80 dark:border-gray-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <div className="flex-shrink-0 flex items-center">
                        <Link to="/" className="text-2xl font-black bg-gradient-to-r from-indigo-600 to-pink-500 bg-clip-text text-transparent">
                            Vad.er
                        </Link>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex space-x-8 items-center">
                        <Link to="/" className="text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 font-medium transition-colors">Home</Link>
                        <Link to="/products" className="text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 font-medium transition-colors">Products</Link>
                        <Link to="/about-us" className="text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 font-medium transition-colors">About Us</Link>




                        <div className="flex items-center space-x-4 border-l pl-8 border-gray-200">

                            {
                                userLoggedIn ?
                                    <>
                                        <Link to="/profile" className="text-gray-600 hover:text-indigo-600 transition-colors">
                                            <User className="h-5 w-5" />
                                        </Link>
                                        <Link to="/logout"
                                            onClick={() => logout()}
                                            className="text-gray-600 hover:text-indigo-600 transition-colors">
                                            <LogOut className="h-5 w-5" />
                                        </Link>
                                    </> :
                                    <>
                                        <Link to="/login" className="text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                                            <User className="h-5 w-5" />
                                        </Link>
                                    </>}

                            <button
                                onClick={toggleTheme}
                                className="p-2 text-gray-600 hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400 transition-colors"
                            >
                                {theme === 'light' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
                            </button>

                            <Link to="/cart" className="relative group">
                                <ShoppingCart className="h-5 w-5 text-gray-600 group-hover:text-indigo-600 dark:text-gray-400 dark:group-hover:text-indigo-400 transition-colors" />
                                <span className="absolute -top-2 -right-2 bg-pink-500 text-white text-[10px] px-1.5 py-0.5 rounded-full ring-2 ring-white">{cartCount || 0}</span>
                            </Link>
                        </div>
                    </div>

                    {/* Mobile menu button */}
                    <div className="md:hidden flex items-center">
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="text-gray-600 hover:text-indigo-600 focus:outline-none"
                        >
                            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="md:hidden bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800 animate-in slide-in-from-top duration-300">
                    <div className="px-2 pt-2 pb-3 space-y-1">
                        <Link to="/" onClick={() => setIsMenuOpen(false)} className="block px-3 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-md font-medium">Home</Link>
                        <Link to="/products" onClick={() => setIsMenuOpen(false)} className="block px-3 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-md font-medium">Products</Link>
                        <Link to="/about-us" onClick={() => setIsMenuOpen(false)} className="block px-3 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-md font-medium">About Us</Link>
                        <Link to="/orders" onClick={() => setIsMenuOpen(false)} className="block px-3 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-md font-medium">Orders</Link>
                        <Link to="/cart" onClick={() => setIsMenuOpen(false)} className="block px-3 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-md font-medium">Cart</Link>
                        {
                            userLoggedIn ?
                                <>
                                    <Link to="/profile" onClick={() => setIsMenuOpen(false)} className="block px-3 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-md font-medium">Profile</Link>
                                    <Link to="/logout"
                                        onClick={() => {
                                            logout();
                                            setIsMenuOpen(false);
                                        }} className="block px-3 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-md font-medium">Logout</Link>
                                </> :
                                <>
                                    <Link to="/login" onClick={() => setIsMenuOpen(false)} className="block px-3 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-md font-medium">Login</Link>
                                </>}

                        <div className="pt-4 border-t border-gray-100 dark:border-gray-800">
                            <button
                                onClick={() => {
                                    toggleTheme();
                                    setIsMenuOpen(false);
                                }}
                                className="w-full text-left px-3 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-md font-medium flex items-center space-x-2"
                            >
                                {theme === 'light' ? (
                                    <><Moon className="h-5 w-5" /> <span>Dark Mode</span></>
                                ) : (
                                    <><Sun className="h-5 w-5" /> <span>Light Mode</span></>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
