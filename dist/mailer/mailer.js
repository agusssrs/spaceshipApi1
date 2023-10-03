"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendEmail = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const transporter = nodemailer_1.default.createTransport({
    service: 'gmail',
    auth: {
        user: 'spaceshipagency16@gmail.com',
        pass: process.env.PASSWORDGMAIL
    },
    from: 'spaceshipagency16@gmail.com'
});
const sendEmail = async (to, code) => {
    const mailOptions = {
        from: '"Spaceship Agency" spaceshipagency16@gmail.com',
        to,
        subject: 'Verificá tu cuenta de Spaceship Agency',
        text: `
            Hola 👋!  este es tu codigo de verificacion para Spaceship Agency.
            Ingresalo para convertirte en un astronauta!.
            Tu codigo es: ${code}.

            Spaceship Agency 👨‍🚀.
        `
    };
    try {
        await transporter.sendMail(mailOptions);
        console.log('El email fue enviado correctamente');
    }
    catch (error) {
        console.error('Se produjo un error al enviar el email:', error);
    }
};
exports.sendEmail = sendEmail;
//# sourceMappingURL=mailer.js.map