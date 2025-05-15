import React from "react";
import Button from "@components/00-atoms/Button";
import TwoLabels from "@components/01-molecules/TwoLabels"
import { bookBoxLabelStyle, loginFlavorTextLabelStyle, secondaryButtonStyle } from "@/styles/classes";
import Link from "next/link";
import { useAutoDismissAlerts } from "@components/hooks/useAutoDismissAlerts";
import NotificationCard from "@components/00-atoms/NotificationCard";

interface LoginTemplateProps {
  children: React.ReactNode; 
}


const LoginTemplate: React.FC<LoginTemplateProps> = ({ children }) => {
  const [alerts, triggerAlert, closeAlert] = useAutoDismissAlerts(20000);
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="absolute left-[10%] w-full max-w-md">
      <TwoLabels
        label1={{
          text: 'Book Box',
          className: `${bookBoxLabelStyle}`,
        }}
        label2={{
          text: 'Log in to your private library',
          className: `${loginFlavorTextLabelStyle}`,
        }}
      />
        {children}
        <Link href="/register">
            <Button type="submit" className= {`${secondaryButtonStyle} mt-4 w-lg`}>
            Sign in
            </Button>
        </Link>
        <button
          onClick={() => triggerAlert("success", "You did it!")}
          className="px-2 py-1 bg-green-200 rounded"
        >
          Show Success
        </button>
      </div>
      <div className="mt-180"> {/*TODO FIX*/}
        <NotificationCard alerts={alerts} onClose={closeAlert} />
      </div>
    </div>
    
  );
};

export default LoginTemplate;
