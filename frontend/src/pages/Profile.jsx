import { useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Profile = () => {
    const { user } = useContext(AuthContext)
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) {
            navigate('/')
        }
    }, [user])
    return (
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="flex items-center justify-between mb-12">
                <h1 className="text-4xl font-black text-gray-900">Your Profile</h1>
                <div className="flex items-center space-x-2 text-sm text-gray-500">
                </div>
            </div>

        </div>
    );
};

export default Profile;
