import path from 'path'
import multer from 'multer'

// Initialise the multer storage engine
const storage = multer.diskStorage({
    destination(req, file, callback) {
        callback(null, 'uploads/')
    },
    filename(req, file, callback) {
        callback(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`)
    }
})

const checkFileType = (file, callback) => {
    const filetypes = /jpg|jpeg|png/ // allowed extensions
    const validExtension = filetypes.test(path.extname(file.originalname).toLowerCase()) // check extension
    const validMimetype = filetypes.test(file.mimetype) // check mimetype

    if (validExtension && validMimetype) {
        return callback(null, true)
    } else {
        callback(new Error('Only .png, .jpg and .jpeg formats allowed'))
    }
}

const uploadImages = multer({
    storage,
    fileFilter: (req, file, callback) => {
        checkFileType(file, callback)
    }
})

export { uploadImages }