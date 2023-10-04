import config from "config";
import nodemailer, { SendMailOptions } from "nodemailer";
import log from "./logger";

// use this to create test credentials
// async function createTestCreds() {
//     const creds = await nodemailer.createTestAccount();
//     console.log(creds);
// }

const smtp = config.get<{
    user: string;
    pass: string;
    host: string;
    port: number;
    secure: boolean;
}>("smtp");

const transporter = nodemailer.createTransport({
    ...smtp,
    auth: { user: smtp.user, pass: smtp.pass },
});

async function sendEmail(payload: SendMailOptions) {
    transporter.sendMail(payload, (err, info) => {
        if (err) {
            log.error(err, "error sending email");
            return;
        } else {
            log.info(info, "email sent");
            log.info(nodemailer.getTestMessageUrl(info), "test url");
        }
    });
}

export default sendEmail;
