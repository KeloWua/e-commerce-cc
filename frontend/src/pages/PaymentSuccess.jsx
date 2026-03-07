import { useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate, useParams } from "react-router-dom";
import { OrderContext } from "../context/OrderContext";

const PaymentSucess = () => {
    const { orderId } = useParams();
    const { user, loading } = useContext(AuthContext);
    const { order } = useContext(OrderContext);
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
            <div className="flex items-center mb-12">
                <h1 className="text-4xl font-black text-gray-900">Your order #-{orderId?? ''} has been placed succesfully
                </h1>
            </div>
        </div>
    );
};

export default PaymentSucess;
