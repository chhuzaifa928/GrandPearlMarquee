const configuredApiUrl = import.meta.env.VITE_API_URL;

if (import.meta.env.PROD && !configuredApiUrl) {
  throw new Error(
    "VITE_API_URL is required for production builds. Set it before running the production build."
  );
}

export const SERVER_URL = configuredApiUrl || "http://localhost:5000";

export default SERVER_URL;