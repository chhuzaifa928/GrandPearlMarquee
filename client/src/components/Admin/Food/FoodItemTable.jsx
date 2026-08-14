import { FaEdit, FaTrash } from "react-icons/fa";

function FoodItemTable({
  items = [],
  onEdit,
  onDelete,
}) {
  return (
    <div className="card shadow-sm">

      <div className="card-header">
        <h4>Food Items</h4>
      </div>

      <div className="card-body">

        <div
          className="table-responsive"
          style={{
            overflowX: "auto",
            WebkitOverflowScrolling: "touch",
          }}
        >

        <table
          className="table table-hover"
          style={{ minWidth: 600 }}
        >

          <thead>

            <tr>
              <th style={{ whiteSpace: "nowrap" }}>Category</th>
              <th style={{ whiteSpace: "nowrap" }}>Item</th>
              <th style={{ whiteSpace: "nowrap" }}>Description</th>
              <th width="120" style={{ whiteSpace: "nowrap" }}>Actions</th>
            </tr>

          </thead>

          <tbody>

            {items.map((item) => (

              <tr key={item.id}>

                <td style={{ whiteSpace: "nowrap" }}>{item.category_name}</td>

                <td style={{ whiteSpace: "nowrap" }}>{item.item_name}</td>

                <td>{item.description}</td>

                <td style={{ whiteSpace: "nowrap" }}>

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

      </div>

    </div>
  );
}

export default FoodItemTable;