import { useCallback, useState } from "react";

import { ConfirmContext } from "../../hooks/useConfirm";

function ConfirmProvider({ children }) {
  const [state, setState] = useState({
    open: false,
    title: "",
    message: "",
    confirmLabel: "Confirm",
    cancelLabel: "Cancel",
  });

  const [resolver, setResolver] = useState(null);

  const confirm = useCallback(
    (options = {}) => {
      return new Promise((resolve) => {
        setState({
          open: true,
          title: options.title || "Are you sure?",
          message: options.message || "",
          confirmLabel: options.confirmLabel || "Confirm",
          cancelLabel: options.cancelLabel || "Cancel",
        });

        setResolver(() => resolve);
      });
    },
    []
  );

  const handleClose = useCallback(() => {
    setState((current) => ({ ...current, open: false }));
    setResolver(null);
  }, []);

  const handleCancel = useCallback(() => {
    if (resolver) resolver(false);
    setState((current) => ({ ...current, open: false }));
    setResolver(null);
  }, [resolver]);

  const handleConfirm = useCallback(() => {
    if (resolver) resolver(true);
    setState((current) => ({ ...current, open: false }));
    setResolver(null);
  }, [resolver]);

  return (
    <ConfirmContext.Provider value={{ confirm }}>
      {children}

      {state.open && (
        <div
          className="confirm-overlay"
          onClick={handleClose}
          role="presentation"
        >
          <div
            className="confirm-dialog"
            role="alertdialog"
            aria-modal="true"
            aria-labelledby="confirm-title"
            aria-describedby="confirm-message"
            onClick={(e) => e.stopPropagation()}
          >
            <h4 id="confirm-title">
              {state.title}
            </h4>

            {state.message && (
              <p id="confirm-message">
                {state.message}
              </p>
            )}

            <div className="confirm-actions">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={handleCancel}
              >
                {state.cancelLabel}
              </button>

              <button
                type="button"
                className="btn btn-danger"
                onClick={handleConfirm}
                autoFocus
              >
                {state.confirmLabel}
              </button>
            </div>
          </div>
        </div>
      )}
    </ConfirmContext.Provider>
  );
}

export default ConfirmProvider;
