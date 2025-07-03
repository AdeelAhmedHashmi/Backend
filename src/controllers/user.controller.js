import { asyncHandler } from "../utils/asyncHandler.js"
import { ApiError } from "../utils/apiError..js"
import { User } from "../models/user.model.js"
import uploadOnCloudinary from "../utils/cloudinary.js"
import { ApiResponse } from "../utils/apiRessponse..js"

const registerUser = asyncHandler( async (req, res)=>{
    // get user details from frontend 
    // validation - not empty
    // check if user already exist : username ,email
    // check for images ,check for avator
    // upload them to cloudinary, avatar
    // create user object - create entry in db
    // remove password and refresh token from response
    // check for user creation
    // return response

    const { fullname, username, email, password } = req.body


    if ([fullname, username, email, password].some(field => field.trim() === "")){
        throw new ApiError(400, "Fullname is required!")  // we can also maek a saperate file for validation functions for more advanced validation in production
    }


    // check from database that user is already exist or not?
    User.findOne({username}) // it basic checking
    const existedUser = User.findOne({
        $or: [{ username },{ email }]
    })

    if(existedUser){
        throw new ApiError(409, "User with username and email is already exist!")
    }

    //get the localFile Path from multer that stored in my local Server
    const avatarLocalPath = req.files?.avatar[0]?.path;
    const coverImageLocalPath = req.files?.coverImage[0]?.path;

    if(!avatarLocalPath){
        throw new ApiError(400, "Avatar file is required!")
    }

    //upload this files on cloudinary
    const avatar = await uploadOnCloudinary(avatarLocalPath)
    const coverImage = await uploadOnCloudinary(coverImageLocalPath)

    if(!avatar){
        throw new ApiError(400, "Avatar file is required! ")
    }

    const user = User.create({
        fullname,
        avatar: avatar.url,
        coverImage: coverImage?.url || "",
        email,
        username: username.toLowerCase(),
        password
    })


    const createdUser = await User.findBy(user._id).select(
        "-password -refreshToken"
    )

    if(!createdUser){
        throw new ApiError(500, "Something went wrong while registering the User!")
    }

    return res.status(201).json(
        new ApiResponse(200, createdUser, "User Registered Successfully!")
    )
} )

export { registerUser }