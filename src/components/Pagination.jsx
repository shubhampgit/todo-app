const Pagination = ({
  currentPage,
  totalItems,
  itemsPerPage,
  onPageChange,
}) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  if (totalPages <= 1) return null;

  return (
    <div className="flex justify-center gap-2 mt-6 flex-wrap">
      {/* Prev */}
      <button
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
        className="
          px-3 py-1 rounded border text-sm
          disabled:opacity-40 disabled:cursor-not-allowed
        "
      >
        Prev
      </button>

      {/* Page numbers */}
      {[...Array(totalPages)].map((_, index) => {
        const page = index + 1;
        return (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`
              px-3 py-1 rounded border text-sm
              ${
                currentPage === page
                  ? "bg-black text-white"
                  : "hover:bg-gray-100"
              }
            `}
          >
            {page}
          </button>
        );
      })}

      {/* Next */}
      <button
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        className="
          px-3 py-1 rounded border text-sm
          disabled:opacity-40 disabled:cursor-not-allowed
        "
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
