"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const UserDetails_1 = require("../models/UserDetails");
class UserDetailsService {
    // Create a new user detail entry
    createUserDetails(userId, userDetailsData) {
        return __awaiter(this, void 0, void 0, function* () {
            const userDetails = new UserDetails_1.UserDetailsModel(Object.assign({ userId }, userDetailsData));
            yield userDetails.save();
            return userDetails;
        });
    }
    // Get user details by user ID
    getUserDetailsByUserId(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const userDetails = yield UserDetails_1.UserDetailsModel.find({ userId }).exec();
            return userDetails;
        });
    }
    getUserDetailsByUserEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const userDetails = yield UserDetails_1.UserDetailsModel.find({ email: email }).exec();
            return userDetails;
        });
    }
    // Update user details by user ID
    updateUserDetailsByUserId(userId, userDetailsData) {
        return __awaiter(this, void 0, void 0, function* () {
            const userDetails = yield UserDetails_1.UserDetailsModel.findOneAndUpdate({ userId }, { $set: userDetailsData }, { new: true }).exec();
            return userDetails;
        });
    }
    // Upload files for user details
    uploadFiles(userId, files) {
        return __awaiter(this, void 0, void 0, function* () {
            const userDetails = yield UserDetails_1.UserDetailsModel.findOne({ userId }).exec();
            if (userDetails) {
                userDetails.files = userDetails.files.concat(files);
                yield userDetails.save();
                return userDetails;
            }
            return null;
        });
    }
    // Delete user details by user ID
    deleteUserDetailsByUserId(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const deletedUserDetails = yield UserDetails_1.UserDetailsModel.findOneAndDelete({
                userId,
            }).exec();
            return deletedUserDetails;
        });
    }
}
exports.default = UserDetailsService;
