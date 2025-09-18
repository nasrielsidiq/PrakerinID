import React from "react";

interface PaginationProps {
  activePage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  loading: boolean;
}

const PaginationComponent: React.FC<PaginationProps> = ({
  activePage,
  totalPages,
  onPageChange,
  loading,
}) => {
  const getVisiblePages = () => {
    if (totalPages <= 3) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }
    if (activePage === 1) {
      return [1, 2, 3];
    }
    if (activePage === totalPages) {
      return [totalPages - 2, totalPages - 1, totalPages];
    }
    return [activePage - 1, activePage, activePage + 1];
  };
  const pages = getVisiblePages();
  // for (let i = 1; i <= totalPages; i++) {
  //   pages.push(i);
  // }

  return (
    <div className="grid grid-cols-5 bg-white border-1 border-gray-200 h-10 w-[200px] m-auto me-0 mt-5 rounded-xl overflow-hidden justify-items-stretch">
      <button
        className="bg-accent hover:bg-accent-hover cursor-pointer text-white px-3 disabled:cursor-not-allowed disabled:bg-gray-300"
        disabled={loading || activePage === 1 ? true : false}
        onClick={() => onPageChange(activePage - 1)}
      >
        {"<"}
      </button>
      <div className="grid grid-cols-3 col-span-3">
        {pages.map((pageNum, index) => (
          <button
            key={index}
            className={`text-black px-3 border border-gray-300 cursor-pointer hover:bg-gray-400 ${
              pageNum === activePage ? "bg-gray-400" : "bg-gray-200"
            }`}
            onClick={() => onPageChange(pageNum)}
          >
            {pageNum}
          </button>
        ))}
      </div>
      <button
        className="bg-accent hover:bg-accent-hover cursor-pointer  text-white px-3 disabled:cursor-not-allowed disabled:bg-gray-300"
        disabled={loading || activePage === totalPages ? true : false}
        onClick={() => onPageChange(activePage + 1)}
      >
        {">"}
      </button>
    </div>
  );
};

export default PaginationComponent;
