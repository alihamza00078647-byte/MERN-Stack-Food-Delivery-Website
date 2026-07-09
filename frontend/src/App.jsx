import { Route, Routes } from "react-router-dom";
import Navbar from "./components/navbar/navbar";
import Cart from "./pages/Cart/Cart";
import Home from "./pages/Home/home";
import PlaceOrder from "./pages/PlaceOrder/PlaceOrder";
import Footer from "./components/footer/footer";
import { useState } from "react";
import LoginPopup from "./components/LoginPopup/LoginPopUp";

function App() {

  const [showLogin, setShowLogin] = useState(false)

  return (
    <>
    {showLogin? <LoginPopup setShowLogin={setShowLogin}/>: <></>}
      <div className="app">
        <Navbar setShowLogin={setShowLogin}/>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/order" element={<PlaceOrder />} />
        </Routes>
      </div>
      <Footer />
    </>
  );
}

export default App;
