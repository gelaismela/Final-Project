import React from "react";
import ItemList from "./components/ItemList";
import useFetch from "./hooks/UseFetch";
import useCart from "./hooks/UseCart";
import { useParams } from "react-router-dom";
import NavBar from "./components/Navbar";
import "./styles/Home.css";

const Home = () => {
  // Get the gender parameter from the URL (e.g., /category/men)
  const { gender } = useParams();

  // Fetch all products from the API
  const {
    error,
    isPending,
    data: products,
  } = useFetch("http://localhost:8000/products");

  // Set up cart functionality
  const { addItem } = useCart("http://localhost:8000");

  // Format gender for the page header (e.g., "Men's Clothes")
  const formatGenderPossessive = (gender) => {
    const map = {
      man: "Men's",
      woman: "Women's",
      kid: "Kids'",
    };
    return map[gender?.toLowerCase()] || `${gender}'s`;
  };

  // Filter products by gender from the URL
  const filteredProducts =
    products?.filter(
      (product) => product.gender.toLowerCase() === gender?.toLowerCase()
    ) || [];

  // Handler for adding a product to the cart
  const handleAddToCart = (product) => {
    addItem(product.id, 1);
  };

  return (
    <div className="home">
      {/* Navigation bar at the top */}
      <NavBar />

      {/* Page header */}
      <h1 className="home-header">{formatGenderPossessive(gender)} Clothes</h1>

      {/* Show error, loading, or product list */}
      {error && <div>{error}</div>}
      {isPending && <div>Loading...</div>}
      {!isPending && filteredProducts.length === 0 && (
        <div>No products found in {gender} section.</div>
      )}
      {filteredProducts && (
        <ItemList products={filteredProducts} onAddToCart={handleAddToCart} />
      )}
    </div>
  );
};

export default Home;
