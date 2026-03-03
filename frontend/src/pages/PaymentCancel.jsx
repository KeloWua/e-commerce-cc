import { useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const PaymentCancel = () => {
    const { user, loading } = useContext(AuthContext)
    const navigate = useNavigate();

    useEffect(() => {
        if (!loading && !user) {
            navigate('/');
        }
    }, [user, loading]);

    if (loading) {
        return <div className="p-10 text-center">Loading...</div>;
    }

    return (
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="flex items-center justify-between mb-12">
                <h1 className="text-4xl font-black text-gray-900">Your purchase has been canceled</h1>
            </div>
        </div>
    );
};

export default PaymentCancel;
