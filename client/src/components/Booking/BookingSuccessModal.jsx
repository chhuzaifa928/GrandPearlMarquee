import "./BookingSuccessModal.css";
import { FaCheckCircle } from "react-icons/fa";

function BookingSuccessModal({

    show,

    onClose,

}) {

    if (!show) return null;

    return (

        <div className="success-overlay">

            <div className="success-modal">

                <FaCheckCircle className="success-icon" />

                <h2>

                    Booking Submitted Successfully

                </h2>

                <p>

                    Thank you for choosing

                    <strong> Grand Pearl Marquee.</strong>

                </p>

                <p>

                    Our booking team will review your request

                    and contact you soon via WhatsApp.

                </p>

                <button

                    className="btn btn-gold"

                    onClick={onClose}

                >

                    Close

                </button>

            </div>

        </div>

    );

}

export default BookingSuccessModal;