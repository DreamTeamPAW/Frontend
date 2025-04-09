import React from "react";
import RegisterTemplate from "../03-templates/RegisterTemplate";
import RegisterForm from "../02-organisms/RegisterForm";
import { backgroundImageLoginPage } from "@/styles/classes";

const RegisterPage: React.FC = () => {
    return (
      <div style={backgroundImageLoginPage.backgroundContainer}>
        <div className="relative h-screen w-screen overflow-x-hidden max-w-full">
        <img
        src="/images/bg1.png"
        alt="Right Image"
        draggable="false"
        className="absolute right-0 top-0 w-[30vw] w-full h-[100vh] object-cover transform scale-x-[-1]"
      />
          <RegisterTemplate>
            <RegisterForm />
          </RegisterTemplate>
        </div>
      </div>
    );
  };

export default RegisterPage;
