import Modal from 'react-modal'

import React from 'react'

const ConfirmModal = ({showConfirm,onClose,onConfirm}) => {
    return (
        <Modal
            isOpen={showConfirm}
            // ariaHideApp={false}
            onRequestClose={()=>{}}
        
            style={{
                overlay: {
                    display: "flex", 
                    justifyContent: "center", 
                    alignItems: "center", 
                    backgroundColor:"rgba(0,0,0,0.5)"
                },
            }}
            contentLabel="Delete Confirmation"
            className="w-[40%]  bg-white  rounded-md mx-auto mt-14 p-5 "
        >
            <h2 className="text-xl font-bold mb-4">Confirm Deletion</h2>
            <p className="mb-6 text-gray-700">
                Are you sure you want to delete this item? This action cannot be undone.
            </p>
            <div className="flex justify-end gap-3">
                <button
                className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400"
                onClick={onClose}
                >
                Cancel
                </button>
                <button
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                onClick={onConfirm}
                >
                Delete
                </button>
            </div>
        </Modal>
    )
}

export default ConfirmModal