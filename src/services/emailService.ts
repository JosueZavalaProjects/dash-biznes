import axios from "axios";

export type EmailType = "signUp" | "cancelSubscription";

export type EmailBodyType = {
  clientEmail: string;
  emailType: EmailType;
};

export const sendEmail = async (emailRequest: EmailBodyType) => {
  axios
    .post("api/mail", emailRequest)
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.log(error);
    });
};
