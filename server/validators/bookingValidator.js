const { body } = require("express-validator");

const bookingValidator = [
  body("customer_name")
    .trim()
    .notEmpty()
    .withMessage("Customer name is required."),

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
    .withMessage("City is required."),

  body("event_type")
    .notEmpty()
    .withMessage("Event type is required."),

  body("event_date")
    .notEmpty()
    .withMessage("Event date is required."),

  body("event_time")
    .notEmpty()
    .withMessage("Event time is required."),

  body("guests")
    .isInt({ min: 1 })
    .withMessage("Guests must be at least 1."),

  body("male_guests")
    .isInt({ min: 0 })
    .withMessage("Male guests cannot be negative."),

  body("female_guests")
  .isInt({ min: 0 })
  .withMessage("Female guests cannot be negative.")
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
    .isInt({ min: 0 })
    .withMessage("VIP guests cannot be negative."),

  body("male_vip")
    .isInt({ min: 0 })
    .withMessage("Male VIP guests cannot be negative."),

  body("female_vip")
    .isInt({ min: 0 })
    .withMessage("Female VIP guests cannot be negative."),

 body("food_category")
  .notEmpty()
  .withMessage("Food category is required."),

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
    .withMessage("Decor theme is required."),
];

module.exports = bookingValidator;