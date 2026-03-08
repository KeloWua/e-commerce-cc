import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { User, Package, Settings, LogOut, ShieldCheck, Mail, Calendar, ChevronLeft, Bell, Lock, Eye, CreditCard } from 'lucide-react';
import { forgotPassword } from "../../services/auth.service";

const Profile = () => {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();
    const [activeSection, setActiveSection] = useState(null); // 'settings', 'security'
    const [securityStatus, setSecurityStatus] = useState(null);

    // Settings Toggles State
    const [toggles, setToggles] = useState({
        notifications: true,
        newsletter: false,
        marketing: true,
        twoFactor: false
    });

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

    const handleResetPasswordTrigger = async () => {
        setSecurityStatus('loading');
        try {
            await forgotPassword(user.email);
            setSecurityStatus('success');
        } catch (error) {
            setSecurityStatus('error');
        }
    };

    const toggleSwitch = (key) => {
        setToggles(prev => ({ ...prev, [key]: !prev[key] }));
    };

    const Toggle = ({ active, onToggle, label, desc, icon: Icon }) => (
        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl border border-transparent hover:border-indigo-100 transition-all">
            <div className="flex items-center gap-4">
                <div className={`p-2 rounded-xl ${active ? 'bg-indigo-100 text-indigo-600' : 'bg-white text-gray-400'}`}>
                    <Icon size={20} />
                </div>
                <div>
                    <h4 className="font-bold text-gray-900 text-sm">{label}</h4>
                    <p className="text-xs text-gray-500">{desc}</p>
                </div>
            </div>
            <button
                onClick={onToggle}
                className={`w-12 h-6 rounded-full transition-colors relative ${active ? 'bg-indigo-600' : 'bg-gray-200'}`}
            >
                <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${active ? 'left-7' : 'left-1'}`}></div>
            </button>
        </div>
    );

    const mainOptions = [
        { id: 'orders', icon: Package, title: 'My Orders', desc: 'Track, return or buy things again', link: '/orders' },
        { id: 'security', icon: ShieldCheck, title: 'Security', desc: 'Update password & secure account', action: () => setActiveSection('security') },
        { id: 'settings', icon: Settings, title: 'Settings', desc: 'Manage notifications & preferences', action: () => setActiveSection('settings') }
    ];

    return (
        <div className="min-h-screen bg-gray-50/50 py-12">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* User Info Header */}
                <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 mb-8 overflow-hidden relative">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-50 rounded-full blur-3xl -mr-32 -mt-32 opacity-50"></div>
                    <div className="relative flex flex-col md:flex-row items-center gap-8">
                        <div className="w-24 h-24 bg-gradient-to-br from-indigo-500 to-pink-500 rounded-full flex items-center justify-center text-white text-3xl font-black shadow-lg">
                            {user.name?.[0]?.toUpperCase() || <User size={40} />}
                        </div>
                        <div className="flex-1 text-center md:text-left">
                            <h1 className="text-3xl font-black text-gray-900 mb-2">{user.name}</h1>
                            <div className="flex flex-wrap justify-center md:justify-start gap-4 text-sm text-gray-500">
                                <div className="flex items-center gap-1.5"><Mail className="w-4 h-4" />{user.email}</div>
                                <div className="flex items-center gap-1.5"><Calendar className="w-4 h-4" />Member since 2026</div>
                            </div>
                        </div>
                        <button onClick={handleLogout} className="px-6 py-3 bg-red-50 text-red-600 font-bold rounded-2xl hover:bg-red-100 transition-all flex items-center gap-2">
                            <LogOut className="w-4 h-4" />Log Out
                        </button>
                    </div>
                </div>

                {!activeSection ? (
                    <>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {mainOptions.map((option, i) => (
                                option.link ? (
                                    <Link key={i} to={option.link} className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 hover:shadow-md hover:border-indigo-200 transition-all group flex flex-col gap-4">
                                        <div className="w-12 h-12 flex items-center justify-center bg-gray-50 rounded-2xl text-gray-400 group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-colors">
                                            <option.icon className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-gray-900 text-lg mb-1">{option.title}</h3>
                                            <p className="text-gray-500 text-sm leading-relaxed">{option.desc}</p>
                                        </div>
                                    </Link>
                                ) : (
                                    <button key={i} onClick={option.action} className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 hover:shadow-md hover:border-indigo-200 text-left transition-all group flex flex-col gap-4">
                                        <div className="w-12 h-12 flex items-center justify-center bg-gray-50 rounded-2xl text-gray-400 group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-colors">
                                            <option.icon className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-gray-900 text-lg mb-1">{option.title}</h3>
                                            <p className="text-gray-500 text-sm leading-relaxed">{option.desc}</p>
                                        </div>
                                    </button>
                                )
                            ))}
                        </div>
                        {/* Banner */}
                        <div className="mt-8 bg-gray-900 rounded-3xl p-10 text-white relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-1/3 h-full bg-indigo-500/10 skew-x-12 transform translate-x-20"></div>
                            <div className="relative z-10 max-w-lg">
                                <h2 className="text-2xl font-black mb-4">Prime Member?</h2>
                                <p className="text-gray-400 mb-6 font-medium leading-relaxed">Enjoy exclusive discounts, faster shipping times, and early access to deals when you join our premium status.</p>
                                <button className="px-8 py-3 bg-white text-gray-900 font-black rounded-full hover:bg-gray-100 transition-all shadow-xl">Upgrade Now</button>
                            </div>
                        </div>
                    </>
                ) : (
                    <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <button
                            onClick={() => { setActiveSection(null); setSecurityStatus(null); }}
                            className="flex items-center text-sm font-bold text-gray-400 hover:text-indigo-600 mb-8 transition-colors group"
                        >
                            <ChevronLeft size={18} className="mr-1 group-hover:-translate-x-1 transition-transform" />
                            Back to Profile
                        </button>

                        {activeSection === 'settings' && (
                            <div>
                                <h2 className="text-2xl font-black text-gray-900 mb-6">Settings</h2>
                                <div className="space-y-4 max-w-2xl">
                                    <Toggle
                                        active={toggles.notifications}
                                        onToggle={() => toggleSwitch('notifications')}
                                        label="Order Notifications"
                                        desc="Get updates on your order status and shipping"
                                        icon={Bell}
                                    />
                                    <Toggle
                                        active={toggles.newsletter}
                                        onToggle={() => toggleSwitch('newsletter')}
                                        label="Flash Sales"
                                        desc="Be the first to know about exclusive limited deals"
                                        icon={Settings}
                                    />
                                    <Toggle
                                        active={toggles.marketing}
                                        onToggle={() => toggleSwitch('marketing')}
                                        label="Personalized Offers"
                                        desc="Receive content tailored to your shopping habits"
                                        icon={Mail}
                                    />
                                </div>
                            </div>
                        )}

                        {activeSection === 'security' && (
                            <div className="max-w-xl">
                                <h2 className="text-2xl font-black text-gray-900 mb-6">Security</h2>
                                <p className="text-gray-500 mb-8 text-sm">Manage your account security and authentication methods.</p>

                                <div className="space-y-6">
                                    <div className="flex items-center justify-between p-6 bg-gray-50 rounded-2xl">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-indigo-600 shadow-sm border border-gray-100">
                                                <Lock size={24} />
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-gray-900">Change Password</h4>
                                                <p className="text-xs text-gray-500">Receive an email to update your access safely</p>
                                            </div>
                                        </div>
                                        <button
                                            onClick={handleResetPasswordTrigger}
                                            disabled={securityStatus === 'loading'}
                                            className="px-5 py-2.5 bg-gray-900 text-white text-xs font-bold rounded-xl hover:bg-black transition-all disabled:opacity-50"
                                        >
                                            {securityStatus === 'loading' ? 'Sending...' : 'Send Magic Link'}
                                        </button>
                                    </div>

                                    <Toggle
                                        active={toggles.twoFactor}
                                        onToggle={() => toggleSwitch('twoFactor')}
                                        label="Two-Factor Authentication"
                                        desc="Add an extra layer of security to your account"
                                        icon={ShieldCheck}
                                    />

                                    {securityStatus === 'success' && (
                                        <div className="bg-indigo-50 text-indigo-700 p-4 rounded-2xl text-sm font-medium border border-indigo-100 animate-in zoom-in duration-300">
                                            ✨ Action required: We've sent a link to your email to reset your password.
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Profile;
