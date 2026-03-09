import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { AuthProvider } from './context/AuthContext.jsx'
import { OrderProvider } from './context/OrderContext.jsx'
import { ProductsProvider } from './context/ProductsContext.jsx'
import { ThemeProvider } from './context/ThemeContext.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <ThemeProvider>
            <AuthProvider>
                <OrderProvider>
                    <ProductsProvider>
                        <App />
                    </ProductsProvider>
                </OrderProvider>
            </AuthProvider>
        </ThemeProvider>
    </React.StrictMode>,
)
