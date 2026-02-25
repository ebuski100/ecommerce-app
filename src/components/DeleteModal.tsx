import React from "react";
type ModalType = "deleteAll" | "deleteOne";
type ContextType = "wishlist" | "cart";

type DeleteModalProps = {
  modalType: ModalType;
  context: ContextType;
  setModalType: React.Dispatch<React.SetStateAction<ModalType | null>>;
  handleConfirmDelete: () => void;
};
const DeleteModal = ({
  modalType,
  context,
  setModalType,
  handleConfirmDelete,
}: DeleteModalProps) => {
  return (
    <>
      <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
        <div className="bg-white p-6 rounded-xl shadow-lg w-[80%]">
          <h2 className="text-lg font-bold mb-4">
            {modalType === "deleteAll"
              ? `Delete all ${context} items`
              : `Delete the selected ${context} item?`}
          </h2>

          <div className="flex justify-end gap-4">
            <button
              onClick={() => setModalType(null)}
              className="px-4 py-2 bg-gray-200 rounded-lg"
            >
              Cancel
            </button>
            <button
              onClick={handleConfirmDelete}
              className="px-4 py-2 bg-red-500 text-white rounded-lg"
            >
              {modalType === "deleteAll" ? "Delete All" : "Delete"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default DeleteModal;
