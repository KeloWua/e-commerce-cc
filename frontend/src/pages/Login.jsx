import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, ArrowRight } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';
import { useEffect } from 'react';
import { FcGoogle } from "react-icons/fc";

const Login = () => {
  const { login, user } = useContext(AuthContext);

  const navigate = useNavigate();

  const [email, setEmail] = useState('test23@test.com');
  const [password, setPassword] = useState('123456');
  const [error, setError] = useState('');


  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      setEmail('');
      setPassword('');
      navigate('/');
    } catch (err) {
      setError('Login failed');
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 bg-gray-50/50">
      <div className="max-w-md w-full glass p-8 rounded-3xl shadow-xl border border-white/40">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-black text-gray-900">Welcome Back</h2>
          <p className="text-gray-500 mt-2 text-sm">Sign in to continue your shopping journey</p>
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
              className="w-full pl-12 pr-4 py-3.5 bg-white/50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:bg-white outline-none transition-all text-sm"
            />
          </div>

          <div className="relative group">
            <Lock className="absolute left-4 top-3.5 h-5 w-5 text-gray-400 group-focus-within:text-indigo-600 transition-colors" />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full pl-12 pr-4 py-3.5 bg-white/50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:bg-white outline-none transition-all text-sm"
            />
          </div>

          <div className="flex items-center justify-between text-xs">
            <label className="flex items-center space-x-2 cursor-pointer group">
              <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
              <span className="text-gray-600 group-hover:text-gray-900 transition-colors">Remember me</span>
            </label>
            <a href="#" className="text-indigo-600 font-bold hover:text-indigo-800 transition-colors">Forgot password?</a>
          </div>

          <button className="w-full py-4 bg-gray-900 text-white font-bold rounded-xl hover:bg-black transition-all flex items-center justify-center group shadow-lg">
            Sign In
            <ArrowRight className="ml-2 h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
          </button>
        </form>

        <div className="flex flex-col items-center mt-6 bg-gray-100 p-8 rounded-lg">
          <p className="mb-4 text-gray-500 font-bold text-lg drop-shadow-md">
            Or sign in using:
          </p>
          <a href="http://localhost:3000/auth/google">
            <button className="flex items-center justify-center w-52 py-3 bg-gray-600 text-white font-bold rounded-xl shadow-xl hover:shadow-2xl">
              <FcGoogle className="h-6 w-6 mr-2 drop-shadow-lg" />
              Google
            </button>
          </a>
        </div>

        <div className="mt-8 text-center">
          <p className="text-gray-500 text-sm">
            Don't have an account? {' '}
            <Link to="/register" className="text-indigo-600 font-bold hover:text-indigo-800 transition-colors underline decoration-2 underline-offset-4">
              Create an account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;