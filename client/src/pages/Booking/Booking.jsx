import { useState } from "react";

import BookingHero from "../../components/Booking/BookingHero";
import BookingStepper from "../../components/Booking/BookingStepper";
import BookingWizard from "../../components/Booking/BookingWizard";

function Booking() {

  const [step, setStep] = useState(1);

  return (
    <>
      <BookingHero />

      <BookingStepper step={step} />

      <BookingWizard
        step={step}
        setStep={setStep}
      />
    </>
  );
}

export default Booking;