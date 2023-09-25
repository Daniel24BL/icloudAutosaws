import { connect } from 'mongoose'

const dbConnection = async() => {
    try {
        await connect( process.env.MONGODB_CNN || '' )
        console.log( 'La Base de Datos se esta ejecuntando sin problemas...' )
    } catch ( error ) {
        console.log( error )
        throw new Error( 'Error, la Base de Datos no ha sido encontrada...' )
    }
}

export {
    dbConnection,
}
