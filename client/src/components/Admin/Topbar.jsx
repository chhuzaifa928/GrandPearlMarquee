import { FaUserCircle } from "react-icons/fa";

function Topbar() {
  return (
    <div
      className="bg-white shadow-sm d-flex justify-content-between align-items-center px-4"
      style={{
        height: "70px",
      }}
    >
      <h4 className="mb-0">
        Admin Dashboard
      </h4>

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

    </div>
  );
}

export default Topbar;