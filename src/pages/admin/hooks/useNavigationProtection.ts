
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

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
  useEffect(() => {
    const unblock = navigate((to) => {
      if (isDirty && to.pathname !== location.pathname) {
        const userChoice = window.confirm(
          "You have unsaved changes. Are you sure you want to leave?"
        );
        return userChoice;
      }
      return true;
    });

    return () => {
      if (unblock) unblock();
    };
  }, [isDirty, navigate, location.pathname]);
}
