import { UserDetailsModel } from "../models/UserDetails";

class UserDetailsService {
    // Create a new user detail entry
    async createUserDetails(userId: string, userDetailsData: any) {
        const userDetails = new UserDetailsModel({ userId, ...userDetailsData });
        await userDetails.save();
        return userDetails;
    }

    // Get user details by user ID
    async getUserDetailsByUserId(userId: string) {
        const userDetails = await UserDetailsModel.find({ userId }).exec();
        return userDetails;
    }

    async getUserDetailsByUserEmail(email: string) {
        const userDetails = await UserDetailsModel.find({ email: email }).exec();
        return userDetails;
    }

    // Update user details by user ID
    async updateUserDetailsByUserId(userId: string, userDetailsData: any) {
        const userDetails = await UserDetailsModel.findOneAndUpdate(
            { userId },
            { $set: userDetailsData },
            { new: true }
        ).exec();
        return userDetails;
    }

    // Upload files for user details
    async uploadFiles(userId: string, files: string[]) {
        const userDetails = await UserDetailsModel.findOne({ userId }).exec();
        if (userDetails) {
            userDetails.files = userDetails.files.concat(files);
            await userDetails.save();
            return userDetails;
        }
        return null;
    }

    // Delete user details by user ID
    async deleteUserDetailsByUserId(userId: string) {
        const deletedUserDetails = await UserDetailsModel.findOneAndDelete({
            userId,
        }).exec();
        return deletedUserDetails;
    }
}

export default UserDetailsService;
