import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import "../styles/CategoryList.css";

const SubSubcategoryPage = () => {
  const { subcategoryId } = useParams();
  const [subSubcategories, setSubSubcategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSubSubcategories = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/subsubcategories/${subcategoryId}`
        );

        console.log("API Response:", response.data);

        // Ensure response is an array
        setSubSubcategories(Array.isArray(response.data) ? response.data : [response.data]);
      } catch (err) {
        console.error("Error fetching sub-subcategories:", err);
        setError(err.response?.data?.message || "Failed to load sub-subcategories");
      } finally {
        setLoading(false);
      }
    };

    fetchSubSubcategories();
  }, [subcategoryId]);

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="category-container">
      <h2 className="category-title">Sub-Subcategories</h2>
      <div className="category-grid">
        {subSubcategories.length > 0 ? (
          subSubcategories.map((subSubcategory) => (
            <Link
              key={subSubcategory.id}
              to={`/productlist`} // Now navigates to the ProductList page
              className="category-card"
            >
              <img
                src={subSubcategory.images || "https://via.placeholder.com/150"}
                alt={subSubcategory.name}
              />
              <h3>{subSubcategory.name}</h3>
              <p>({subSubcategory.subcategory?.subcategoryName || "No Subcategory"})</p>
            </Link>
          ))
        ) : (
          <p className="no-data">No sub-subcategories available</p>
        )}
      </div>
    </div>
  );
};

export default SubSubcategoryPage;
