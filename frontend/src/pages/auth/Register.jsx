import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, User, ArrowRight } from 'lucide-react';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { FcGoogle } from "react-icons/fc";

const Register = () => {

    const { register, user } = useContext(AuthContext);

    const navigate = useNavigate();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        if (user) {
            navigate('/');
        }
    }, [user]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await register(name, email, password)
            setName('');
            setEmail('');
            setPassword('');
            navigate('/login');
        } catch (error) {
            setError('Sign up failed')
        }
    };

    return (
        <div className="min-h-[80vh] flex items-center justify-center px-4 bg-gray-50/50 dark:bg-gray-950 transition-colors duration-300">
            <div className="max-w-md w-full glass p-8 rounded-3xl shadow-xl border border-white/40 dark:border-indigo-500/20">
                <div className="text-center mb-10">
                    <h2 className="text-3xl font-black text-gray-900 dark:text-white">Create Account</h2>
                    <p className="text-gray-500 dark:text-gray-400 mt-2 text-sm">Join our platform and start your shopping journey</p>
                    {error && <p className="text-red-500 mt-2">{error}</p>}
                </div>

                <form className="space-y-5" onSubmit={handleSubmit}>
                    <div className="relative group">
                        <User className="absolute left-4 top-3.5 h-5 w-5 text-gray-400 group-focus-within:text-indigo-600 transition-colors" />
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Full Name"
                            className="w-full pl-12 pr-4 py-3.5 bg-white/50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:bg-white dark:focus:bg-gray-800 outline-none transition-all text-sm dark:text-white dark:placeholder-gray-500"
                        />
                    </div>

                    <div className="relative group">
                        <Mail className="absolute left-4 top-3.5 h-5 w-5 text-gray-400 group-focus-within:text-indigo-600 transition-colors" />
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Email Address"
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
                            className="w-full pl-12 pr-4 py-3.5 bg-white/50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:bg-white dark:focus:bg-gray-800 outline-none transition-all text-sm dark:text-white dark:placeholder-gray-500"
                        />
                    </div>

                    <p className="text-[10px] text-gray-400 dark:text-gray-500 text-center px-4">
                        By creating an account, you agree to our <a href="#" className="underline">Terms of Service</a> and <a href="#" className="underline">Privacy Policy</a>.
                    </p>

                    <button className="w-full py-4 bg-gray-900 dark:bg-indigo-600 text-white font-bold rounded-xl hover:bg-black dark:hover:bg-indigo-700 transition-all flex items-center justify-center group shadow-lg">
                        Get Started
                        <ArrowRight className="ml-2 h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
                    </button>
                </form>
                <div className="flex flex-col items-center mt-6 bg-gray-100 dark:bg-gray-800/50 p-8 rounded-lg">
                    <p className="mb-4 text-gray-500 dark:text-gray-400 font-bold text-lg drop-shadow-md">
                        Or sign up using:
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
                        Already have an account? {' '}
                        <Link to="/login" className="text-indigo-600 dark:text-indigo-400 font-bold hover:text-indigo-800 dark:hover:text-indigo-300 transition-colors underline decoration-2 underline-offset-4">
                            Sign in Instead
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Register;
