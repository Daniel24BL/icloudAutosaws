import multer from 'multer'
// const file = Express.Multer.File
// Settings
const storage = multer.diskStorage( {
    destination: 'uploads',
    filename   : ( req, file: any, cb ) => {
        cb(
            null,
            `${Date.now()}-${file.originalname}`,
        )
    },
} )
export default multer( { storage } )
