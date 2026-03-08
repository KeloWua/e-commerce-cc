import { useContext } from "react";
import { ProductsContext } from "../context/ProductsContext";

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
    <div className="bg-white p-6 rounded-2xl shadow-md space-y-6">


      {/* Price */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Min Price</label>
          <input
            type="number"
            name="minPrice"
            value={filters.minPrice}
            onChange={handleChange}
            placeholder="0"
            className="w-full border rounded-lg px-3 py-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Max Price</label>
          <input
            type="number"
            name="maxPrice"
            value={filters.maxPrice}
            onChange={handleChange}
            placeholder="1000"
            className="w-full border rounded-lg px-3 py-2"
          />
        </div>
      </div>

      {/* Category */}
      <div>
        <label className="block text-sm font-medium mb-1">Category</label>
        <select
          name="category"
          value={filters.category}
          onChange={handleChange}
          className="w-full border rounded-lg px-3 py-2"
        >
          <option value="">All</option>
          {categories?.map(category => 
            <option key={category.id} value={category.id}>{category.name}</option>
          )}
        </select>
      </div>



      {/* Items per page */}
      <div>
        <label className="block text-sm font-medium mb-1">Items per page</label>
        <select
          name="limit"
          value={filters.limit}
          onChange={handleChange}
          className="w-full border rounded-lg px-3 py-2"
        >
          <option value={6}>6</option>
          <option value={12}>12</option>
          <option value={24}>24</option>
        </select>
      </div>

      {/* Reset */}
      <button
        onClick={handleReset}
        className="w-full bg-gray-200 hover:bg-gray-300 py-2 rounded-lg font-medium"
      >
        Reset Filters
      </button>
    </div>
  );
};

export default ProductFilters;