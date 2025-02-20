import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import "../styles/CategoryList.css"; 

const SubcategoryPage = () => {
  const { categoryId } = useParams();
  const [subcategories, setSubcategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSubcategoriesByCategory = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/subcategories/category/${categoryId}`
        );
        console.log("Fetched Subcategories:", response.data); // Log the fetched data
        setSubcategories(response.data);
      } catch (err) {
        console.error("Error fetching subcategories:", err); // Log any errors
        setError("Error fetching subcategories");
      } finally {
        setLoading(false);
      }
    };

    fetchSubcategoriesByCategory();
  }, [categoryId]);

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="category-container">
      <h2 className="category-title">Subcategories</h2>
      <div className="category-grid">
        {subcategories.map((subcategory) => (
          <Link
            key={subcategory.subcategoryId}
            to={`/subsubcategories/${subcategory.subcategoryId}`}
            className="category-card"
          >
            <img
              src={subcategory.images || "https://via.placeholder.com/150"}
              alt={subcategory.subcategoryName}
            />
            <h3>{subcategory.subcategoryName}</h3>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SubcategoryPage;
