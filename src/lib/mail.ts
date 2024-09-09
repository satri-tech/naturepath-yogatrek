import Handlebars from "handlebars";
import nodemailer from "nodemailer";
import { activationTemplete } from "./mailTemplates/activation";
import { resetPassword } from "./mailTemplates/resetPassword";

import { userBookingTemplate } from "./mailTemplates/userBookingTemplate";
import { adminBookingTemplate } from "./mailTemplates/adminBookingTemplate";
import { Booking, Package } from "@prisma/client";

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
  } catch (err) {
    console.log(err);
  }

  try {
    const sendResult = await transport.sendMail({
      from: SMPT_EMAIL,
      to: to,
      subject: subject,
      html: body,
    });
    return sendResult;
  } catch (err) {
    console.log(err);
  }
}

export function compileActivationTemplete(name: string, url: string) {
  const template = Handlebars.compile(activationTemplete);
  const htmlBody = template({
    name,
    url,
  });
  return htmlBody;
}

export function compileResetPassTemplete(name: string, url: string) {
  const template = Handlebars.compile(resetPassword);
  const htmlBody = template({
    url,
  });
  return htmlBody;
}

export function compileAdminTemplate(booking: any, packages: Package) {
  const template = Handlebars.compile(adminBookingTemplate);
  const htmlBody = template({
    name: booking.fullname,
    email: booking.email,
    package: packages.title,
    startDate: booking.bookingDate,
    phone: booking.phone,
    country: booking.country,
    noofPerson: booking.noofPerson,
    roomPreferences: booking.roomPreferences,
    message: booking.message,
  });
  return htmlBody;
}

export function compileUserTemplate(booking: any, packages: Package) {
  const template = Handlebars.compile(userBookingTemplate);
  const htmlBody = template({
    name: booking.fullname,
    email: booking.email,
    package: packages.title,
    startDate: booking.bookingDate,
    phone: booking.phone,
    country: booking.country,
    noofPerson: booking.noofPerson,
    roomPreferences: booking.roomPreferences,
    message: booking.message,
  });
  return htmlBody;
}
