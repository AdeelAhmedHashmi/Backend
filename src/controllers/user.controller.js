import { asyncHandler } from "../utils/asyncHandler.js"
import { ApiError } from "../utils/apiError..js"
import { User } from "../models/user.model.js"
import uploadOnCloudinary from "../utils/cloudinary.js"
import { ApiResponse } from "../utils/apiRessponse..js"

const registerUser = asyncHandler( async (req, res)=>{
    // get user details from frontend 
    // validation - not empty
    // check if user already exist : username ,email
    // check for images ,check for avatar
    // upload them to cloudinary, avatar
    // create user object - create entry in db
    // remove password and refresh token from response
    // check for user creation
    // return response

    const { fullname, username, email, password } = req.body

    // console.log(req.body)

    if ([fullname, username, email, password].some(field => field.trim() === "")){
        throw new ApiError(400, "[ApiError (user.controller)->]  All Field is required!")  // we can also maek a saperate file for validation functions for more advanced validation in production
    }


    // check from database that user is already exist or not?
    // await User.findOne({username}) // it basic checking
    const existedUser = await User.findOne({
        $or: [{ username },{ email }]
    })

    console.log("[Log] (user.controller)->  existed User : ", existedUser)
    if(existedUser){
        throw new ApiError(409, "[ApiError (user.controller)->]  User with username and email is already exist! ExistedUser Found!")
    }

    

    //get the localFile Path from multer that stored in my local Server
    const avatarLocalPath = req.files?.avatar[0]?.path;
    let coverImageLocalPath;
    // const coverImageLocalPath = req.files?.coverImage[0]?.path;
    if(
        req.files &&
        Array.isArray(req.files.coverImage) &&
        req.files.coverImage.lenght > 0
    ){
        coverImageLocalPath = req.files?.coverImage[0]?.path;
    }

    if(!avatarLocalPath){
        throw new ApiError(400, "[ApiError (user.controller)->] Avatar file is required! avatarLocalPath is not found!")
    }

    // // upload this files on cloudinary
    const avatar = await uploadOnCloudinary(avatarLocalPath)
    const coverImage = await uploadOnCloudinary(coverImageLocalPath)

    if(!avatar){
        throw new ApiError(400, "[ApiError (user.controller)->]  Avatar file is not uploaded in cloudinary! ")
    }

    if(!coverImage){
        throw new ApiError(400, "[ApiError (user.controller)->]  CoverImage is not uploaded in cloudinary! ")
    }

    const user = await User.create({
        fullname,
        // avatar: avatar.url || avatarLocalPath,
        avatar: avatarLocalPath,
        // coverImage: coverImage?.url || "",
        coverImage: coverImageLocalPath || "",
        email,
        username: username.toLowerCase(),
        password
    })

    console.log(`[Log (user.controller)->]  `, User)


    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    )

    if(!createdUser){
        throw new ApiError(500, "[ApiError (user.controller)->]  Something went wrong while registering the User!")
    }

    return res.status(201).json(
        new ApiResponse(200, createdUser, "[ApiResponse (user.controller)->]  User Registered Successfully!")
    )
} )

export { registerUser }