import { tertiaryTextLabelStyle } from "@/styles/classes";
import Link from "next/link";
import { redirect } from "next/navigation";


  const RecoveryPage: React.FC = () => {
    return (
        <div className="min-h-screen flex items-center justify-center">
            <Link href="/login" className={`${tertiaryTextLabelStyle} pl-1`}>/login</Link>
            <Link href="/register" className={`${tertiaryTextLabelStyle} pl-1`}>/register</Link>
        </div>
    );
  };

export default RecoveryPage;