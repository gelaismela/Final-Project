import React, { useState } from "react";
import { useParams } from "react-router-dom";
import useFetch from "../hooks/UseFetch";
import "../styles/ItemPage.css";
import NavBar from "./Navbar";
import { useCurrency } from "../context/CurrencyContext";
import { useCartContext } from "../context/CartContext";

// Currency conversion data
const currencyData = {
  usd: { symbol: "$", rate: 1 },
  eur: { symbol: "€", rate: 0.92 },
  gel: { symbol: "₾", rate: 2.7 },
};

// Helper to convert price to selected currency
function convertPrice(price, currency) {
  const { rate } = currencyData[currency] || currencyData.usd;
  return price * rate;
}

/**
 * Single product page component.
 * Shows product details, images, sizes, and allows adding to cart.
 */
const SingleItemPage = () => {
  // Get product ID from URL
  const { id } = useParams();
  const apiUrl = "http://localhost:8000";

  // Access cart context for addItem and error
  const { addItem, error: cartError } = useCartContext();

  // Fetch product data by ID
  const {
    data: product,
    isPending,
    error,
  } = useFetch(`${apiUrl}/products/${id}`);

  // State for selected size
  const [selectedSize, setSelectedSize] = useState(null);

  // Get current currency and symbol
  const { currency } = useCurrency();
  const symbol = currencyData[currency]?.symbol || "$";

  // Handle add to cart button click
  const handleAddToCartClick = () => {
    addItem(product.id, 1);
  };

  // Loading and error states
  if (isPending) return <div>Loading product...</div>;
  if (error) return <div>Error loading product: {error}</div>;
  if (!product) return <div>Product not found.</div>;

  return (
    <div className="ItemPage-Container">
      {/* Navigation bar */}
      <NavBar />

      <div className="ItemPage">
        {/* Thumbnails (could be different images in a real app) */}
        <div className="ItemPage-Thumbnail">
          <img src={product.photo} alt={product.name} />
          <img src={product.photo} alt={product.name} />
          <img src={product.photo} alt={product.name} />
        </div>

        <div className="ItemPage-Main">
          {/* Main product image */}
          <div className="ItemPage-Photo">
            <img src={product.photo} alt={product.name} />
          </div>

          {/* Product details and actions */}
          <div className="ItemPage-Description">
            <div className="Description-First">
              <h2 className="ItemPage-Name">{product.name}</h2>
              <h3 className="ItemPage-TypeOfClothe">Running Short</h3>

              {/* Size selection */}
              <div className="ItemPage-Sizes">
                <p>Sizes:</p>
                <div className="Sizes-Variant">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      className={`ItemPage-SizeBtn ${
                        selectedSize === size ? "active" : ""
                      }`}
                      onClick={() => setSelectedSize(size)}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="Description-Second">
              {/* Price display */}
              <div className="ItemPage-Price">
                <p>Price:</p>
                {symbol}
                {convertPrice(product.price, currency).toFixed(2)}
              </div>

              {/* Add to cart button */}
              <button
                className="ItemPage-AddToCart"
                onClick={handleAddToCartClick}
              >
                ADD TO CART
              </button>

              {/* Show cart error if any */}
              {cartError && (
                <p style={{ color: "red", marginTop: "10px" }}>{cartError}</p>
              )}

              {/* Product description */}
              <p className="ItemPage-DescriptionText">
                Find stunning women’s cocktail dresses and party dresses. Stand
                out in lace and metallic cocktail dresses and party dresses from
                all your favorite brands.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleItemPage;
