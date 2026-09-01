// =====================================
// Phone / WhatsApp Normalization
// =====================================
//
// Strips formatting characters (spaces, +, -, brackets,
// etc.) from a stored phone/WhatsApp value so it can be
// used in tel: and wa.me URLs.
//
export function normalizePhone(value) {
  if (!value) return "";
  return String(value).replace(/\D/g, "");
}
