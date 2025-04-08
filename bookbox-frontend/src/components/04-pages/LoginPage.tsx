import React from "react";
import LoginTemplate from "../03-templates/LoginTemplate";
import LoginForm from "../02-organisms/LoginForm";
import { backgroundImageLoginPage } from "@/styles/classes";

const LoginPage: React.FC = () => {
    return (
      <div style={backgroundImageLoginPage.backgroundContainer}>
          <img
            src="/images/placeholderBG.png"
            alt="Left Image"
            className="absolute left-0 top-0 w-full h-full object-cover"
          />
          <LoginTemplate>
            <LoginForm />
          </LoginTemplate>
        </div>
    );
  };

export default LoginPage;
