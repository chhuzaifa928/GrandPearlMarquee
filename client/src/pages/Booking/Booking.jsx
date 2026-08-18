import SEO from "../../components/SEO/SEO";

import { useState } from "react";

import BookingHero from "../../components/Booking/BookingHero";
import BookingStepper from "../../components/Booking/BookingStepper";
import BookingWizard from "../../components/Booking/BookingWizard";

function Booking() {
  const [step, setStep] = useState(1);

  return (
    <>
      <SEO
        title="Book Grand Pearl Marquee | Wedding & Event Venue Rawalpindi"
        description="Submit your booking request for Grand Pearl Marquee in Rawalpindi. Choose your event type, date, time, guests, food, décor and additional services."
        keywords="book Grand Pearl Marquee, wedding booking Rawalpindi, marquee booking Rawalpindi, event booking Rawalpindi, wedding hall booking"
      />

      <div className="booking-page">
        <BookingHero />

        <BookingStepper step={step} />

        <BookingWizard
          step={step}
          setStep={setStep}
        />
      </div>
    </>
  );
}

export default Booking;