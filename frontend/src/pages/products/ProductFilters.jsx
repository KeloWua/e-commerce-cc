import { useContext } from "react";
import { ProductsContext } from "../../context/ProductsContext";

const ProductFilters = () => {
    const { filters, setFilters, categories, total } = useContext(ProductsContext);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFilters(prev => ({
            ...prev,
            [name]: value,
            page: 1 // reset page when filter changes
        }));
    };
    const handleReset = () => {
        setFilters({
            search: "",
            minPrice: "",
            maxPrice: "",
            category: "",
            sort: "",
            page: 1,
            limit: 12,
        });
    };

    return (
        <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-md space-y-6 border border-transparent dark:border-indigo-500/10 mb-8 transition-all">


            {/* Price */}
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium mb-1 dark:text-gray-300">Min Price</label>
                    <input
                        type="number"
                        name="minPrice"
                        value={filters.minPrice}
                        onChange={handleChange}
                        placeholder="0"
                        className="w-full border dark:border-gray-700 rounded-lg px-3 py-2 dark:bg-gray-800 dark:text-white outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1 dark:text-gray-300">Max Price</label>
                    <input
                        type="number"
                        name="maxPrice"
                        value={filters.maxPrice}
                        onChange={handleChange}
                        placeholder="1000"
                        className="w-full border dark:border-gray-700 rounded-lg px-3 py-2 dark:bg-gray-800 dark:text-white outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                    />
                </div>
            </div>

            {/* Category */}
            <div>
                <label className="block text-sm font-medium mb-1 dark:text-gray-300">Category</label>
                <select
                    name="category"
                    value={filters.category}
                    onChange={handleChange}
                    className="w-full border dark:border-gray-700 rounded-lg px-3 py-2 dark:bg-gray-800 dark:text-white outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                >
                    <option value="">All</option>
                    {categories?.map(category =>
                        <option key={category.id} value={category.id}>{category.name}</option>
                    )}
                </select>
            </div>



            {/* Items per page */}
            <div>
                <label className="block text-sm font-medium mb-1 dark:text-gray-300">Items per page</label>
                <select
                    name="limit"
                    value={filters.limit}
                    onChange={handleChange}
                    className="w-full border dark:border-gray-700 rounded-lg px-3 py-2 dark:bg-gray-800 dark:text-white outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                >
                    <option value={6}>6</option>
                    <option value={12}>12</option>
                    <option value={24}>24</option>
                </select>
            </div>

            {/* Reset */}
            <button
                onClick={handleReset}
                className="w-full bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700 py-2 rounded-lg font-medium dark:text-gray-300 transition-colors"
            >
                Reset Filters
            </button>
        </div>
    );
};

export default ProductFilters;
