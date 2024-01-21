import { ReactElement } from "react";

import { render } from "@react-email/render";
import nodemailer from "nodemailer";
import { MailOptions } from "nodemailer/lib/sendmail-transport";

import { env } from "@/env.mjs";

const transport = nodemailer.createTransport(env.EMAIL_SERVER);

export const sendEmail = ({
	template,
	...options
}: Omit<MailOptions, "html"> &
	Required<Pick<MailOptions, "subject">> & { template: ReactElement }) => {
	const html = render(template);
	return transport.sendMail({
		from: "Crimplex <crimplex.mailer@gmail.com>",
		html,
		...options,
	});
};
