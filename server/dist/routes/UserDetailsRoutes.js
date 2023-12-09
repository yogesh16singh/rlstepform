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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userDetailsService_1 = __importDefault(require("../config/userDetailsService"));
const router = express_1.default.Router();
const userService = new userDetailsService_1.default();
// POST: Create a new user detail entry
router.post("/user-details", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId, name, email, phoneNumber, line1, line2, city, pincode, country, files, options, state, } = req.body;
        console.log(req.body);
        const userDetails = yield userService.createUserDetails(userId, {
            name,
            email,
            phoneNumber,
            line1,
            line2,
            city,
            pincode,
            country,
            files,
            options,
            state
        });
        res.status(201).json(userDetails);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
}));
// GET: Get user details by user ID
router.get("/user-details/:userId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.params;
        const userDetails = yield userService.getUserDetailsByUserId(userId);
        if (userDetails) {
            res.json(userDetails);
        }
        else {
            res.status(404).json({ error: "User details not found" });
        }
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
}));
router.get("/user-details/email/:email", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email } = req.params;
        const userDetails = yield userService.getUserDetailsByUserEmail(email);
        if (userDetails) {
            res.json(userDetails);
        }
        else {
            res.status(404).json({ error: "User details not found" });
        }
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
}));
// PUT: Update user details by user ID
router.put("/user-details/:userId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.params;
        const { name, email, phoneNumber, address, files } = req.body;
        const updatedUserDetails = yield userService.updateUserDetailsByUserId(userId, {
            name,
            email,
            phoneNumber,
            address,
            files,
        });
        if (updatedUserDetails) {
            res.json(updatedUserDetails);
        }
        else {
            res.status(404).json({ error: "User details not found" });
        }
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
}));
// DELETE: Delete user details by user ID
router.delete("/user-details/:userId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.params;
        const deletedUserDetails = yield userService.deleteUserDetailsByUserId(userId);
        if (deletedUserDetails) {
            res.json(deletedUserDetails);
        }
        else {
            res.status(404).json({ error: "User details not found" });
        }
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
}));
exports.default = router;
