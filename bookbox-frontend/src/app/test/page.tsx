import HamburgerButton from "@/components/00-atoms/HamburgerButton";
import NavBar from "@/components/01-molecules/NavBar";
import { tertiaryTextLabelStyle } from "@/styles/classes";
import Link from "next/link";
import { redirect } from "next/navigation";


  const RecoveryPage: React.FC = () => {
    return (

      <div className="height: 5000px; background: #eee;">
        <NavBar />
 <div
      style={{
        minHeight: "4000px",
        background: "linear-gradient(to bottom, #f0f0f0, #c0c0c0)",
        padding: "2rem",
      }}
    >
      <h1>Tall Dummy Page</h1>
      {[...Array(100)].map((_, i) => (
        <p key={i}>This is line {i + 1}</p>
      ))}
    </div>
        <div className="min-h-screen flex items-center justify-center">

        </div>
        </div>
    );
  };

export default RecoveryPage;