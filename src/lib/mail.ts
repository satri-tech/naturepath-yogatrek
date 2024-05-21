import Handlebars from "handlebars";
import nodemailer from "nodemailer";
import { activationTemplete } from "./mailTemplates/activation";
import { resetPassword } from "./mailTemplates/resetPassword";

export async function sendmail({
  to,
  subject,
  body,
}: {
  to: string;
  subject: string;
  body: string;
}) {
  const { SMPT_EMAIL, SMPT_GMAIL_PASS } = process.env;
  const transport = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: SMPT_EMAIL,
      pass: SMPT_GMAIL_PASS,
    },
  });

  try {
    const testResult = await transport.verify();
    console.log("test result of transport ", testResult);
  } catch (err) {
    console.log(err);
  }

  try {
    const sendResult = await transport.sendMail({
        from:SMPT_EMAIL,
        to: to,
        subject:subject,
        html:body,
    });
    console.log("test result of transport ", sendResult);
  } catch (err) {
    console.log(err);
  }

  
}

export function compileActivationTemplete(name:string, url:string){
    const template = Handlebars.compile(activationTemplete)
    const htmlBody = template({
        name,
        url,
    });
    return htmlBody;
}

export function compileResetPassTemplete(name:string, url:string){
    const template = Handlebars.compile(resetPassword)
    const htmlBody = template({
        url,
    });
    return htmlBody;
}