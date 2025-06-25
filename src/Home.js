import ItemList from "./components/ItemList";
import useFetch from "./hooks/UseFetch";
import useCart from "./hooks/UseCart"; // ✅ import the cart hook
import { useParams } from "react-router-dom";
import NavBar from "./components/Navbar";
import "./styles/Home.css";

const Home = () => {
  const { gender } = useParams();
  const {
    error,
    isPending,
    data: products,
  } = useFetch("http://localhost:8000/products");

  const apiUrl = "http://localhost:8000"; // ✅ API base for cart
  const { addItem } = useCart(apiUrl); // ✅ useCart gives you addItem()

  // Debug logs
  console.log("Fetched products:", products);
  console.log("Error:", error);
  console.log("Loading:", isPending);
  console.log("Gender param:", gender);

  const formatGenderPossessive = (gender) => {
    const map = {
      man: "Men's",
      woman: "Women's",
      kid: "Kids'",
    };
    return map[gender?.toLowerCase()] || `${gender}'s`;
  };

  // Filter products by gender
  const filteredProducts =
    products?.filter(
      (product) => product.gender.toLowerCase() === gender?.toLowerCase()
    ) || [];

  // ✅ Define handler to pass to ItemList
  const handleAddToCart = (product) => {
    console.log("Adding to cart:", product);
    addItem(product.id, 1);
  };

  return (
    <div className="home">
      <NavBar />
      <h1 className="home-header">{formatGenderPossessive(gender)} Clothes</h1>

      {error && <div>{error}</div>}
      {isPending && <div>Loading...</div>}
      {!isPending && filteredProducts.length === 0 && (
        <div>No products found in {gender} section.</div>
      )}
      {filteredProducts && (
        <ItemList
          products={filteredProducts}
          onAddToCart={handleAddToCart} // ✅ pass the function
        />
      )}
    </div>
  );
};

export default Home;
