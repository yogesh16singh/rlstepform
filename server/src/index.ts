// app.ts
import express from "express";
import connectDB from "./config/connectDB"; // Update the path if necessary
import cors from "cors";
import userRoutes from "./routes/userRoutes";
import userDetailsRoutes from "./routes/UserDetailsRoutes";
import dotenv from 'dotenv';
dotenv.config();

const app = express();
app.use(express.json());

// Connect to MongoDB
connectDB();

app.use(
    cors({
        origin: ["http://localhost:5173"], // Update with your frontend URL
        methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
        credentials: true, // Enable credentials (cookies, authorization headers)
    })
);

// Use user routes
app.use("/v1/api/users", userRoutes);
app.use("/v1/api/userdetails", userDetailsRoutes);
app.get('/', (req, res) => {
    res.json({ message: 'Server is working!' });
});
// Protected routes (example)
// app.use('/api/some-protected-route', authMiddleware, someProtectedRoute);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
