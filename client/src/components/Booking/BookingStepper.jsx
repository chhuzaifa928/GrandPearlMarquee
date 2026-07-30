import "./BookingStepper.css";

import {
  FaUser,
  FaCalendarAlt,
  FaUsers,
  FaChair,
  FaPalette,
  FaUtensils,
  FaConciergeBell,
  FaClipboardCheck,
  FaCheck,
} from "react-icons/fa";

function BookingStepper({ step = 1 }) {

  const steps = [

    {
      title: "Customer",
      icon: <FaUser />,
    },

    {
      title: "Event",
      icon: <FaCalendarAlt />,
    },

    {
      title: "Guests",
      icon: <FaUsers />,
    },

    {
      title: "Arrange",
      icon: <FaChair />,
    },

    {
      title: "Decor",
      icon: <FaPalette />,
    },

    {
      title: "Food",
      icon: <FaUtensils />,
    },

    {
      title: "Extras",
      icon: <FaConciergeBell />,
    },

    {
      title: "Review",
      icon: <FaClipboardCheck />,
    },

  ];

  const percentage = ((step - 1) / (steps.length - 1)) * 100;

  return (

    <section className="booking-stepper">

      <div className="container">

        <div className="stepper-header">

          <h2>Book Your Event</h2>

          <p>

            Complete each step to submit your booking request.

          </p>

        </div>

        {/* Mobile Progress */}

        <div className="mobile-progress">

          <div className="mobile-progress-info">

            Step {step} of {steps.length}

          </div>

          <div className="mobile-bar">

            <div
              className="mobile-fill"
              style={{ width: `${percentage}%` }}
            ></div>

          </div>

        </div>

        {/* Desktop Stepper */}

        <div className="stepper-wrapper">

          {steps.map((item, index) => {

            const current = step === index + 1;

            const completed = step > index + 1;

            return (

              <div
                key={index}
                className={`step-item
                ${current ? "current" : ""}
                ${completed ? "completed" : ""}
                `}
              >

                {index !== steps.length - 1 && (

                  <div
                    className={`step-line ${
                      completed ? "filled" : ""
                    }`}
                  ></div>

                )}

                <div className="step-circle">

                  {completed ? <FaCheck /> : item.icon}

                </div>

                <span>

                  {item.title}

                </span>

              </div>

            );

          })}

        </div>

      </div>

    </section>

  );

}

export default BookingStepper;