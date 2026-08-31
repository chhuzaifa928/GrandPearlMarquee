import { FaTrash } from "react-icons/fa";
import "./Contact.css";

import {
  getMessages,
  deleteMessage,
} from "../../services/contactService";

import { useToast } from "../../hooks/useToast";
import { useConfirm } from "../../hooks/useConfirm";

import useFetch from "../../hooks/useFetch";

function Contact() {
  const toast = useToast();
  const confirm = useConfirm();

  const { data: messagesData, loading, refetch } = useFetch(getMessages);

  const messages = messagesData ?? [];

  const handleDelete = async (id) => {
    const ok = await confirm({
      title: "Delete message?",
      message: "Are you sure you want to delete this contact message?",
    });

    if (!ok) return;

    try {
      await deleteMessage(id);

      toast.success("Message deleted successfully.");

      refetch();
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) {
    return (
      <div className="text-center py-5">
        <div
          className="spinner-border text-warning"
          role="status"
        ></div>
      </div>
    );
  }

  return (
    <div className="container-fluid">

      <h2 className="fw-bold mb-4">
        Contact Messages
      </h2>

      <div className="card shadow-sm">

        <div className="card-body">

          <div className="contact-table-wrapper">

          <table className="table table-hover">

            <thead>

              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Subject</th>
                <th>Message</th>
                <th>Date</th>
                <th width="90">Action</th>
              </tr>

            </thead>

            <tbody>

              {messages.length === 0 ? (

                <tr>
                  <td
                    colSpan="7"
                    className="text-center"
                  >
                    No contact messages found.
                  </td>
                </tr>

              ) : (

                messages.map((message) => (

                  <tr key={message.id}>

                    <td>{message.full_name}</td>

                    <td>{message.email}</td>

                    <td>{message.phone}</td>

                    <td>{message.subject}</td>

                    <td>{message.message}</td>

                    <td>
                      {new Date(
                        message.created_at
                      ).toLocaleDateString()}
                    </td>

                    <td>

                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() =>
                          handleDelete(message.id)
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

      </div>

    </div>
  );
}

export default Contact;