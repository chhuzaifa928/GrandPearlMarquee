import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import CustomerInformation from "./Steps/CustomerInformation";
import EventInformation from "./Steps/EventInformation";
import GuestInformation from "./Steps/GuestInformation";
import EventArrangement from "./Steps/EventArrangement";
import DecorSelection from "./Steps/DecorSelection";
import FoodSelection from "./Steps/FoodSelection";
import ExtraServices from "./Steps/ExtraServices";
import ReviewBooking from "./Steps/ReviewBooking";

import "./BookingWizard.css";

function BookingWizard({

  step,

  setStep,

}) {

  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({

    // Customer
    fullName: "",
    phone: "",
    whatsapp: "",
    email: "",
    city: "",

    // Event
eventType: "",
customEventType: "",
eventDate: "",
eventTime: "",

    // Guests
    totalGuests: "",
    maleGuests: "",
    maleVIP: "",
    femaleGuests: "",
    femaleVIP: "",

    // Arrangement
    partition: "",

    // Packages
    decorId: "",
    foodId: "",

    // Extras
    extras: [],

    // Notes
    notes: "",

  });

  const nextStep = () => {

    if (step < 8) {

      setStep(step + 1);

    }

  };

  const prevStep = () => {

    if (step > 1) {

      setStep(step - 1);

    }

  };

  const pageVariants = {

    initial: {
      opacity: 0,
      x: 60,
    },

    animate: {
      opacity: 1,
      x: 0,
    },

    exit: {
      opacity: 0,
      x: -60,
    },

  };

  const pageTransition = {

    duration: 0.35,

  };

  return (

    <section className="booking-wizard">

      <div className="container">

        <AnimatePresence mode="wait">

          <motion.div
            key={step}
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={pageTransition}
          >

            {step === 1 && (

              <CustomerInformation
                formData={formData}
                setFormData={setFormData}
                nextStep={nextStep}
                errors={errors}
                setErrors={setErrors}
              />

            )}

            {step === 2 && (

              <EventInformation
                formData={formData}
                setFormData={setFormData}
                nextStep={nextStep}
                prevStep={prevStep}
                errors={errors}
                setErrors={setErrors}
              />

            )}

            {step === 3 && (

              <GuestInformation
                formData={formData}
                setFormData={setFormData}
                nextStep={nextStep}
                prevStep={prevStep}
                errors={errors}
                setErrors={setErrors}
              />

            )}

            {step === 4 && (

              <EventArrangement
                formData={formData}
                setFormData={setFormData}
                nextStep={nextStep}
                prevStep={prevStep}
                errors={errors}
                setErrors={setErrors}
              />

            )}

            {step === 5 && (

              <DecorSelection
                formData={formData}
                setFormData={setFormData}
                nextStep={nextStep}
                prevStep={prevStep}
                errors={errors}
                setErrors={setErrors}
              />

            )}

            {step === 6 && (

              <FoodSelection
                formData={formData}
                setFormData={setFormData}
                nextStep={nextStep}
                prevStep={prevStep}
                errors={errors}
                setErrors={setErrors}
              />

            )}

            {step === 7 && (

              <ExtraServices
                formData={formData}
                setFormData={setFormData}
                nextStep={nextStep}
                prevStep={prevStep}
              />

            )}

            {step === 8 && (

              <ReviewBooking
                formData={formData}
                prevStep={prevStep}
              />

            )}

          </motion.div>

        </AnimatePresence>

      </div>

    </section>

  );

}

export default BookingWizard;