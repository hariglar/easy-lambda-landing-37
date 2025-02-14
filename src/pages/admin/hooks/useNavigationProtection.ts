
import { useEffect, useCallback } from "react";
import { useLocation, useNavigate, useBlocker } from "react-router-dom";

export function useNavigationProtection(isDirty: boolean) {
  const location = useLocation();
  const navigate = useNavigate();

  // Handle browser tab/window close
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (isDirty) {
        const message = "You have unsaved changes. Are you sure you want to leave?";
        e.preventDefault();
        e.returnValue = message;
        return message;
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [isDirty]);

  // Handle in-app navigation
  const blocker = useCallback(
    ({ currentLocation, nextLocation, historyAction }) => {
      if (isDirty && currentLocation.pathname !== nextLocation.pathname) {
        const userResponse = window.confirm(
          "You have unsaved changes. Are you sure you want to leave?"
        );
        
        if (!userResponse) {
          return;
        }
      }
      return true;
    },
    [isDirty]
  );

  useBlocker(blocker);
}
