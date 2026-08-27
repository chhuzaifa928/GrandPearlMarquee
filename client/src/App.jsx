import { Routes, Route, Navigate } from "react-router-dom";

import MainLayout from "./layouts/MainLayout";
import AdminLayout from "./layouts/AdminLayout";

import Home from "./pages/Home/Home";
import About from "./pages/About/About";
import Decor from "./pages/Decor/Decor";
import Food from "./pages/Food/Food";
import Gallery from "./pages/Gallery/Gallery";
import Booking from "./pages/Booking/Booking";
import Contact from "./pages/Contact/Contact";

import Login from "./pages/Admin/Login";
import Dashboard from "./pages/Admin/Dashboard";
import Bookings from "./pages/Admin/Bookings";
import DecorAdmin from "./pages/Admin/Decor";
import FoodAdmin from "./pages/Admin/Food";
import GalleryAdmin from "./pages/Admin/Gallery";
import ContactAdmin from "./pages/Admin/Contact";
import Settings from "./pages/Admin/Settings";

import NotFound from "./pages/NotFound/NotFound";
import ProtectedRoute from "./components/Common/ProtectedRoute";

function App() {
  return (
    <Routes>

      {/* =========================
          Public Website
      ========================== */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/decor" element={<Decor />} />
        <Route path="/food" element={<Food />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/booking" element={<Booking />} />
        <Route path="/contact" element={<Contact />} />
      </Route>

      {/* =========================
          Admin Login
      ========================== */}
      <Route
        path="/admin/login"
        element={<Login />}
      />

      {/* =========================
          Protected Admin Panel
      ========================== */}
      <Route element={<ProtectedRoute />}>

        <Route
          path="/admin"
          element={<AdminLayout />}
        >
          {/* Redirect /admin -> /admin/dashboard */}
          <Route
            index
            element={<Navigate to="dashboard" replace />}
          />

          <Route
            path="dashboard"
            element={<Dashboard />}
          />

          <Route
            path="bookings"
            element={<Bookings />}
          />

          <Route
            path="decor"
            element={<DecorAdmin />}
          />

          <Route
            path="food"
            element={<FoodAdmin />}
          />

          <Route
            path="gallery"
            element={<GalleryAdmin />}
          />

          <Route
            path="contact"
            element={<ContactAdmin />}
          />

          <Route
            path="settings"
            element={<Settings />}
          />
        </Route>

      </Route>

      {/* =========================
          404
      ========================== */}
      <Route
        path="*"
        element={<NotFound />}
      />

    </Routes>
  );
}

export default App;