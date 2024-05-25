import * as React from "react";

interface EmailTemplateProps {
  email: string;
}

export const SignUpEmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  email,
}) => (
  <div>
    <h1>Se acaba de crear el siguiente usuario, {email}!</h1>
    <h2 style={{ color: "blue" }}>Ve a darle la bienvenida!</h2>
  </div>
);

export const CancelSubscriptionEmailTemplate: React.FC<
  Readonly<EmailTemplateProps>
> = ({ email }) => (
  <div>
    <h1>El usuario: {email} acaba de cancelar su suscripción</h1>
    <h2 style={{ color: "blue" }}>Contáctalo!</h2>
  </div>
);
