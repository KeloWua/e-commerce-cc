import { useContext, useState, useMemo, useRef } from 'react';
import ProductCard from '../../components/products/ProductCard';
import Pagination from '../../components/ui/Pagination';
import { Filter, ChevronDown, Search } from 'lucide-react';
import { ProductsContext } from '../../context/ProductsContext';
import ProductFilters from './ProductFilters';
import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

const Products = () => {
    const { products, filters, setFilters, total, categories } = useContext(ProductsContext);
    const [filterOptions, setFilterOptions] = useState(false);
    const [sortOptions, setSortOptions] = useState(false);
    const filtersRef = useRef(null);

    const handleToggleFilters = () => {
        const newState = !filterOptions;
        setFilterOptions(newState);
        setSortOptions(false);

        // Only scroll on mobile and if opening filters
        if (newState && window.innerWidth < 768) {
            setTimeout(() => {
                const element = filtersRef.current;
                if (element) {
                    const yOffset = -100; // Offset to not cut the top
                    const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
                    window.scrollTo({ top: y, behavior: 'smooth' });
                }
            }, 100);
        }
    };
    const totalPages = useMemo(() => Math.ceil(total / filters.limit) || 1, [total, filters.limit]);

    const [searchParams] = useSearchParams();

    const SORT_OPTIONS = [
        { value: "price_asc", label: "Lower Price" },
        { value: "price_desc", label: "Higher Price" },
        { value: "newest", label: "Newest" },
        { value: "rating_asc", label: "Best Rating" },
        { value: "rating_desc", label: "Lower Rating" },
    ];

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'instant' });
        setFilters(prev => ({
            ...prev,
            search: searchParams.get('search') || '',
            minPrice: searchParams.get('minPrice') || '',
            maxPrice: searchParams.get('maxPrice') || '',
            category: searchParams.get('category') || '',
            sort: searchParams.get('sort') || '',
            page: Number(searchParams.get('page')) || 1,
            limit: Number(searchParams.get('limit')) || 12,
        }));
    }, []);

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [filters.page, filters.category, filters.sort, filters.search]); useEffect(() => {
        if (filters.page > totalPages) {
            setFilters(prev => ({ ...prev, page: totalPages }));
        }
    }, [totalPages]);
    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
                <div>
                    <h1 className="text-4xl font-black text-gray-900">Explore Collection</h1>
                    <p className="text-gray-500 mt-2">
                        {products?.length ? (
                            <>
                                Showing {products.length} item{products.length > 1 ? 's' : ''} in{' '}
                                <span className="font-bold">
                                    {categories?.[filters?.category - 1]?.name || 'all items'}
                                </span>{' '}
                                category
                            </>
                        ) : (
                            'No items found'
                        )}
                    </p>
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
                    <div className='pt-3'>
                        <Pagination
                            totalPages={totalPages || 1}
                            currentPage={filters.page}
                            goToPage={(page) => {
                                setFilters(prev => ({
                                    ...prev,
                                    page
                                }))
                            }}
                        />
                    </div>
                </div>


                <div className="flex items-center gap-4">
                    {/* Filter */}
                    <button
                        onClick={handleToggleFilters}
                        className="flex items-center space-x-2 px-5 py-2.5 bg-white border border-gray-200 rounded-xl text-sm font-bold text-gray-700 hover:bg-gray-50 shadow-sm transition-all focus:ring-2 focus:ring-indigo-500">
                        <Filter className="h-4 w-4" />
                        <span>Filter</span>
                    </button>

                    {/* Sort By */}
                    <div className="relative">
                        <button
                            onClick={() => { setSortOptions(prev => !prev); setFilterOptions(false) }}
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
                                {SORT_OPTIONS.map(({ value, label }) => (
                                    <li
                                        key={value}
                                        onClick={() => {
                                            setFilters(prev => ({ ...prev, sort: value, page: 1 }));
                                            setSortOptions(false);
                                        }}
                                        className="px-4 py-2 text-sm hover:bg-gray-100 cursor-pointer"
                                    >
                                        {label}
                                    </li>
                                ))}
                            </ul>
                        )}

                    </div>

                </div>
            </div>
            {/* Filters */}
            <div ref={filtersRef} className="transition-all duration-300">
                {filterOptions && <ProductFilters />}
            </div>

            <div className="pt-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {products?.map((product, i) => (
                    <ProductCard key={i} {...product} />
                ))}
            </div>
            <div className='pt-3'>
                <Pagination
                    totalPages={totalPages || 1}
                    currentPage={filters.page}
                    goToPage={(page) => {
                        setFilters(prev => ({
                            ...prev,
                            page
                        }))
                    }}
                />
            </div>
        </div>

    );
};

export default Products;
