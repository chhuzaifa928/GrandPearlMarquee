import { useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa";
import "./Contact.css";

import {
  getMessages,
  deleteMessage,
} from "../../services/contactService";

function Contact() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    const loadMessages = async () => {
      try {
        const data = await getMessages();

        if (!cancelled) setMessages(data);
      } catch (error) {
        console.error(error);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    loadMessages();

    return () => {
      cancelled = true;
    };
  }, []);

  const refreshMessages = async () => {
    try {
      const data = await getMessages();
      setMessages(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this message?")) return;

    try {
      await deleteMessage(id);

      alert("Message deleted successfully.");

      refreshMessages();
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