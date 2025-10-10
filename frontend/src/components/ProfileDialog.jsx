import React from "react";
import { useNavigate } from "react-router-dom";

const ProfileDialog = ({ user, isOpen, onClose }) => {
  const navigate = useNavigate();
  if (!isOpen) {
    return null;
  }

  // Calculate storage percentage
  const storagePercentage = (user.storage.used / user.storage.total) * 100;

  const onLogout = () => {
    localStorage.removeItem("userInfo");
    navigate("/");
  };

  return (
    // Backdrop
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm"
      onClick={onClose}
    >
      {/* Dialog Content */}
      <div
        className="relative w-full max-w-sm rounded-2xl bg-white p-8 shadow-2xl dark:bg-gray-800"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the dialog
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
        >
          <span className="material-symbols-outlined">close</span>
        </button>

        <div className="flex flex-col items-center">
          {/* Profile Picture */}
          <div className="w-24 h-24 mb-4 rounded-full overflow-hidden bg-gray-200 dark:bg-gray-700">
            <img
              src={
                user.avatarUrl ||
                `https://placehold.co/100x100/E2E8F0/4A5568?text=${user.name.charAt(
                  0
                )}`
              }
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>

          {/* User Info */}
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            {user.name}
          </h2>
          <p className="text-md text-gray-500 dark:text-gray-400">
            {user.email}
          </p>

          {/* Storage Meter */}
          <div className="w-full mt-8">
            <div className="flex justify-between mb-1 text-sm font-medium text-gray-600 dark:text-gray-300">
              <span>Storage Used</span>
              <span>{storagePercentage.toFixed(0)}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
              <div
                className="bg-indigo-600 h-2.5 rounded-full"
                style={{ width: `${storagePercentage}%` }}
              ></div>
            </div>
            <p className="text-xs text-right mt-1 text-gray-500 dark:text-gray-400">
              {user.storage.used} GB / {user.storage.total} GB
            </p>
          </div>

          {/* Action Buttons */}
          <div className="w-full flex flex-col gap-3 mt-8">
            <button className="w-full h-12 px-6 font-semibold text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition-colors">
              Upgrade Plan
            </button>
            <button
              onClick={onLogout}
              className="w-full h-12 px-6 font-semibold text-indigo-700 bg-indigo-100 rounded-lg hover:bg-indigo-200 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600 transition-colors"
            >
              Log Out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileDialog;
