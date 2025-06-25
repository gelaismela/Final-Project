import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Home from "./Home";
import SingleItemPage from "./components/ItemPage";
import Checkout from "./components/Checkout";
import Cart from "./components/Cart";
import { CurrencyProvider } from "./context/CurrencyContext";
import { CartProvider } from "./context/CartContext";
import ShippingInfo from "./components/ShippingInfo";
import ShippingMethod from "./components/ShippingMethod";
import { CheckoutProvider } from "./context/CheckoutContext";
import PaymentPage from "./components/PaymentPage";

function App() {
  return (
    <CheckoutProvider>
      <CartProvider>
        <CurrencyProvider>
          <Router>
            <div className="App">
              <div className="content">
                <Routes>
                  <Route path="/" element={<Navigate to="/category/women" />} />
                  <Route path="/category/:gender" element={<Home />} />
                  <Route path="/products/:id" element={<SingleItemPage />} />
                  <Route path="/checkout" element={<Checkout />} />
                  <Route path="/cart" element={<Cart />} />
                  <Route path="shippingInfo" element={<ShippingInfo />} />
                  <Route path="/shippingMethod" element={<ShippingMethod />} />
                  <Route path="/paymentPage" element={<PaymentPage />} />
                </Routes>
              </div>
            </div>
          </Router>
        </CurrencyProvider>
      </CartProvider>
    </CheckoutProvider>
  );
}

export default App;
