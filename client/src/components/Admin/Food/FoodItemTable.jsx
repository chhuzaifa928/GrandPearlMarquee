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

        <table className="table table-hover">

          <thead>

            <tr>
              <th>Category</th>
              <th>Item</th>
              <th>Description</th>
              <th width="120">Actions</th>
            </tr>

          </thead>

          <tbody>

            {items.map((item) => (

              <tr key={item.id}>

                <td>{item.category_name}</td>

                <td>{item.item_name}</td>

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

    </div>
  );
}

export default FoodItemTable;