const { body, query } = require("express-validator");

const bookingValidator = [
  body("customer_name")
    .trim()
    .notEmpty()
    .withMessage("Customer name is required.")
    .isString()
    .withMessage("Customer name must be a string.")
    .isLength({ max: 100 })
    .withMessage("Customer name must be at most 100 characters."),

  body("email")
    .optional({ checkFalsy: true })
    .isEmail()
    .withMessage("Please enter a valid email address."),

  body("phone")
    .trim()
    .isLength({ min: 11, max: 15 })
    .withMessage("Please enter a valid phone number."),

  body("whatsapp")
    .trim()
    .isLength({ min: 11, max: 15 })
    .withMessage("Please enter a valid WhatsApp number."),

  body("city")
    .trim()
    .notEmpty()
    .withMessage("City is required.")
    .isString()
    .withMessage("City must be a string.")
    .isLength({ max: 100 })
    .withMessage("City must be at most 100 characters."),

  body("event_type")
    .notEmpty()
    .withMessage("Event type is required.")
    .isString()
    .withMessage("Event type must be a string.")
    .isLength({ max: 100 })
    .withMessage("Event type must be at most 100 characters."),

  body("event_date")
    .notEmpty()
    .withMessage("Event date is required.")
    .isString()
    .withMessage("Event date must be a string.")
    .trim()
    .matches(/^\d{4}-\d{2}-\d{2}$/)
    .withMessage("Event date must be in YYYY-MM-DD format.")
    .custom((value) => {
      const date = new Date(value + "T00:00:00Z");
      if (isNaN(date.getTime()) || date.toISOString().slice(0, 10) !== value) {
        throw new Error("Event date must be a valid date (YYYY-MM-DD).");
      }

      const now = new Date();
      const today =
        now.getFullYear() +
        "-" +
        String(now.getMonth() + 1).padStart(2, "0") +
        "-" +
        String(now.getDate()).padStart(2, "0");

      if (value < today) {
        throw new Error("Event date cannot be in the past.");
      }

      return true;
    }),

  body("event_time")
    .notEmpty()
    .withMessage("Event time is required.")
    .isString()
    .withMessage("Event time must be a string.")
    .isLength({ max: 50 })
    .withMessage("Event time must be at most 50 characters.")
    .isIn(["Afternoon", "Night"])
    .withMessage("Event time must be Afternoon or Night."),

  body("guests")
    .isInt({ min: 1, max: 1000 })
    .withMessage("Guests must be between 1 and 1000."),

  body("male_guests")
    .isInt({ min: 0, max: 1000 })
    .withMessage("Male guests must be between 0 and 1000."),

  body("female_guests")
  .isInt({ min: 0, max: 1000 })
  .withMessage("Female guests must be between 0 and 1000.")
  .custom((value, { req }) => {
    const totalGuests = Number(req.body.guests);
    const maleGuests = Number(req.body.male_guests);
    const femaleGuests = Number(value);

    if (
      Number.isInteger(totalGuests) &&
      Number.isInteger(maleGuests) &&
      Number.isInteger(femaleGuests) &&
      maleGuests + femaleGuests !== totalGuests
    ) {
      throw new Error(
        "Male and female guests must equal total guests."
      );
    }

    return true;
  }),

  body("vip_guests")
    .isInt({ min: 0, max: 1000 })
    .withMessage("VIP guests must be between 0 and 1000.")
    .custom((value, { req }) => {
      const totalGuests = Number(req.body.guests);
      const vipGuests = Number(value);
      if (Number.isInteger(totalGuests) && Number.isInteger(vipGuests) && vipGuests > totalGuests) {
        throw new Error("VIP guests cannot exceed total guests.");
      }
      return true;
    }),

  body("male_vip")
    .isInt({ min: 0, max: 1000 })
    .withMessage("Male VIP guests must be between 0 and 1000."),

  body("female_vip")
    .isInt({ min: 0, max: 1000 })
    .withMessage("Female VIP guests must be between 0 and 1000.")
    .custom((value, { req }) => {
      const vipGuests = Number(req.body.vip_guests);
      const maleVip = Number(req.body.male_vip);
      const femaleVip = Number(value);
      if (Number.isInteger(vipGuests) && Number.isInteger(maleVip) && Number.isInteger(femaleVip) && maleVip + femaleVip !== vipGuests) {
        throw new Error("Male and female VIP guests must equal total VIP guests.");
      }
      return true;
    }),

 body("food_category")
  .notEmpty()
  .withMessage("Food category is required.")
  .isString()
  .withMessage("Food category must be a string.")
  .isLength({ max: 100 })
  .withMessage("Food category must be at most 100 characters."),

body("custom_food")
  .optional({ checkFalsy: true })
  .trim()
  .isLength({ max: 2000 })
  .withMessage("Custom food requirements are too long.")
  .custom((value, { req }) => {
    if (
      req.body.food_category === "Custom" &&
      !value
    ) {
      throw new Error(
        "Please enter your custom food requirements."
      );
    }

    return true;
  }),

  
  body("decor_theme")
    .notEmpty()
    .withMessage("Decor theme is required.")
    .isString()
    .withMessage("Decor theme must be a string.")
    .isLength({ max: 200 })
    .withMessage("Decor theme must be at most 200 characters."),

  body("additional_requirements")
    .optional({ checkFalsy: true })
    .isString()
    .withMessage("Additional requirements must be a string.")
    .trim()
    .isLength({ max: 2000 })
    .withMessage("Additional requirements must be at most 2000 characters."),

  body("partition_required")
    .optional()
    .isBoolean({ strict: true })
    .withMessage("Partition required must be a boolean."),

  body("sound_system")
    .optional()
    .isBoolean({ strict: true })
    .withMessage("Sound system must be a boolean."),

  body("ac_required")
    .optional()
    .isBoolean({ strict: true })
    .withMessage("AC required must be a boolean."),

  body("heater_required")
    .optional()
    .isBoolean({ strict: true })
    .withMessage("Heater required must be a boolean."),
];

// =====================================
// Slot availability (GET /availability)
// =====================================
// Reuses the same event_date/event_time validation conventions as the
// booking POST, applied to query parameters.

const availabilityValidator = [
  query("event_date")
    .notEmpty()
    .withMessage("Event date is required.")
    .isString()
    .withMessage("Event date must be a string.")
    .trim()
    .matches(/^\d{4}-\d{2}-\d{2}$/)
    .withMessage("Event date must be in YYYY-MM-DD format.")
    .custom((value) => {
      const date = new Date(value + "T00:00:00Z");
      if (isNaN(date.getTime()) || date.toISOString().slice(0, 10) !== value) {
        throw new Error("Event date must be a valid date (YYYY-MM-DD).");
      }

      const now = new Date();
      const today =
        now.getFullYear() +
        "-" +
        String(now.getMonth() + 1).padStart(2, "0") +
        "-" +
        String(now.getDate()).padStart(2, "0");

      if (value < today) {
        throw new Error("Event date cannot be in the past.");
      }

      return true;
    }),

  query("event_time")
    .notEmpty()
    .withMessage("Event time is required.")
    .isString()
    .withMessage("Event time must be a string.")
    .isLength({ max: 50 })
    .withMessage("Event time must be at most 50 characters.")
    .isIn(["Afternoon", "Night"])
    .withMessage("Event time must be Afternoon or Night."),
];

bookingValidator.availabilityValidator = availabilityValidator;

module.exports = bookingValidator;