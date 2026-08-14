// ===============================
// CUSTOMER INFORMATION
// ===============================

export const validateCustomer = (data) => {

  const errors = {};

  if (!data.fullName.trim()) {
    errors.fullName = "Full Name is required.";
  }

  if (!data.phone.trim()) {
    errors.phone = "Phone Number is required.";
  }

  if (!data.whatsapp.trim()) {
    errors.whatsapp = "WhatsApp Number is required.";
  }

  if (!data.city.trim()) {
    errors.city = "City is required.";
  }

  return errors;
};

// ===============================
// EVENT INFORMATION
// ===============================

export const validateEvent = (data) => {
  const errors = {};

  if (!data.eventType) {
    errors.eventType = "Please select an event type.";
  }

  if (
    data.eventType === "Other / Custom Event" &&
    !data.customEventType?.trim()
  ) {
    errors.eventType = "Please enter your event type.";
  }

  if (!data.eventDate) {
    errors.eventDate = "Please select an event date.";
  }

  if (!data.eventTime) {
    errors.eventTime = "Please select a time slot.";
  }

  return errors;
};

// ===============================
// GUEST INFORMATION
// ===============================

export const validateGuests = (data) => {

  const errors = {};

  if (!data.totalGuests) {
    errors.totalGuests = "Total Guests are required.";
  }

  if (!data.maleGuests) {
    errors.maleGuests = "Male Guests are required.";
  }

  if (!data.femaleGuests) {
    errors.femaleGuests = "Female Guests are required.";
  }

  const total = Number(data.totalGuests);

  const male = Number(data.maleGuests);

  const female = Number(data.femaleGuests);

  if (
    total &&
    male &&
    female &&
    male + female !== total
  ) {
    errors.totalGuests =
      "Total Guests must equal Male + Female Guests.";
  }

  return errors;
};

// ===============================
// ARRANGEMENT
// ===============================

export const validateArrangement = (data) => {

  const errors = {};

  if (!data.partition) {
    errors.partition = "Please select Yes or No.";
  }

  return errors;
};

// ===============================
// DECOR
// ===============================

export const validateDecor = (data) => {

  const errors = {};

  if (!data.decorId) {
    errors.decorId = "Please select a decor package.";
  }

  return errors;
};

// ===============================
// FOOD
// ===============================

export const validateFood = (data) => {
  const errors = {};

  // No food selected
  if (!data.foodId) {
    errors.foodId = "Please select a food menu.";
    return errors;
  }

  // Custom food selected
  if (
    data.foodId === "custom" &&
    !data.custom_food?.trim()
  ) {
    errors.custom_food =
      "Please enter your custom food requirements.";
  }

  return errors;
};