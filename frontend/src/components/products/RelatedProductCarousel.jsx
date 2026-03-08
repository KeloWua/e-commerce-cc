import { useRef } from "react";
import RelatedProductCard from "./RelatedProductCard";

const RelatedProductsCarousel = ({ products }) => {
    const maxProducts = 6;
    const visibleProducts = products?.slice(0, maxProducts);

    const scrollRef = useRef(null);

    const scrollLeft = () => {
        scrollRef.current.scrollBy({ left: -300, behavior: "smooth" });
    };

    const scrollRight = () => {
        scrollRef.current.scrollBy({ left: 300, behavior: "smooth" });
    };

    return (
        <div className="mt-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b border-gray-200 pb-2">
                Related Products
            </h2>

            <div className="relative">
                {/* Left button */}
                <button
                    onClick={scrollLeft}
                    className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white border rounded-full p-2 shadow hover:bg-gray-100 transition"
                >
                    &#8592;
                </button>

                {/* Carousel with scroll */}
                <div
                    ref={scrollRef}
                    className="flex gap-4 overflow-x-auto scroll-smooth scrollbar-hide py-2"
                >
                    {visibleProducts?.map((product) => (
                        <div key={product.id} className="flex-shrink-0 w-64">
                            <RelatedProductCard {...product} />
                        </div>
                    ))}
                </div>

                {/* Right button */}
                <button
                    onClick={scrollRight}
                    className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white border rounded-full p-2 shadow hover:bg-gray-100 transition"
                >
                    &#8594;
                </button>
            </div>
        </div>
    );
};

export default RelatedProductsCarousel;
