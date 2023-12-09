"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// app.ts
const express_1 = __importDefault(require("express"));
const connectDB_1 = __importDefault(require("./config/connectDB")); // Update the path if necessary
const cors_1 = __importDefault(require("cors"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const UserDetailsRoutes_1 = __importDefault(require("./routes/UserDetailsRoutes"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
// Connect to MongoDB
(0, connectDB_1.default)();
app.use((0, cors_1.default)({
    origin: ["http://localhost:5173"], // Update with your frontend URL
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true, // Enable credentials (cookies, authorization headers)
}));
// Use user routes
app.use("/v1/api/users", userRoutes_1.default);
app.use("/v1/api/userdetails", UserDetailsRoutes_1.default);
app.get('/', (req, res) => {
    res.json({ message: 'Server is working!' });
});
// Protected routes (example)
// app.use('/api/some-protected-route', authMiddleware, someProtectedRoute);
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
