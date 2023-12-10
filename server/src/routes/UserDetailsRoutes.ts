import express from "express";
import UserDetailsService from "../config/userDetailsService";

const router = express.Router();
const userService = new UserDetailsService();


// POST: Create a new user detail entry
router.post("/user-details", async (req, res) => {
    try {
        const {
            userId,
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
            state,
        } = req.body;

        const userDetails = await userService.createUserDetails(userId, {
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
        console.log(userDetails);
        res.status(201).json(userDetails);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
});

// GET: Get user details by user ID
router.get("/user-details/:userId", async (req, res) => {
    try {
        const { userId } = req.params;
        const userDetails = await userService.getUserDetailsByUserId(userId);
        if (userDetails) {
            res.json(userDetails);
        } else {
            res.status(404).json({ error: "User details not found" });
        }
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
});

router.get("/user-details/email/:email", async (req, res) => {
    try {
        const { email } = req.params;
        const userDetails = await userService.getUserDetailsByUserEmail(email);
        if (userDetails) {
            res.json(userDetails);
        } else {
            res.status(404).json({ error: "User details not found" });
        }
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
});

// PUT: Update user details by user ID
router.put("/user-details/:userId", async (req, res) => {
    try {
        const { userId } = req.params;
        const { name, email, phoneNumber, address, files } = req.body;
        const updatedUserDetails = await userService.updateUserDetailsByUserId(
            userId,
            {
                name,
                email,
                phoneNumber,
                address,
                files,
            }
        );
        if (updatedUserDetails) {
            res.json(updatedUserDetails);
        } else {
            res.status(404).json({ error: "User details not found" });
        }
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
});

// DELETE: Delete user details by user ID
router.delete("/user-details/:userId", async (req, res) => {
    try {
        const { userId } = req.params;
        const deletedUserDetails = await userService.deleteUserDetailsByUserId(
            userId
        );
        if (deletedUserDetails) {
            res.json(deletedUserDetails);
        } else {
            res.status(404).json({ error: "User details not found" });
        }
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
});

export default router;