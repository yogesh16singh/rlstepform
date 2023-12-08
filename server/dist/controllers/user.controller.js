import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
const generateAccessAndRefreshTokens = async (userId) => {
    try {
        const user = await User.findById(userId);
        const accessToken = user.generateAccessToken();
        const refreshToken = user.generateRefreshToken();
        // attach refresh token to the user document to avoid refreshing the access token with multiple refresh tokens
        user.refreshToken = refreshToken;
        await user.save({ validateBeforeSave: false });
        return { accessToken, refreshToken };
    }
    catch (error) {
        throw new ApiError(500, "Something went wrong while generating the access token");
    }
};
const registerUser = asyncHandler(async (req, res) => {
    // get user details from frontend
    // validation - not empty
    // check if user already exists:  email
    // check for images, check for avatar
    // upload them to cloudinary, avatar
    // create user object - create entry in db
    // remove password and refresh token field from response
    // check for user creation
    // return res
    const { fullName, email, password } = req.body;
    // console.log("body: ", req.body);
    if ([fullName, email, password].some((field) => field?.trim() === "")) {
        throw new ApiError(400, "All fields are required");
    }
    const existedUser = await User.findOne({
        email
    });
    if (existedUser) {
        throw new ApiError(409, "User with email already exists");
    }
    //console.log(req.files);
    const user = await User.create({
        fullName,
        email,
        password
    });
    const createdUser = await User.findById(user._id).select("-password -refreshToken");
    if (!createdUser) {
        throw new ApiError(500, "Something went wrong while registering the user");
    }
    return res.status(201).json(new ApiResponse(200, createdUser, "User registered Successfully"));
});
const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    if (!email) {
        throw new ApiError(400, " email is required");
    }
    const user = await User.findOne({
        email
    });
    if (!user) {
        throw new ApiError(404, "User does not exist");
    }
    // Compare the incoming password with hashed password
    const isPasswordValid = await user.isPasswordCorrect(password);
    if (!isPasswordValid) {
        throw new ApiError(401, "Invalid user credentials");
    }
    const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(user._id);
    // get the user document ignoring the password and refreshToken field
    const loggedInUser = await User.findById(user._id).select("-password -refreshToken");
    const options = {
        httpOnly: true,
        secure: true,
    };
    return res
        .status(200)
        .cookie("accessToken", accessToken, options) // set the access token in the cookie
        .cookie("refreshToken", refreshToken, options) // set the refresh token in the cookie
        .json(new ApiResponse(200, { user: loggedInUser, accessToken, refreshToken }, // send access and refresh token in response if client decides to save them by themselves
    "User logged in successfully"));
});
export { registerUser, loginUser };
