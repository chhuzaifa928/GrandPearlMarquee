
require("dotenv").config();

const app = require("./app");
require("./config/db");

const PORT = process.env.PORT || 5000;

// Fatal process-level failure handling.
// These terminate the process because the application state after such
// a failure is unsafe to continue serving from.

process.on("unhandledRejection", (reason) => {
  console.error("❌ Unhandled Promise Rejection:", reason);
  process.exit(1);
});

process.on("uncaughtException", (error) => {
  console.error("❌ Uncaught Exception:", error);
  process.exit(1);
});

const server = app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});

server.on("error", (error) => {
  console.error("❌ Server failed to start:", error);
  process.exit(1);
});