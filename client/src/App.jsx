import { lazy, Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import MainLayout from "./layouts/MainLayout";
import AdminLayout from "./layouts/AdminLayout";
import ProtectedRoute from "./components/Common/ProtectedRoute";

const Home = lazy(() => import("./pages/Home/Home"));
const About = lazy(() => import("./pages/About/About"));
const Decor = lazy(() => import("./pages/Decor/Decor"));
const Food = lazy(() => import("./pages/Food/Food"));
const Gallery = lazy(() => import("./pages/Gallery/Gallery"));
const Booking = lazy(() => import("./pages/Booking/Booking"));
const Contact = lazy(() => import("./pages/Contact/Contact"));

const Login = lazy(() => import("./pages/Admin/Login"));
const Dashboard = lazy(() => import("./pages/Admin/Dashboard"));
const Bookings = lazy(() => import("./pages/Admin/Bookings"));
const DecorAdmin = lazy(() => import("./pages/Admin/Decor"));
const FoodAdmin = lazy(() => import("./pages/Admin/Food"));
const GalleryAdmin = lazy(() => import("./pages/Admin/Gallery"));
const ContactAdmin = lazy(() => import("./pages/Admin/Contact"));
const Settings = lazy(() => import("./pages/Admin/Settings"));

const NotFound = lazy(() => import("./pages/NotFound/NotFound"));

function App() {
  return (
    <Suspense
      fallback={
        <div className="d-flex justify-content-center align-items-center min-vh-100">
          <div className="spinner-border text-warning" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      }
    >
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
    </Suspense>
  );
}

export default App;
