import jwt from 'jsonwebtoken'

export const generateJWT = (id: string = ""): Promise<string> => {
    return new Promise((res, rej) => {
        const payload = {id}

        jwt.sign(
            payload,
            process.env.SECRETPASSWORD as string,
            {
                expiresIn: '2h'
            },
            (error: Error | null, token:string | undefined)=>{
                if(error){
                    console.log(error);
                    rej('Ocurrió un error al generar el JSON Web Token')
                    
                } else {
                    res(token as string)
                }
            }
        )
    })
}