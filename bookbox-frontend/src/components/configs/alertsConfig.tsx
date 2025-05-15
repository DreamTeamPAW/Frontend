// alertsConfig.ts
export type AlertType = "success" | "info" | "warning" | "error";

export const ALERT_TYPES: AlertType[] = [
  "success",
  "info",
  "warning",
  "error",
];

export interface AlertState {
  show: boolean;
  text: string;
}

export type AlertsState = Record<AlertType, AlertState>;

export const defaultAlertsState: AlertsState = {
  success: { show: false, text: "Success - Everything went smoothly!" },
  info: { show: false, text: "Info - This is some information for you." },
  warning: { show: false, text: "Warning - Be careful with this next step." },
  error: { show: false, text: "Error - Something went wrong." },
};
