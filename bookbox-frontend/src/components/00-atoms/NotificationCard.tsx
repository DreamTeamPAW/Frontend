import React from "react";
import { CheckCircle } from "@phosphor-icons/react/dist/icons/CheckCircle"; 
import { Info } from "@phosphor-icons/react/dist/icons/Info"; 
import { Warning } from "@phosphor-icons/react/dist/icons/Warning"; 
import { XCircle } from "@phosphor-icons/react/dist/icons/XCircle"; 
import {
  alertSuccess,
  alertInfo,
  alertWarning,
  alertError,
  alertIcon,
  alertText,
} from "@/styles/classes";
import { IconProps } from "@phosphor-icons/react";

type AlertType = "success" | "info" | "warning" | "error";

interface AlertItem {
  type: AlertType;
  show: boolean;
  text: string;
}

const ICONS: Record<AlertType, React.ComponentType<IconProps>> = {
  success: CheckCircle,
  info: Info,
  warning: Warning,
  error: XCircle,
};

const ALERT_STYLES: Record<AlertType, string> = {
  success: alertSuccess,
  info: alertInfo,
  warning: alertWarning,
  error: alertError,
};

const NotificationCard = ({
  showSuccess = false,
  showInfo = false,
  showWarning = false,
  showError = false,
  successText = "Success - Everything went smoothly!",
  infoText = "Info - This is some information for you.",
  warningText = "Warning - Be careful with this next step.",
  errorText = "Error - Something went wrong.",
}) => {
  const alerts = [
    {
      type: "success",
      show: showSuccess,
      text: successText,
    },
    {
      type: "info",
      show: showInfo,
      text: infoText,
    },
    {
      type: "warning",
      show: showWarning,
      text: warningText,
    },
    {
      type: "error",
      show: showError,
      text: errorText,
    },
  ];

  return (
    <div className="space-y-2 p-4">
      {alerts
        .filter((alert) => alert.show)
        .map(({ type, text }) => {
          const Icon = ICONS[type as AlertType];
          return (
            <div key={type} role="alert" className={ALERT_STYLES[type as AlertType]}>
              <Icon size={20} weight="fill" className={alertIcon} aria-hidden="true" />
              <p className={alertText}>{text}</p>
            </div>
          );
        })}
    </div>
  );
};

export default NotificationCard;
