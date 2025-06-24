import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Home";
import ItemPage from "./components/ItemPage";
import Checkout from "./components/Checkout";

function App() {
  return (
    <Router>
      <div className="App">
        <div className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/item}" element={<ItemPage />} />
            <Route path="/checkout" element={<Checkout />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
