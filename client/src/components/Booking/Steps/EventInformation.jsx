import { useEffect, useRef, useState } from "react";
import "./EventInformation.css";
import { validateEvent } from "../../../utils/bookingValidation";

const EVENT_TYPES = [
  "Barat",
  "Walima",
  "Mehndi",
  "Nikkah",
  "Birthday",
  "Corporate",
  "Gathering",
  "Other / Custom Event",
];

const TIME_SLOTS = [
  "Afternoon",
  "Evening",
  "Night",
];

const WEEKDAYS = [
  "Su",
  "Mo",
  "Tu",
  "We",
  "Th",
  "Fr",
  "Sa",
];

const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const DAY_NAMES = [
  "Sun",
  "Mon",
  "Tue",
  "Wed",
  "Thu",
  "Fri",
  "Sat",
];

function toValue(y, m, d) {
  return `${y}-${String(m).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
}

function fromValue(value) {
  if (!value) return null;

  const parts = value.split("-").map(Number);

  if (
    parts.length !== 3 ||
    !parts[0] ||
    !parts[1] ||
    !parts[2]
  ) {
    return null;
  }

  return {
    y: parts[0],
    m: parts[1],
    d: parts[2],
  };
}

function buildDays(y, m) {
  const first = new Date(y, m - 1, 1).getDay();
  const total = new Date(y, m, 0).getDate();

  const days = [];

  for (let i = 0; i < 42; i++) {
    const day = i - first + 1;

    if (day >= 1 && day <= total) {
      days.push({
        y,
        m,
        d: day,
        inMonth: true,
      });
    } else {
      const dt = new Date(y, m - 1, day);

      days.push({
        y: dt.getFullYear(),
        m: dt.getMonth() + 1,
        d: dt.getDate(),
        inMonth: false,
      });
    }
  }

  return days;
}

function formatDisplay(y, m, d) {
  const day = new Date(y, m - 1, d);

  return `${DAY_NAMES[day.getDay()]}, ${String(d).padStart(
    2,
    "0"
  )} ${MONTHS[m - 1].slice(0, 3)} ${y}`;
}


// ============================================
// CUSTOM SELECT MENU
// ============================================

function SelectMenu({
  label,
  placeholder,
  options,
  value,
  onChange,
  error,
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    if (!open) return;

    const onDoc = (e) => {
      if (
        ref.current &&
        !ref.current.contains(e.target)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener(
      "mousedown",
      onDoc
    );

    return () => {
      document.removeEventListener(
        "mousedown",
        onDoc
      );
    };
  }, [open]);

  const select = (val) => {
    onChange(val);
    setOpen(false);
  };

  return (
    <div
      className="custom-select"
      ref={ref}
    >

      <label className="form-label">
        {label}{" "}
        <span className="required">*</span>
      </label>

      <button
        type="button"
        className={`custom-select-trigger ${
          error ? "input-error" : ""
        }`}
        onClick={() =>
          setOpen((o) => !o)
        }
      >

        <span
          className={
            value ? "" : "placeholder"
          }
        >
          {value || placeholder}
        </span>

        <span className="custom-select-arrow">
          {open ? "▲" : "▼"}
        </span>

      </button>

      {open && (
        <ul className="custom-select-menu">

          <li
            className={`custom-option ${
              !value ? "selected" : ""
            }`}
            onClick={() =>
              select("")
            }
          >
            {placeholder}
          </li>

          {options.map((opt) => (

            <li
              key={opt}
              className={`custom-option ${
                value === opt
                  ? "selected"
                  : ""
              }`}
              onClick={() =>
                select(opt)
              }
            >
              {opt}
            </li>

          ))}

        </ul>
      )}

      {error && (
        <p className="error-text">
          {error}
        </p>
      )}

    </div>
  );
}


// ============================================
// DATE PICKER
// ============================================

function DatePicker({
  label,
  value,
  onChange,
  error,
}) {
  const [open, setOpen] = useState(false);

  const ref = useRef(null);

  const parts = fromValue(value);

  // ============================================
  // TODAY
  // ============================================

  const today = new Date();

  today.setHours(0, 0, 0, 0);

  // ============================================
  // CALENDAR VIEW
  // ============================================

  const [viewY, setViewY] = useState(
    parts
      ? parts.y
      : today.getFullYear()
  );

  const [viewM, setViewM] = useState(
    parts
      ? parts.m
      : today.getMonth() + 1
  );

  // ============================================
  // CLOSE WHEN CLICKING OUTSIDE
  // ============================================

  useEffect(() => {
    if (!open) return;

    const onDoc = (e) => {
      if (
        ref.current &&
        !ref.current.contains(e.target)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener(
      "mousedown",
      onDoc
    );

    return () => {
      document.removeEventListener(
        "mousedown",
        onDoc
      );
    };
  }, [open]);

  // ============================================
  // OPEN CALENDAR
  // ============================================

  const openCalendar = () => {
    const p = fromValue(value);

    if (p) {
      setViewY(p.y);
      setViewM(p.m);
    } else {
      setViewY(today.getFullYear());
      setViewM(today.getMonth() + 1);
    }

    setOpen(true);
  };

  // ============================================
  // CHECK PAST DATE
  // ============================================

  const isPastDate = (y, m, d) => {
    const date = new Date(y, m - 1, d);

    date.setHours(0, 0, 0, 0);

    return date < today;
  };

  // ============================================
  // PREVIOUS MONTH
  // ============================================

  const prevMonth = () => {
    if (
      viewY === today.getFullYear() &&
      viewM === today.getMonth() + 1
    ) {
      return;
    }

    if (viewM === 1) {
      setViewM(12);
      setViewY(viewY - 1);
    } else {
      setViewM(viewM - 1);
    }
  };

  // ============================================
  // NEXT MONTH
  // ============================================

  const nextMonth = () => {
    if (viewM === 12) {
      setViewM(1);
      setViewY(viewY + 1);
    } else {
      setViewM(viewM + 1);
    }
  };

  const days = buildDays(
    viewY,
    viewM
  );

  const isCurrentMonth =
    viewY === today.getFullYear() &&
    viewM === today.getMonth() + 1;

  return (
    <div
      className="custom-date"
      ref={ref}
    >

      <label className="form-label">
        {label}{" "}
        <span className="required">*</span>
      </label>

      <button
        type="button"
        className={`custom-date-trigger ${
          error ? "input-error" : ""
        }`}
        onClick={openCalendar}
      >

        <span
          className={
            parts ? "" : "placeholder"
          }
        >
          📅{" "}
          {parts
            ? formatDisplay(
                parts.y,
                parts.m,
                parts.d
              )
            : "Select Date"}
        </span>

      </button>

      {open && (
        <div className="custom-calendar">

          <div className="cal-header">

            <button
              type="button"
              className="cal-nav"
              onClick={prevMonth}
              disabled={isCurrentMonth}
            >
              ‹
            </button>

            <span className="cal-title">
              {MONTHS[viewM - 1]}{" "}
              {viewY}
            </span>

            <button
              type="button"
              className="cal-nav"
              onClick={nextMonth}
            >
              ›
            </button>

          </div>

          <div className="cal-weekdays">

            {WEEKDAYS.map((w) => (
              <span key={w}>
                {w}
              </span>
            ))}

          </div>

          <div className="cal-grid">

            {days.map((d, i) => {

              const disabled =
                isPastDate(
                  d.y,
                  d.m,
                  d.d
                );

              return (
                <button
                  key={i}
                  type="button"
                  disabled={disabled}
                  className={`cal-day ${
                    !d.inMonth
                      ? "outside"
                      : ""
                  } ${
                    disabled
                      ? "disabled"
                      : ""
                  } ${
                    parts &&
                    parts.y === d.y &&
                    parts.m === d.m &&
                    parts.d === d.d
                      ? "selected"
                      : ""
                  }`}
                  onClick={() => {

                    if (disabled) {
                      return;
                    }

                    onChange(
                      toValue(
                        d.y,
                        d.m,
                        d.d
                      )
                    );

                    setOpen(false);

                  }}
                >
                  {d.d}
                </button>
              );

            })}

          </div>

        </div>
      )}

      {error && (
        <p className="error-text">
          {error}
        </p>
      )}

    </div>
  );
}


// ============================================
// EVENT INFORMATION
// ============================================

function EventInformation({
  formData,
  setFormData,
  nextStep,
  prevStep,
  errors,
  setErrors,
}) {

  // ============================================
  // GENERAL CHANGE
  // ============================================

  const handleChange = (e) => {

    const {
      name,
      value,
    } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name]) {

      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));

    }

  };


  // ============================================
  // EVENT TYPE CHANGE
  // ============================================

  const handleEventTypeChange = (value) => {

    if (
      value === "Other / Custom Event"
    ) {

      // Keep the special option in eventType
      // so React knows the custom input must remain visible.

      setFormData((prev) => ({
        ...prev,
        eventType:
          "Other / Custom Event",
        customEventType:
          prev.customEventType || "",
      }));

    } else {

      // Normal event selected

      setFormData((prev) => ({
        ...prev,
        eventType: value,
        customEventType: "",
      }));

    }

    setErrors((prev) => ({
      ...prev,
      eventType: "",
    }));

  };


  // ============================================
  // CUSTOM EVENT TYPE CHANGE
  // ============================================

  const handleCustomEventChange = (e) => {

    const value =
      e.target.value;

    setFormData((prev) => ({
      ...prev,

      // Keep special option selected
      eventType:
        "Other / Custom Event",

      // Store user's actual event
      customEventType: value,
    }));

    if (errors.eventType) {

      setErrors((prev) => ({
        ...prev,
        eventType: "",
      }));

    }

  };


  // ============================================
  // NEXT
  // ============================================

  const handleNext = () => {

    const validationErrors =
      validateEvent(formData);

    setErrors(validationErrors);

    if (
      Object.keys(
        validationErrors
      ).length === 0
    ) {

      nextStep();

    }

  };


  // ============================================
  // CUSTOM EVENT SELECTED?
  // ============================================

  const isCustomEvent =
    formData.eventType ===
    "Other / Custom Event";


  return (
    <div className="booking-card">

      <h2>
        Event Information
      </h2>

      <p>
        Tell us about your event.
      </p>

      <div className="row">

        {/* =================================
            EVENT TYPE
        ================================= */}

        <div className="col-md-4 mb-4">

          <SelectMenu
            label="Event Type"
            placeholder="Select Event"
            options={EVENT_TYPES}
            value={
              formData.eventType
            }
            onChange={
              handleEventTypeChange
            }
            error={
              errors.eventType
            }
          />

          {/* =================================
              CUSTOM EVENT INPUT
          ================================= */}

          {isCustomEvent && (

            <div className="mt-3">

              <label className="form-label">

                Enter Your Event Type{" "}

                <span className="required">
                  *
                </span>

              </label>

              <input
                type="text"
                className={`form-control ${
                  errors.eventType
                    ? "input-error"
                    : ""
                }`}
                placeholder="e.g. Dholki, Anniversary, Baby Shower"
                value={
                  formData.customEventType ||
                  ""
                }
                onChange={
                  handleCustomEventChange
                }
              />

              {errors.eventType && (

                <p className="error-text">
                  {errors.eventType}
                </p>

              )}

            </div>

          )}

        </div>


        {/* =================================
            DATE
        ================================= */}

        <div className="col-md-4 mb-4">

          <DatePicker
            label="Event Date"
            value={
              formData.eventDate
            }
            onChange={(value) =>
              handleChange({
                target: {
                  name:
                    "eventDate",
                  value,
                },
              })
            }
            error={
              errors.eventDate
            }
          />

        </div>


        {/* =================================
            TIME
        ================================= */}

        <div className="col-md-4 mb-4">

          <SelectMenu
            label="Time Slot"
            placeholder="Select Time"
            options={
              TIME_SLOTS
            }
            value={
              formData.eventTime
            }
            onChange={(value) =>
              handleChange({
                target: {
                  name:
                    "eventTime",
                  value,
                },
              })
            }
            error={
              errors.eventTime
            }
          />

        </div>

      </div>


      {/* =================================
          NAVIGATION
      ================================= */}

      <div className="d-flex justify-content-between">

        <button
          type="button"
          className="btn btn-secondary"
          onClick={prevStep}
        >
          ← Previous
        </button>

        <button
          type="button"
          className="btn btn-gold"
          onClick={handleNext}
        >
          Next →
        </button>

      </div>

    </div>
  );
}

export default EventInformation;