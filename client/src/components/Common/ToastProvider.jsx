import { useCallback, useState } from "react";

import { ToastContext } from "../../hooks/useToast";

let toastId = 0;

function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const dismiss = useCallback((id) => {
    setToasts((current) =>
      current.filter((toast) => toast.id !== id)
    );
  }, []);

  const show = useCallback(
    (message, type = "info", duration = 4000) => {
      const id = ++toastId;

      setToasts((current) => [
        ...current,
        { id, message, type },
      ]);

      if (duration > 0) {
        setTimeout(() => dismiss(id), duration);
      }
    },
    [dismiss]
  );

  const success = useCallback(
    (message, duration) => show(message, "success", duration),
    [show]
  );

  const error = useCallback(
    (message, duration) => show(message, "error", duration),
    [show]
  );

  const warning = useCallback(
    (message, duration) => show(message, "warning", duration),
    [show]
  );

  const info = useCallback(
    (message, duration) => show(message, "info", duration),
    [show]
  );

  return (
    <ToastContext.Provider
      value={{ show, success, error, warning, info }}
    >
      {children}

      <div
        className="toast-container toast-container-custom"
        aria-live="polite"
        aria-atomic="false"
      >
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`toast toast-${toast.type} show`}
            role={toast.type === "error" ? "alert" : "status"}
            aria-atomic="true"
          >
            <div className="toast-body-custom">
              <span
                className={`toast-icon toast-icon-${toast.type}`}
                aria-hidden="true"
              >
                {toast.type === "success"
                  ? "✓"
                  : toast.type === "error"
                  ? "✕"
                  : toast.type === "warning"
                  ? "!"
                  : "ℹ"}
              </span>

              <span className="toast-message">
                {toast.message}
              </span>

              <button
                type="button"
                className="toast-close"
                onClick={() => dismiss(toast.id)}
                aria-label="Dismiss notification"
              >
                ×
              </button>
            </div>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export default ToastProvider;
