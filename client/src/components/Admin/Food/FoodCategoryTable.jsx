import { FaTrash } from "react-icons/fa";

function FoodCategoryTable({
  categories = [],
  onDelete,
}) {
  return (
    <div className="card shadow-sm mb-4">

      <div className="card-header">
        <h4>Food Categories</h4>
      </div>

      <div className="card-body">

        <table className="table table-hover">

          <thead>

            <tr>
              <th>ID</th>
              <th>Category</th>
              <th width="100">Action</th>
            </tr>

          </thead>

          <tbody>

            {categories.map((category) => (

              <tr key={category.id}>

                <td>{category.id}</td>

                <td>{category.category_name}</td>

                <td>

                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() =>
                      onDelete(category.id)
                    }
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

export default FoodCategoryTable;