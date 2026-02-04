const ConfirmDeleteModal = ({ isOpen, onCancel, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40"
        onClick={onCancel}
      />

      {/* Modal */}
      <div
        className="
          relative bg-white rounded-xl shadow-lg
          w-full max-w-sm p-6
          animate-scale-in
        "
      >
        <h3 className="text-lg font-semibold text-gray-900">
          Delete task?
        </h3>

        <p className="text-sm text-gray-500 mt-2">
          This action cannot be undone. Are you sure you want to delete this task?
        </p>

        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={onCancel}
            className="
              px-4 py-2 rounded-lg text-sm
              text-gray-700 hover:bg-gray-100
              transition
            "
          >
            Cancel
          </button>

          <button
            onClick={onConfirm}
            className="
              px-4 py-2 rounded-lg text-sm
              bg-red-600 text-white
              hover:bg-red-700
              transition
            "
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDeleteModal;
