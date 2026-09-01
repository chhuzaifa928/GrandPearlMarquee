import { SERVER_URL } from "../config/api";

// =====================================
// Media URL Helper
// =====================================
//
// Resolves a stored media path into a usable
// image/video URL. Handles:
//   - null / undefined / empty string -> ""
//   - full http:// or https:// URLs    -> unchanged
//   - /uploads/... backend files       -> prefixed with SERVER_URL
//   - /src/... and /assets/... Vite assets -> unchanged
//   - other leading-slash paths        -> unchanged
//   - bare paths (no leading slash)    -> SERVER_URL + "/" + path
//
export default function getMediaUrl(value) {
  if (!value) return "";

  if (
    value.startsWith("http://") ||
    value.startsWith("https://")
  ) {
    return value;
  }

  if (value.startsWith("/uploads/")) {
    return `${SERVER_URL}${value}`;
  }

  if (
    value.startsWith("/src/") ||
    value.startsWith("/assets/") ||
    value.startsWith("/")
  ) {
    return value;
  }

  return `${SERVER_URL}/${value}`;
}
