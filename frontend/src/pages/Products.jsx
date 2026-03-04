import { useContext, useEffect, useState } from 'react';
import ProductCard from '../components/ProductCard';
import { Filter, ChevronDown, Search } from 'lucide-react';
import { ProductsContext } from '../context/ProductsContext';
import ProductFilters from './ProductFilters';


const Products = () => {

    const { products, filters, setFilters } = useContext(ProductsContext);
    const [filterOptions, setFilterOptions] = useState(false);
    const [sortOptions, setSortOptions] = useState(false);


    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
                <div>
                    <h1 className="text-4xl font-black text-gray-900">Explore Collection</h1>
                    {products?.length ?
                        <p className="text-gray-500 mt-2">Showing all {products?.length} items in the curated selection</p>
                        : <p className="text-gray-500 mt-2">No items found</p>
                    }
                    {/* Search Bar */}
                    <div className='pt-4'>
                        <div className="relative group">
                            <input
                                type="text"
                                placeholder="Search..."
                                value={filters.search}
                                onChange={(e) =>
                                    setFilters(prev => ({
                                        ...prev,
                                        search: e.target.value,
                                        page: 1
                                    }))
                                }
                                className="pl-10 pr-4 py-2 bg-gray-100 border-none rounded-full text-sm focus:ring-2 focus:ring-indigo-500 w-48 transition-all group-focus-within:w-64"
                            />
                            <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    {/* Filter */}
                    <button
                        onClick={() => {setFilterOptions(prev => !prev); setSortOptions(false)}}
                        className="flex items-center space-x-2 px-5 py-2.5 bg-white border border-gray-200 rounded-xl text-sm font-bold text-gray-700 hover:bg-gray-50 shadow-sm transition-all focus:ring-2 focus:ring-indigo-500">
                        <Filter className="h-4 w-4" />
                        <span>Filter</span>
                    </button>

                    {/* Sort By */}
                    <div className="relative">
                        <button
                            onClick={() => {setSortOptions(prev => !prev); setFilterOptions(false)}}
                            className="flex items-center gap-2 px-5 py-2.5 bg-white border border-gray-200 rounded-xl text-sm font-bold text-gray-700 hover:bg-gray-50 shadow-sm transition-all focus:ring-2 focus:ring-indigo-500"
                        >
                            <span>Sort By</span>
                            <ChevronDown
                                className={`h-4 w-4 transition-transform ${sortOptions ? "rotate-180" : ""
                                    }`}
                            />
                        </button>

                        {sortOptions && (
                            <ul className="absolute left-0 mt-2 w-30 bg-white border border-gray-200 rounded-xl shadow-lg py-2 z-50">
                                <li
                                    onClick={() => {
                                        setFilters(prev => ({ ...prev, sort: "price_asc", page: 1 }));
                                        setSortOptions(false);
                                    }}
                                    className="px-4 py-2 text-sm hover:bg-gray-100 cursor-pointer"
                                >
                                    Lower Price
                                </li>

                                <li
                                    onClick={() => {
                                        setFilters(prev => ({ ...prev, sort: "price_desc", page: 1 }));
                                        setSortOptions(false);
                                    }}
                                    className="px-4 py-2 text-sm hover:bg-gray-100 cursor-pointer"
                                >
                                    Higher Price
                                </li>

                                <li
                                    onClick={() => {
                                        setFilters(prev => ({ ...prev, sort: "newest", page: 1 }));
                                        setSortOptions(false);
                                    }}
                                    className="px-4 py-2 text-sm hover:bg-gray-100 cursor-pointer"
                                >
                                    Newest
                                </li>
                            </ul>
                        )}
                    </div>

                </div>
            </div>
            {/* Filters */}
            {filterOptions && <ProductFilters />}

            <div className="pt-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {products?.map((product, i) => (
                    <ProductCard key={i} {...product} />
                ))}
            </div>
        </div>
    );
};

export default Products;
