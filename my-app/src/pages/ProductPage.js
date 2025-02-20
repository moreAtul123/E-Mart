import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const ProductPage = () => {
  const { subcategoryId } = useParams();  // Access subcategoryId from the URL
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProductsBySubcategory = async () => {
      try {
          const response = await fetch(`http://localhost:8080/api/products/subcategory/${subcategoryId}`);
          if (!response.ok) {
              throw new Error(`HTTP error! Status: ${response.status}`);
          }
          const data = await response.json();
          setProducts(data);
      } catch (error) {
          console.error("Error fetching products:", error);
      }
  };

    fetchProductsBySubcategory();
  }, [subcategoryId]);

  if (loading) return <div>Loading products...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h2>Products in Subcategory</h2>
      <div className="product-grid">
        {products.map((product) => (
          <div key={product.id}>
            <h3>{product.name}</h3>
            <p>{product.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductPage;
