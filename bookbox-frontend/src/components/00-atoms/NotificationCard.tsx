import React from "react";
import { CheckCircle } from "@phosphor-icons/react/dist/icons/CheckCircle"; 
import { Info } from "@phosphor-icons/react/dist/icons/Info"; 
import { Warning } from "@phosphor-icons/react/dist/icons/Warning"; 
import { XCircle } from "@phosphor-icons/react/dist/icons/XCircle"; 
import { alertSuccess,  alertInfo,  alertWarning,  alertError,  alertIcon,  alertText,} from "@/styles/classes";
import { AlertsState, ALERT_TYPES, AlertType } from "@components/configs/alertsConfig";
import { IconProps } from "@phosphor-icons/react";

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

interface NotificationCardProps {
  alerts: AlertsState;
  onClose?: (type: AlertType) => void;
}

const NotificationCard: React.FC<NotificationCardProps> = ({
  alerts,
  onClose,
}) => {
  return (
    <div className="space-y-2 p-4">
      {ALERT_TYPES.filter((type) => alerts[type].show).map((type) => {
        const Icon = ICONS[type];
        return (
          <div key={type} role="alert" className={ALERT_STYLES[type]}>
            <Icon
              size={20}
              weight="fill"
              className={alertIcon}
              aria-hidden="true"
            />
            <p className={alertText}>{alerts[type].text}</p>
            {onClose && (
              <button
                className="ml-2 text-xs"
                onClick={() => onClose(type)}
                aria-label={`Close ${type} alert`}
              >
                ×
              </button>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default NotificationCard;

