import { useState, useEffect } from "react";

export function useAutoDismissAlerts(duration = 20000) {
  const [alerts, setAlerts] = useState({
    showSuccess: true,
    showInfo: true,
    showWarning: true,
    showError: true,
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setAlerts({
        showSuccess: false,
        showInfo: false,
        showWarning: false,
        showError: false,
      });
    }, duration);

    return () => clearTimeout(timer);
  }, [duration]);

  return [alerts, setAlerts];
}
