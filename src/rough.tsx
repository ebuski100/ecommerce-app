import React from 'react'

const rough = () => {
  return (
    <div>      // <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
        //   <div className="bg-white p-6 rounded-xl shadow-lg w-[80%]">
        //     <h2 className="text-lg font-bold mb-4">
        //       {modalType === "deleteAll"
        //         ? "Delete all wishlist items?"
        //         : "Delete the selected wishlist item?"}
        //     </h2>

        //     <div className="flex justify-end gap-4">
        //       <button
        //         onClick={() => setModalType(null)}
        //         className="px-4 py-2 bg-gray-200 rounded-lg"
        //       >
        //         Cancel
        //       </button>
        //       <button
        //         onClick={handleConfirmDelete}
        //         className="px-4 py-2 bg-red-500 text-white rounded-lg"
        //       >
        //         {modalType === "deleteAll" ? "Delete All" : "Delete"}
        //       </button>
        //     </div>
        //   </div>
        // </div>

    </div>
  )
}



useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY;

      // Hide at very top
      if (currentScroll < 120) {
        setVisible(false);
      }
      // Show once past threshold
      else {
        setVisible(true);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

export default rough