import "./ScrollToTopButton.css";
import { FaArrowUp } from "react-icons/fa";
import { useEffect, useState } from "react";

function ScrollToTopButton() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShow(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <button
      className={`scroll-top ${show ? "show" : ""}`}
      onClick={scrollTop}
      aria-label="Scroll to top"
    >
      <FaArrowUp />
    </button>
  );
}

export default ScrollToTopButton;