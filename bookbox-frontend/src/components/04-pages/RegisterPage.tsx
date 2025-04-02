import React from "react";
import RegisterTemplate from "../03-templates/RegisterTemplate";
import RegisterForm from "../02-organisms/RegisterForm";
import backgroundImage from '../assets/BookBoxLoginBG.png';

const RegisterPage: React.FC = () => {
    return (
        <RegisterTemplate>
          <RegisterForm />
        </RegisterTemplate>
    );
  };

export default RegisterPage;
