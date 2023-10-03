import { sendEmail } from '../mailer/mailer'
import Usuario, { IUser } from '../models/user'

export const existeMail = async (email:string): Promise <void> => {
    const ExisteMail : IUser | null = await Usuario.findOne({email})

    if(ExisteMail && ExisteMail.verified){
        throw new Error (`El email ${email} ya está registrado. Por favor, intente con otro email`)
    }

    if(ExisteMail && !ExisteMail.verified){
        await sendEmail(email, ExisteMail.code as string)
        throw new Error (`El email ${email} ya está registrado. Por favor, ingresa el codigo de verificacion que enviamos a tu email.`)
    }

}