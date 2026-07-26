import { Routes, Route } from "react-router-dom";

import MainLayout from "./layouts/MainLayout";

import Home from "./pages/Home/Home";
import About from "./pages/About/About";
import Decor from "./pages/Decor/Decor";
import Food from "./pages/Food/Food";
import Gallery from "./pages/Gallery/Gallery";
import Booking from "./pages/Booking/Booking";
import Contact from "./pages/Contact/Contact";
import Login from "./pages/Admin/Login";
import NotFound from "./pages/NotFound/NotFound";

function App() {
  return (
    <Routes>

      {/* Public Website */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/decor" element={<Decor />} />
        <Route path="/food" element={<Food />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/booking" element={<Booking />} />
        <Route path="/contact" element={<Contact />} />
      </Route>

      {/* Admin */}
      <Route path="/admin" element={<Login />} />

      {/* 404 */}
      <Route path="*" element={<NotFound />} />

    </Routes>
  );
}

export default App;