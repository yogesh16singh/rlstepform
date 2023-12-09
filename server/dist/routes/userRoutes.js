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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const User_1 = __importDefault(require("../models/User"));
const router = express_1.default.Router();
const JWT_SECRET = 'your-secret-key'; // Replace this with a strong, unique secret key
router.post('/register', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, password } = req.body;
        const existingUser = yield User_1.default.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: 'Email already exists' });
        }
        const hashedPassword = yield bcrypt_1.default.hash(password, 10);
        const user = new User_1.default({ name, email, password: hashedPassword });
        yield user.save();
        // Create JWT token
        const token = jsonwebtoken_1.default.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '1h' });
        res.status(201).json({ message: 'User registered successfully', token });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
}));
router.post('/login', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const user = yield User_1.default.findOne({ email });
        if (!user) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }
        const isPasswordValid = yield bcrypt_1.default.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }
        // Create JWT token
        const token = jsonwebtoken_1.default.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({ message: 'Login successful', token, userId: user._id });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
}));
exports.default = router;
