import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Lock, ArrowRight, CheckCircle, AlertCircle } from 'lucide-react';
import { resetPassword } from '../../services/auth.service';

const ResetPassword = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const token = searchParams.get('token');

    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [status, setStatus] = useState(null); // 'loading', 'success', 'error'
    const [errorMsg, setErrorMsg] = useState('');

    useEffect(() => {
        if (!token) {
            navigate('/login');
        }
    }, [token, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setStatus('error');
            setErrorMsg('Passwords do not match');
            return;
        }

        setStatus('loading');
        try {
            await resetPassword(token, password);
            setStatus('success');
            setTimeout(() => navigate('/login'), 3000);
        } catch (err) {
            setStatus('error');
            setErrorMsg(err.response?.data?.message || 'Failed to reset password. Link might be expired.');
        }
    };

    return (
        <div className="min-h-[80vh] flex items-center justify-center px-4 bg-gray-50/50">
            <div className="max-w-md w-full glass p-8 rounded-3xl shadow-xl border border-white/40">
                <div className="text-center mb-10">
                    <h2 className="text-3xl font-black text-gray-900">Set New Password</h2>
                    <p className="text-gray-500 mt-2 text-sm">Choose a strong password to protect your account.</p>
                </div>

                {status === 'success' ? (
                    <div className="text-center py-8 animate-in zoom-in duration-500">
                        <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                            <CheckCircle size={32} />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">Password Updated!</h3>
                        <p className="text-gray-500 text-sm">You will be redirected to the login page shortly.</p>
                    </div>
                ) : (
                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <div className="relative group">
                            <Lock className="absolute left-4 top-3.5 h-5 w-5 text-gray-400 group-focus-within:text-indigo-600 transition-colors" />
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="New Password"
                                required
                                minLength={6}
                                className="w-full pl-12 pr-4 py-3.5 bg-white/50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:bg-white outline-none transition-all text-sm"
                            />
                        </div>

                        <div className="relative group">
                            <Lock className="absolute left-4 top-3.5 h-5 w-5 text-gray-400 group-focus-within:text-indigo-600 transition-colors" />
                            <input
                                type="password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                placeholder="Confirm New Password"
                                required
                                minLength={6}
                                className="w-full pl-12 pr-4 py-3.5 bg-white/50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:bg-white outline-none transition-all text-sm"
                            />
                        </div>

                        {status === 'error' && (
                            <div className="flex items-center gap-2 text-red-500 text-xs font-medium bg-red-50 p-3 rounded-xl border border-red-100">
                                <AlertCircle size={14} />
                                {errorMsg}
                            </div>
                        )}

                        <button
                            disabled={status === 'loading'}
                            className="w-full py-4 bg-gray-900 text-white font-bold rounded-xl hover:bg-black transition-all flex items-center justify-center group shadow-lg disabled:opacity-50"
                        >
                            {status === 'loading' ? 'Updating...' : 'Update Password'}
                            <ArrowRight className="ml-2 h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
};

export default ResetPassword;
