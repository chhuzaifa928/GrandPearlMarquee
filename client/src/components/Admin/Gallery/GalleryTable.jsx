import { FaTrash } from "react-icons/fa";

function GalleryTable({
  gallery = [],
  onDelete,
}) {
  return (
    <div className="card shadow-sm">

      <div className="card-header">
        <h4>Gallery Items</h4>
      </div>

      <div className="card-body">

        <table className="table table-hover align-middle">

          <thead>

            <tr>
              <th width="120">Preview</th>
              <th>Title</th>
              <th>Type</th>
              <th width="100">Action</th>
            </tr>

          </thead>

          <tbody>

            {gallery.length === 0 ? (

              <tr>
                <td colSpan="4" className="text-center">
                  No gallery items found.
                </td>
              </tr>

            ) : (

              gallery.map((item) => (

                <tr key={item.id}>

                  <td>

                    {item.media_type === "image" ? (

                      <img
                        src={`http://localhost:5000${item.image}`}
                        alt={item.title}
                        style={{
                          width: "100px",
                          height: "70px",
                          objectFit: "cover",
                          borderRadius: "8px",
                        }}
                      />

                    ) : (

                      <video
                        src={`http://localhost:5000${item.image}`}
                        width="100"
                        height="70"
                        controls
                      />

                    )}

                  </td>

                  <td>{item.title}</td>

                  <td>
                    <span className="badge bg-warning text-dark">
                      {item.media_type}
                    </span>
                  </td>

                  <td>

                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => onDelete(item.id)}
                    >
                      <FaTrash />
                    </button>

                  </td>

                </tr>

              ))

            )}

          </tbody>

        </table>

      </div>

    </div>
  );
}

export default GalleryTable;