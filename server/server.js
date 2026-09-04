require("dotenv").config();

const app = require("./app");
const pool = require("./config/db");

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

// =====================================
// Graceful Shutdown (SIGTERM / SIGINT)
// =====================================
// On shutdown we stop accepting new HTTP connections, close the HTTP
// server, then close the MySQL pool before exiting cleanly. A force-exit
// timer guarantees the process never hangs indefinitely.

const SHUTDOWN_TIMEOUT_MS = 10000;
const KEEP_ALIVE_GRACE_MS = 5000;

let shuttingDown = false;

const shutdown = (signal) => {
  if (shuttingDown) return;
  shuttingDown = true;

  console.log(`🚦 ${signal} received, shutting down...`);

  // Never hang forever: force-exit if graceful shutdown stalls.
  const forceExitTimer = setTimeout(() => {
    console.error(
      `❌ Graceful shutdown timed out after ${SHUTDOWN_TIMEOUT_MS}ms, forcing exit.`
    );
    process.exit(1);
  }, SHUTDOWN_TIMEOUT_MS);
  forceExitTimer.unref();

  // Stop accepting new connections, then close the HTTP server.
  server.close(() => {
    // All requests have finished: close the MySQL pool and exit cleanly.
    pool.end((poolError) => {
      if (poolError) {
        console.error("❌ Error closing MySQL pool:", poolError.message);
      } else {
        console.log("✅ MySQL pool closed.");
      }

      console.log("✅ Server closed. Goodbye.");
      process.exit(0);
    });
  });

  // Give in-flight requests a short grace period, then force-close any
  // lingering keep-alive sockets so `server.close` can finish.
  setTimeout(() => {
    if (typeof server.closeAllConnections === "function") {
      server.closeAllConnections();
    }
  }, KEEP_ALIVE_GRACE_MS).unref();
};

process.on("SIGTERM", () => shutdown("SIGTERM"));
process.on("SIGINT", () => shutdown("SIGINT"));