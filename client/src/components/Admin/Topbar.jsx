import { FaBars, FaUserCircle } from "react-icons/fa";

function Topbar({ setSidebarOpen }) {
  return (
    <header className="admin-topbar px-4 d-flex justify-content-between align-items-center">

      <div className="d-flex align-items-center">

        <button
          className="btn btn-outline-dark d-lg-none me-3"
          onClick={() => setSidebarOpen(true)}
        >
          <FaBars />
        </button>

        <h4 className="mb-0 fw-bold">
          Grand Pearl Admin
        </h4>

      </div>

      <div className="d-flex align-items-center">

        <FaUserCircle
          size={35}
          className="me-2"
        />

        <div>

          <strong>Administrator</strong>

          <br />

          <small className="text-muted">
            Grand Pearl Marquee
          </small>

        </div>

      </div>

    </header>
  );
}

export default Topbar;