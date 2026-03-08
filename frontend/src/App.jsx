import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Home from './pages/info/Home';
import Products from './pages/products/Products';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Cart from './pages/orders/Cart';
import Orders from './pages/orders/Orders';
import OrderDetail from './pages/orders/OrderDetail';
import Profile from './pages/user/Profile';
import PaymentCancel from './pages/orders/PaymentCancel';
import PaymentSuccess from './pages/orders/PaymentSuccess';
import ProductDetailPage from './pages/products/ProductDetailPage';
import AboutUs from './pages/info/AboutUs';
import ResetPassword from './pages/auth/ResetPassword';

function App() {
    return (
        <BrowserRouter>
            <Layout>
                <Routes>
                    <Route path="/" element={<Home />} />

                    <Route path="/products" element={<Products />} />
                    <Route path="/products/:productId" element={<ProductDetailPage />} />
                    <Route path="/about-us" element={<AboutUs />} />

                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/logout" element={<Login />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/reset-password" element={<ResetPassword />} />

                    <Route path="/cart" element={<Cart />} />


                    <Route path="/cancel" element={<PaymentCancel />} />
                    <Route path="/success/:orderId" element={<PaymentSuccess />} />

                    <Route path="/orders" element={<Orders />} />
                    <Route path="/orders/:orderId" element={<OrderDetail />} />
                </Routes>
            </Layout>
        </BrowserRouter>
    );
}

export default App;
