import React, { useState } from "react";
import { useParams } from "react-router-dom";
import useFetch from "../hooks/UseFetch";
import useCart from "../hooks/UseCart";
import "../styles/ItemPage.css";
import NavBar from "./Navbar";

const SingleItemPage = () => {
  const { id } = useParams();
  const apiUrl = "http://localhost:8000";
  const { addItem, error: cartError } = useCart(apiUrl);

  const {
    data: product,
    isPending,
    error,
  } = useFetch(`${apiUrl}/products/${id}`);

  const [selectedSize, setSelectedSize] = useState(null);

  const handleAddToCartClick = () => {
    addItem(product.id, 1);
  };

  if (isPending) return <div>Loading product...</div>;
  if (error) return <div>Error loading product: {error}</div>;
  if (!product) return <div>Product not found.</div>;

  return (
    <div className="ItemPage-Container">
      <NavBar />
      <div className="ItemPage">
        <div className="ItemPage-Thumbnail">
          <img src={product.photo} alt={product.name} />
          <img src={product.photo} alt={product.name} />
          <img src={product.photo} alt={product.name} />
        </div>

        <div className="ItemPage-Main">
          <div className="ItemPage-Photo">
            <img src={product.photo} alt={product.name} />
          </div>

          <div className="ItemPage-Description">
            <div className="Description-First">
              <h2 className="ItemPage-Name">{product.name}</h2>
              <h3 className="ItemPage-TypeOfClothe">Running Short</h3>

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
              <div className="ItemPage-Price">
                <p>Price:</p>${product.price.toFixed(2)}
              </div>

              <button
                className="ItemPage-AddToCart"
                onClick={handleAddToCartClick}
              >
                ADD TO CART
              </button>

              {cartError && (
                <p style={{ color: "red", marginTop: "10px" }}>{cartError}</p>
              )}

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
