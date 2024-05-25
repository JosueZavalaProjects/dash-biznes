import { Resend } from "resend";

import {
  CancelSubscriptionEmailTemplate,
  SignUpEmailTemplate,
} from "@/components/emailTemplates/templates";
import { EmailBodyType } from "@/services/emailService";

const resend = new Resend(process.env.NEXT_PUBLIC_RESEND_API_KEY);
const DESTINY_EMAIL =
  process.env.NEXT_PUBLIC_RESEND_DESTINY_EMAIL ||
  "josue.zavala.projects@gmail.com";

export async function POST(request: Request, response: Response) {
  const { clientEmail, emailType } = (await request.json()) as EmailBodyType;

  const EmailTemplate =
    emailType === "signUp"
      ? (SignUpEmailTemplate({ email: clientEmail }) as React.ReactElement)
      : (CancelSubscriptionEmailTemplate({
          email: clientEmail,
        }) as React.ReactElement);

  const EmailSubject =
    emailType === "signUp" ? "Nuevo Usuario" : "Cancelacion de Subscripción";

  try {
    const { data, error } = await resend.emails.send({
      from: "Acme <onboarding@resend.dev>",
      to: [DESTINY_EMAIL],
      subject: EmailSubject,
      react: EmailTemplate,
    });

    if (error) {
      return Response.json({ error }, { status: 500 });
    }

    return Response.json({ message: "Email sent successfully" });
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}
