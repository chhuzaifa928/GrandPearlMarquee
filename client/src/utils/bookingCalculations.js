// ============================================
// GRAND PEARL BOOKING CALCULATIONS
// ============================================

// Current Guest Count

export const getCurrentGuestCount = (data) => {

  const male = Number(data.maleGuests) || 0;

  const female = Number(data.femaleGuests) || 0;

  return male + female;

};

// Remaining Guests

export const getRemainingGuests = (data) => {

  const total = Number(data.totalGuests) || 0;

  return total - getCurrentGuestCount(data);

};

// Recommended Tables

export const getRecommendedTables = (data) => {

  const total = Number(data.totalGuests) || 0;

  return Math.ceil(total / 10);

};

// Hall Capacity

export const checkHallCapacity = (data) => {

  const total = Number(data.totalGuests) || 0;

  const HALL_CAPACITY = 1000;

  return {

    capacity: HALL_CAPACITY,

    exceeded: total > HALL_CAPACITY,

  };

};

// Validation Status

export const isGuestCountCorrect = (data) => {

  return (

    Number(data.totalGuests) ===

    getCurrentGuestCount(data)

  );

};