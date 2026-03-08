import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react";
import { useEffect, useState } from "react";

const Pagination = ({ totalPages, currentPage, goToPage }) => {

    const [maxVisible, setMaxVisible] = useState(8);

    // Detectar mobile
    useEffect(() => {
        const update = () => {
            setMaxVisible(window.innerWidth < 640 ? 4 : 8);
        };

        update();
        window.addEventListener("resize", update);

        return () => window.removeEventListener("resize", update);
    }, []);

    const getVisiblePages = () => {
        let start = Math.max(1, currentPage - Math.floor(maxVisible / 2));
        let end = start + maxVisible - 1;

        if (end > totalPages) {
            end = totalPages;
            start = Math.max(1, end - maxVisible + 1);
        }

        const pages = [];
        for (let i = start; i <= end; i++) {
            pages.push(i);
        }

        return { pages, start, end };
    };

    const { pages, start, end } = getVisiblePages();

    if (totalPages <= 1) return null;

    return (
        <div className="w-full flex justify-center px-4 mt-8">
            <div className="flex items-center gap-2 whitespace-nowrap overflow-x-auto">

                {/* First */}
                <button
                    onClick={() => goToPage(1)}
                    disabled={currentPage === 1}
                    className="w-10 h-10 flex items-center justify-center rounded-lg border bg-white hover:bg-gray-100 disabled:opacity-40"
                >
                    <ChevronsLeft size={16} />
                </button>

                {/* Prev */}
                <button
                    onClick={() => goToPage(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="w-10 h-10 flex items-center justify-center rounded-lg border bg-white hover:bg-gray-100 disabled:opacity-40"
                >
                    <ChevronLeft size={16} />
                </button>

                {/* First page + dots */}
                {start > 1 && (
                    <>
                        <button
                            onClick={() => goToPage(1)}
                            className="w-10 h-10 flex items-center justify-center rounded-lg border bg-white hover:bg-gray-100"
                        >
                            1
                        </button>

                        {start > 2 && (
                            <span className="px-2 text-gray-400 select-none">
                                ...
                            </span>
                        )}
                    </>
                )}

                {/* Visible pages */}
                {pages.map(page => (
                    <button
                        key={page}
                        onClick={() => goToPage(page)}
                        className={`w-10 h-10 flex items-center justify-center rounded-lg border text-sm font-medium transition
              ${currentPage === page
                                ? "bg-indigo-600 text-white border-indigo-600 shadow"
                                : "bg-white text-gray-700 hover:bg-gray-100"
                            }
            `}
                    >
                        {page}
                    </button>
                ))}

                {/* Last page + dots */}
                {end < totalPages && (
                    <>
                        {end < totalPages - 1 && (
                            <span className="px-2 text-gray-400 select-none">
                                ...
                            </span>
                        )}

                        <button
                            onClick={() => goToPage(totalPages)}
                            className="w-10 h-10 flex items-center justify-center rounded-lg border bg-white hover:bg-gray-100"
                        >
                            {totalPages}
                        </button>
                    </>
                )}

                {/* Next */}
                <button
                    onClick={() => goToPage(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="w-10 h-10 flex items-center justify-center rounded-lg border bg-white hover:bg-gray-100 disabled:opacity-40"
                >
                    <ChevronRight size={16} />
                </button>

                {/* Last */}
                <button
                    onClick={() => goToPage(totalPages)}
                    disabled={currentPage === totalPages}
                    className="w-10 h-10 flex items-center justify-center rounded-lg border bg-white hover:bg-gray-100 disabled:opacity-40"
                >
                    <ChevronsRight size={16} />
                </button>

            </div>
        </div>
    );
};

export default Pagination;
