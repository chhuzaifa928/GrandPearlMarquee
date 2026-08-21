import { FaTrash } from "react-icons/fa";
import API_URL from "../../../config/api";

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

        <table className="table table-hover align-middle">

          <thead>

            <tr>
              <th>ID</th>
              <th>Image</th>
              <th>Category</th>
              <th width="100">Action</th>
            </tr>

          </thead>

          <tbody>

            {categories.length === 0 ? (

              <tr>
                <td colSpan="4" className="text-center">
                  No Categories Found
                </td>
              </tr>

            ) : (

              categories.map((category) => (

                <tr key={category.id}>

                  <td>{category.id}</td>

                  <td>

                    {category.image ? (

                      <img
                        src={`${API_URL}${category.image}`}
                        alt={category.category_name}
                        style={{
                          width: "80px",
                          height: "60px",
                          objectFit: "cover",
                          borderRadius: "8px",
                        }}
                      />

                    ) : (

                      <span className="text-muted">
                        No Image
                      </span>

                    )}

                  </td>

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

              ))

            )}

          </tbody>

        </table>

      </div>

    </div>
  );
}

export default FoodCategoryTable;