import { useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { User, Package, MapPin, Settings, LogOut, ShieldCheck, Mail, Calendar } from 'lucide-react';

const Profile = () => {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) {
            navigate('/login');
        }
    }, [user, navigate]);

    if (!user) return null;

    const handleLogout = async () => {
        await logout();
        navigate('/');
    };

    const profileOptions = [
        { icon: Package, title: 'My Orders', desc: 'Track, return or buy things again', link: '/orders' },
        { icon: MapPin, title: 'Addresses', desc: 'Edit or add new delivery addresses', link: '#' },
        { icon: ShieldCheck, title: 'Security', desc: 'Update password & secure account', link: '#' },
        { icon: Settings, title: 'Settings', desc: 'Manage notifications & preferences', link: '#' }
    ];

    return (
        <div className="min-h-screen bg-gray-50/50 py-12">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header / User Info */}
                <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 mb-8 overflow-hidden relative">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-50 rounded-full blur-3xl -mr-32 -mt-32 opacity-50"></div>

                    <div className="relative flex flex-col md:flex-row items-center gap-8">
                        <div className="w-24 h-24 bg-gradient-to-br from-indigo-500 to-pink-500 rounded-full flex items-center justify-center text-white text-3xl font-black shadow-lg">
                            {user.name?.[0]?.toUpperCase() || <User size={40} />}
                        </div>

                        <div className="flex-1 text-center md:text-left">
                            <h1 className="text-3xl font-black text-gray-900 mb-2">{user.name}</h1>
                            <div className="flex flex-wrap justify-center md:justify-start gap-4 text-sm text-gray-500">
                                <div className="flex items-center gap-1.5">
                                    <Mail className="w-4 h-4" />
                                    {user.email}
                                </div>
                                <div className="flex items-center gap-1.5">
                                    <Calendar className="w-4 h-4" />
                                    Member since 2026
                                </div>
                            </div>
                        </div>

                        <button
                            onClick={handleLogout}
                            className="px-6 py-3 bg-red-50 text-red-600 font-bold rounded-2xl hover:bg-red-100 transition-all flex items-center gap-2"
                        >
                            <LogOut className="w-4 h-4" />
                            Log Out
                        </button>
                    </div>
                </div>

                {/* Account Sections Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {profileOptions.map((option, idx) => (
                        <Link
                            key={idx}
                            to={option.link}
                            className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 hover:shadow-md hover:border-indigo-200 transition-all group flex items-start gap-5"
                        >
                            <div className="p-4 bg-gray-50 rounded-2xl text-gray-400 group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-colors">
                                <option.icon className="w-6 h-6" />
                            </div>
                            <div className="flex-1">
                                <h3 className="font-bold text-gray-900 text-lg mb-1">{option.title}</h3>
                                <p className="text-gray-500 text-sm">{option.desc}</p>
                            </div>
                        </Link>
                    ))}
                </div>

                {/* Additional Placeholder / Info Area */}
                <div className="mt-8 bg-gray-900 rounded-3xl p-10 text-white relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-1/3 h-full bg-indigo-500/10 skew-x-12 transform translate-x-20"></div>
                    <div className="relative z-10 max-w-lg">
                        <h2 className="text-2xl font-black mb-4">Prime Member?</h2>
                        <p className="text-gray-400 mb-6 font-medium">Enjoy exclusive discounts, faster shipping times, and early access to deals when you join our premium status.</p>
                        <button className="px-8 py-3 bg-white text-gray-900 font-black rounded-full hover:bg-gray-100 transition-all">
                            Upgrade Now
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
