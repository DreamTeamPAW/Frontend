import React from "react";
import LoginTemplate from "../03-templates/LoginTemplate";
import LoginForm from "../02-organisms/LoginForm";
import backgroundImage from '../assets/BookBoxLoginBG.png';

const LoginPage: React.FC = () => {
    return (
        <LoginTemplate>
          <LoginForm />
        </LoginTemplate>
    );
  };

export default LoginPage;
