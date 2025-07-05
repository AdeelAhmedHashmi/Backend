import multer from "multer";
import path from "path"

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.resolve('public/tmp'))
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
})

export const upload = multer({ 
    storage,  // in es6 storage: storage === storage (because if both sides are same so i can write these at once like (storage instead of storage: storage) ) 
})
