import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { loginAdmin } from "../../services/adminService";

function Login() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({

    email: "",
    password: "",

  });

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  const handleChange = (e) => {

    setFormData({

      ...formData,
      [e.target.name]: e.target.value,

    });

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    setLoading(true);

    setError("");

    try {

      await loginAdmin(formData);

      navigate("/admin/dashboard", { replace: true });

    } catch (err) {

      setError(

        err.response?.data?.message ||

        "Login failed."

      );

    } finally {

      setLoading(false);

    }

  };

  return (

    <div
      className="container d-flex justify-content-center align-items-center"
      style={{ minHeight: "100vh" }}
    >

      <div
        className="card shadow p-4"
        style={{
          maxWidth: "420px",
          width: "100%",
        }}
      >

        <h2 className="text-center mb-4">

          Grand Pearl Admin

        </h2>

        {error && (

          <div className="alert alert-danger">

            {error}

          </div>

        )}

        <form onSubmit={handleSubmit}>

          <div className="mb-3">

            <label>Email</label>

            <input
              type="email"
              name="email"
              className="form-control"
              value={formData.email}
              onChange={handleChange}
              required
            />

          </div>

          <div className="mb-4">

            <label>Password</label>

            <input
              type="password"
              name="password"
              className="form-control"
              value={formData.password}
              onChange={handleChange}
              required
            />

          </div>

          <button
            className="btn btn-warning w-100"
            disabled={loading}
          >

            {loading
              ? "Logging In..."
              : "Login"}

          </button>

        </form>

      </div>

    </div>

  );

}

export default Login;