import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Home from "./Home";
import SingleItemPage from "./components/ItemPage";
import Checkout from "./components/Checkout";

function App() {
  return (
    <Router>
      <div className="App">
        <div className="content">
          <Routes>
            <Route path="/" element={<Navigate to="/category/women" />} />
            <Route path="/category/:gender" element={<Home />} />
            <Route path="/products/:id" element={<SingleItemPage />} />
            <Route path="/checkout" element={<Checkout />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
