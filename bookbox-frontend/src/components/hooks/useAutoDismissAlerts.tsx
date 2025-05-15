// useAutoDismissAlerts.ts
import { useState, useEffect, useRef } from "react";
import {
  AlertType,
  AlertsState,
  defaultAlertsState,
  ALERT_TYPES,
} from "@components/configs/alertsConfig";

export function useAutoDismissAlerts(
  duration = 20000
): [
  AlertsState,
  (type: AlertType, text?: string) => void,
  (type: AlertType) => void
] {
  const [alerts, setAlerts] = useState<AlertsState>({ ...defaultAlertsState });
  const timers = useRef<Record<AlertType, NodeJS.Timeout | null>>({
    success: null,
    info: null,
    warning: null,
    error: null,
  });

  // Show and set text for an alert, auto-dismiss after duration
  const triggerAlert = (type: AlertType, text?: string) => {
    setAlerts((prev) => ({
      ...prev,
      [type]: {
        show: true,
        text: text ?? prev[type].text,
      },
    }));

    // Clear any existing timer for this alert
    if (timers.current[type]) {
      clearTimeout(timers.current[type]!);
    }

    // Set new timer
    timers.current[type] = setTimeout(() => {
      setAlerts((prev) => ({
        ...prev,
        [type]: {
          ...prev[type],
          show: false,
        },
      }));
      timers.current[type] = null;
    }, duration);
  };

  // Optionally, allow manual close
  const closeAlert = (type: AlertType) => {
    setAlerts((prev) => ({
      ...prev,
      [type]: {
        ...prev[type],
        show: false,
      },
    }));
    if (timers.current[type]) {
      clearTimeout(timers.current[type]!);
      timers.current[type] = null;
    }
  };

  // Clean up timers on unmount
  useEffect(() => {
    return () => {
      ALERT_TYPES.forEach((type) => {
        if (timers.current[type]) {
          clearTimeout(timers.current[type]!);
        }
      });
    };
  }, []);

  return [alerts, triggerAlert, closeAlert];
}
