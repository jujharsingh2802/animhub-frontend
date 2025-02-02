import React from "react";
import { ImBin } from "./icons.js";

function DeleteConfirmation({ onCancel, onDelete, comment, tweet, video }) {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 bg-opacity-90 fixed inset-0 z-50">
      <div className="bg-gray-800 text-white p-6 rounded-lg shadow-lg w-96">
        <div className="flex items-center justify-center mb-4">
          <ImBin className="text-red-500 text-4xl" />
        </div>
        <h2 className="text-lg font-semibold text-center mb-2">
          Confirm Deletion
        </h2>
        <p className="text-sm text-gray-300 text-center mb-4">
          Are you sure you want to delete this 
          {comment && " comment"}
          {tweet && " tweet"}
          {video && " video"}? This action cannot be undone.
        </p>
        <div className="flex justify-around">
          <button
            onClick={onCancel}
            className="bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 rounded-md transition duration-200"
          >
            Cancel
          </button>
          <button
            onClick={onDelete}
            className="bg-red-600 hover:bg-red-500 text-white py-2 px-4 rounded-md transition duration-200"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteConfirmation;
