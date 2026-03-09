import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, ArrowRight, ChevronLeft } from 'lucide-react';
import { AuthContext } from '../../context/AuthContext';
import { useEffect } from 'react';
import { FcGoogle } from "react-icons/fc";
import { forgotPassword } from '../../services/auth.service';

const Login = () => {
    const { login, user } = useContext(AuthContext);
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isForgotPass, setIsForgotPass] = useState(false);
    const [forgotStatus, setForgotStatus] = useState(null); // 'loading', 'success', 'error'

    useEffect(() => {
        if (user) {
            navigate('/');
        }
    }, [user, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            await login(email, password);
            setEmail('');
            setPassword('');
            navigate('/');
        } catch (err) {
            setError('Login failed. Please check your credentials.');
        }
    };

    const handleForgotSubmit = async (e) => {
        e.preventDefault();
        setForgotStatus('loading');
        try {
            await forgotPassword(email);
            setForgotStatus('success');
        } catch (err) {
            setForgotStatus('error');
        }
    };

    if (isForgotPass) {
        return (
            <div className="min-h-[80vh] flex items-center justify-center px-4 bg-gray-50/50 dark:bg-gray-950 transition-colors duration-300">
                <div className="max-w-md w-full glass p-8 rounded-3xl shadow-xl border border-white/40 dark:border-indigo-500/20">
                    <button
                        onClick={() => { setIsForgotPass(false); setForgotStatus(null); }}
                        className="flex items-center text-sm text-gray-500 hover:text-indigo-600 mb-6 transition-colors"
                    >
                        <ChevronLeft size={16} className="mr-1" />
                        Back to Login
                    </button>

                    <div className="text-center mb-8">
                        <h2 className="text-3xl font-black text-gray-900 dark:text-white">Reset Password</h2>
                        <p className="text-gray-500 dark:text-gray-400 mt-2 text-sm">Enter your email and we'll send you a link to reset your password.</p>
                    </div>

                    {forgotStatus === 'success' ? (
                        <div className="bg-green-50 text-green-700 p-4 rounded-2xl text-center border border-green-100">
                            <p className="font-bold mb-1">Check your inbox! 📧</p>
                            <p className="text-xs">We've sent a password reset link to <span className="font-semibold">{email}</span></p>
                        </div>
                    ) : (
                        <form className="space-y-6" onSubmit={handleForgotSubmit}>
                            <div className="relative group">
                                <Mail className="absolute left-4 top-3.5 h-5 w-5 text-gray-400 group-focus-within:text-indigo-600 transition-colors" />
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Email Address"
                                    required
                                    className="w-full pl-12 pr-4 py-3.5 bg-white/50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:bg-white dark:focus:bg-gray-800 outline-none transition-all text-sm dark:text-white dark:placeholder-gray-500"
                                />
                            </div>

                            {forgotStatus === 'error' && (
                                <p className="text-red-500 text-xs text-center font-medium">Something went wrong. Please try again.</p>
                            )}

                            <button
                                disabled={forgotStatus === 'loading'}
                                className="w-full py-4 bg-gray-900 text-white font-bold rounded-xl hover:bg-black transition-all flex items-center justify-center group shadow-lg disabled:opacity-50"
                            >
                                {forgotStatus === 'loading' ? 'Sending...' : 'Send Reset Link'}
                                <ArrowRight className="ml-2 h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
                            </button>
                        </form>
                    )}
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-[80vh] flex items-center justify-center px-4 bg-gray-50/50 dark:bg-gray-950 transition-colors duration-300">
            <div className="max-w-md w-full glass p-8 rounded-3xl shadow-xl border border-white/40 dark:border-indigo-500/20">
                <div className="text-center mb-10">
                    <h2 className="text-3xl font-black text-gray-900 dark:text-white">Welcome Back</h2>
                    <p className="text-gray-500 dark:text-gray-400 mt-2 text-sm">Sign in to continue your shopping journey</p>
                    {error && <p className="text-red-500 mt-2">{error}</p>}
                </div>

                <form className="space-y-6" onSubmit={handleSubmit}>
                    <div className="relative group">
                        <Mail className="absolute left-4 top-3.5 h-5 w-5 text-gray-400 group-focus-within:text-indigo-600 transition-colors" />
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Email Address"
                            required
                            className="w-full pl-12 pr-4 py-3.5 bg-white/50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:bg-white dark:focus:bg-gray-800 outline-none transition-all text-sm dark:text-white dark:placeholder-gray-500"
                        />
                    </div>

                    <div className="relative group">
                        <Lock className="absolute left-4 top-3.5 h-5 w-5 text-gray-400 group-focus-within:text-indigo-600 transition-colors" />
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Password"
                            required
                            className="w-full pl-12 pr-4 py-3.5 bg-white/50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:bg-white dark:focus:bg-gray-800 outline-none transition-all text-sm dark:text-white dark:placeholder-gray-500"
                        />
                    </div>

                    <div className="flex items-center justify-between text-xs">
                        <label className="flex items-center space-x-2 cursor-pointer group">
                            <input type="checkbox" className="w-4 h-4 rounded border-gray-300 dark:border-gray-700 dark:bg-gray-800 text-indigo-600 focus:ring-indigo-500" />
                            <span className="text-gray-600 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white transition-colors">Remember me</span>
                        </label>
                        <button
                            type="button"
                            onClick={() => setIsForgotPass(true)}
                            className="text-indigo-600 dark:text-indigo-400 font-bold hover:text-indigo-800 dark:hover:text-indigo-300 transition-colors"
                        >
                            Forgot password?
                        </button>
                    </div>

                    <button className="w-full py-4 bg-gray-900 dark:bg-indigo-600 text-white font-bold rounded-xl hover:bg-black dark:hover:bg-indigo-700 transition-all flex items-center justify-center group shadow-lg">
                        Sign In
                        <ArrowRight className="ml-2 h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
                    </button>
                </form>

                <div className="flex flex-col items-center mt-6 bg-gray-100 dark:bg-gray-800/50 p-8 rounded-lg">
                    <p className="mb-4 text-gray-500 dark:text-gray-400 font-bold text-lg drop-shadow-md">
                        Or sign in using:
                    </p>
                    <a href={`${import.meta.env.VITE_API_URL || 'http://localhost:3000'}/auth/google`}>
                        <button className="flex items-center justify-center w-52 py-3 bg-gray-600 dark:bg-gray-700 text-white font-bold rounded-xl shadow-xl hover:shadow-2xl">
                            <FcGoogle className="h-6 w-6 mr-2 drop-shadow-lg" />
                            Google
                        </button>
                    </a>
                </div>

                <div className="mt-8 text-center">
                    <p className="text-gray-500 dark:text-gray-400 text-sm">
                        Don't have an account? {' '}
                        <Link to="/register" className="text-indigo-600 dark:text-indigo-400 font-bold hover:text-indigo-800 dark:hover:text-indigo-300 transition-colors underline decoration-2 underline-offset-4">
                            Create an account
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;
