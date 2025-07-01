import { mongoose, Schema} from 'mongoose'
import jwt from "jsonwebtoken"
import bycrypt from "bcrypt"

const userSchema = new Schema({ 
    username: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        index: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    fullname: {
        type: String,
        required: true,
        trim: true,
        index: true
    },
    avator: {
        type: String, // cloudinary url
        required: true,
    },
    coverImage: {
        type: String,
    },
    watchHistory: {
        type: [
            {
                type: Schema.Types.ObjectId,
                ref: "Video"
            }
        ]
    },
    password: {
        type: String,
        required: [true, "Password is required"],
    },
    refreshToken: {
        type: String,
    }
 }, {timestamps: true})

userSchema.pre("save", async function(next){
    if (this.isModified("password")){
        this.password = bycrypt.hash(this.password, 10)
        next()
    }
})

userSchema.method.isPasswordCorrect = async function (password){
    return await bycrypt.compare(password, this.password)
}

userSchema.method.generateAccessToken = function(){
    return jwt.sign(
        {
            _id: this._id,
            email: this.email,
            username: this.username,
            fullname: this.fullname
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}
userSchema.method.generateRefreshToken = function(){
    return jwt.sign(
        {
            _id: this._id,
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}

const User = mongoose.model('User', userSchema)