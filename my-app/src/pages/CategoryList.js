import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "../styles/CategoryList.css";

const CategoryList = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/categories");
        console.log("Fetched Categories:", response.data); // Log fetched data
        setCategories(response.data);
      } catch (err) {
        console.error("Error fetching categories:", err); // Log error if any
        setError("Error fetching categories");
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="category-container">
      <h2 className="category-title">Shop by Categories</h2>
      <div className="category-grid">
        {categories.map((category) => (
          <div className="category-card" key={category.categoryId}>
            <Link to={`/subcategories/${category.categoryId}`}>
              <img
                src={category.imageUrl || "https://via.placeholder.com/150"}
                alt={category.categoryName}
              />
              <h3>{category.categoryName}</h3>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryList;
