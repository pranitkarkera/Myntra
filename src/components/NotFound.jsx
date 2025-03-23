// src/components/NotFound.jsx
import React from "react";

const NotFound = () => {
  return (
    <div className="container mx-auto text-center py-20">
      <h1 className="text-4xl font-bold text-red-500 mb-4">
        404 - Page Not Found
      </h1>
      <p className="text-gray-600">
        The page you're looking for doesn't exist.
      </p>
    </div>
  );
};

export default NotFound;
