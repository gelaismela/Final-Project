import { Link } from "react-router-dom";
import "../styles/Home.css";

const ItemList = ({ products, onAddToCart }) => {
  return (
    <div className="product-list">
      {products.map((product) => (
        <div className="product-preview" key={product.id}>
          <Link to={`/products/${product.id}`}>
            <img
              src={product.photo}
              alt={product.name}
              className="product-image"
            />
            <h2>{product.name}</h2>
            <p>Sizes: {product.sizes.join(", ")}</p>
            <p>Quantity: {product.quantity}</p>
            <p>Price: ${product.price.toFixed(2)}</p>
          </Link>

          <button
            className="add-to-cart-btn"
            onClick={() => {
              console.log("Added to cart:", product);
              onAddToCart(product);
            }}
          >
            Add to Cart
          </button>
        </div>
      ))}
    </div>
  );
};

export default ItemList;
