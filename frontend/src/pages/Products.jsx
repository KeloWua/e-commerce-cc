import { useContext, useEffect, useState } from 'react';
import ProductCard from '../components/ProductCard';
import { Filter, ChevronDown } from 'lucide-react';
import { ProductsContext } from '../context/ProductsProvider';


const Products = () => {
    
    const { products } = useContext(ProductsContext);

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
                <div>
                    <h1 className="text-4xl font-black text-gray-900">Explore Collection</h1>
                    {products?.length?
                    <p className="text-gray-500 mt-2">Showing all {products?.length} items in the curated selection</p>
                    : <p className="text-gray-500 mt-2">No items found</p>
                }
                </div>

                <div className="flex items-center gap-4">
                    <button className="flex items-center space-x-2 px-5 py-2.5 bg-white border border-gray-200 rounded-xl text-sm font-bold text-gray-700 hover:bg-gray-50 shadow-sm transition-all focus:ring-2 focus:ring-indigo-500">
                        <Filter className="h-4 w-4" />
                        <span>Filter</span>
                    </button>
                    <button className="flex items-center space-x-2 px-5 py-2.5 bg-white border border-gray-200 rounded-xl text-sm font-bold text-gray-700 hover:bg-gray-50 shadow-sm transition-all focus:ring-2 focus:ring-indigo-500">
                        <span>Sort By</span>
                        <ChevronDown className="h-4 w-4" />
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {products?.map((product, i) => (
                    <ProductCard key={i} {...product} />
                ))}
                {/* Repeating for visual richness */}
                {products?.map((product, i) => (
                    <ProductCard key={`dup-${i}`} {...product} />
                ))}
            </div>
        </div>
    );
};

export default Products;
