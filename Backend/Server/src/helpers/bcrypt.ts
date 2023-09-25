import * as bcryptjs from 'bcryptjs'

const encrypt = async( textPlain: any ) => {
    return await bcryptjs.hash( textPlain, 10 )
}

const compare = async(
    passwordPlain: any,
    hashPassword: any,
) => {
    return await bcryptjs.compare( passwordPlain, hashPassword )
}

export {
    encrypt,
    compare,
}
