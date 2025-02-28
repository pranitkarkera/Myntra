import React, { useEffect, useState } from "react";

const CategoryFilterComponent = ({ categories, onCategoryChange, reset }) => {
  const [selectedCategories, setSelectedCategories] = useState([]);

  useEffect(() => {
    if (reset) {
      setSelectedCategories([]);
    }
  }, [reset]);

  const handleCategorySelect = (categoryId) => {
    const updatedCategories = selectedCategories.includes(categoryId)
      ? selectedCategories.filter((id) => id !== categoryId)
      : [...selectedCategories, categoryId];
    setSelectedCategories(updatedCategories);
    onCategoryChange(updatedCategories);
  };

  useEffect(() => {
    onCategoryChange(selectedCategories);
  }, [selectedCategories, onCategoryChange]);

  return (
    <div role="group" aria-labelledby="category-filter">
      <h5 id="category-filter" className="fw-bolder">
        Categories
      </h5>
      {categories.map((category) => (
        <div
          key={category._id}
          style={{ marginBottom: "0.5rem" }}
          className="form-check"
        >
          <input
            type="checkbox"
            id={category._id}
            value={category.categoryName}
            className="form-check-input"
            checked={selectedCategories.includes(category.categoryId)}
            onChange={() => handleCategorySelect(category.categoryId)}
            aria-label={`Select category ${category.categoryName}`}
          />{" "}
          <label htmlFor={category._id} className="form-check-label">
            {category.categoryName}
          </label>
        </div>
      ))}
    </div>
  );
};

export default CategoryFilterComponent;
