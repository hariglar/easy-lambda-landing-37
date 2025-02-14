
import { useEffect } from "react";
import { useBlocker } from "react-router-dom";

export function useNavigationProtection(isDirty: boolean) {
  // Handle browser tab/window close
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (isDirty) {
        e.preventDefault();
        e.returnValue = "You have unsaved changes. Are you sure you want to leave?";
        return e.returnValue;
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [isDirty]);

  // Block navigation when dirty
  useBlocker(
    (tx) => {
      if (isDirty) {
        if (window.confirm("You have unsaved changes. Are you sure you want to leave?")) {
          tx.retry();
        }
      } else {
        tx.retry();
      }
    },
    isDirty
  );
}
