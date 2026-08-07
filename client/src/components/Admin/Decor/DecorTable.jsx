import { FaTrash, FaEdit } from "react-icons/fa";

function DecorTable({
  decor = [],
  onEdit,
  onDelete,
}) {
  if (decor.length === 0) {
    return (
      <div className="alert alert-info mt-4">
        No decor found.
      </div>
    );
  }

  return (
    <div className="table-responsive mt-4">

      <table className="table table-bordered table-hover align-middle">

        <thead className="table-dark">

          <tr>
            <th width="100">Image</th>
            <th>Category</th>
            <th>Title</th>
            <th>Description</th>
            <th width="150">Actions</th>
          </tr>

        </thead>

        <tbody>

          {decor.map((item) => (

            <tr key={item.id}>

              <td>

                <img
                  src={`http://localhost:5000${item.image}`}
                  alt={item.title}
                  style={{
                    width: "80px",
                    height: "60px",
                    objectFit: "cover",
                    borderRadius: "6px",
                  }}
                />

              </td>

              <td>{item.category}</td>

              <td>{item.title}</td>

              <td>{item.description}</td>

              <td>

                <button
                  className="btn btn-warning btn-sm me-2"
                  onClick={() => onEdit(item)}
                >
                  <FaEdit />
                </button>

                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => onDelete(item.id)}
                >
                  <FaTrash />
                </button>

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
}

export default DecorTable;