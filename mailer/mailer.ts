import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user:'spaceshipagency16@gmail.com',
        pass: process.env.PASSWORDGMAIL
    },
    from: 'spaceshipagency16@gmail.com'
});

export const sendEmail =async (to: string, code: string): Promise<void> => {
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
    }

    try{
        await transporter.sendMail(mailOptions)
        console.log('El email fue enviado correctamente')

    }catch (error){
        console.error('Se produjo un error al enviar el email:', error)

    }
}