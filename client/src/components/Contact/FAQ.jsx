import "./FAQ.css";

function FAQ() {

  const faqs = [
    {
      question: "How can I book an event?",
      answer:
        "You can book through our Booking page or contact our team directly."
    },
    {
      question: "Can I customise the décor?",
      answer:
        "Yes. We offer multiple décor themes and customised event decorations."
    },
    {
      question: "Do you provide catering?",
      answer:
        "Yes. We provide complete catering services with multiple food packages."
    },
    {
      question: "How early should I book?",
      answer:
        "We recommend booking as early as possible to secure your preferred date."
    }
  ];

  return (
    <section className="faq-section">

      <div className="container">

        <div
          className="section-heading"
          data-aos="fade-up"
        >
          <span>FREQUENTLY ASKED QUESTIONS</span>

          <h2>Need Help?</h2>

          <p>
            Here are answers to some common questions.
          </p>

        </div>

        <div
          className="accordion"
          id="faqAccordion"
        >

          {faqs.map((faq, index) => (

            <div
              className="accordion-item"
              key={index}
            >

              <h2 className="accordion-header">

                <button
                  className={`accordion-button ${index !== 0 ? "collapsed" : ""}`}
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target={`#faq${index}`}
                >
                  {faq.question}
                </button>

              </h2>

              <div
                id={`faq${index}`}
                className={`accordion-collapse collapse ${index === 0 ? "show" : ""}`}
                data-bs-parent="#faqAccordion"
              >

                <div className="accordion-body">
                  {faq.answer}
                </div>

              </div>

            </div>

          ))}

        </div>

      </div>

    </section>
  );
}

export default FAQ;