import express from "express";
import cors from 'cors';
import 'dotenv/config';
import { connectDB } from "./config/db.js";
import userRouter from './routes/userRoutes.js';
import taskRouter from "./routes/taskRoute.js";

const app = express();
const port = process.env.PORT || 4000;

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors()); // ✅ Enable CORS
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/user", userRouter);
app.use("/api/tasks", taskRouter);

app.get('/', (req, res) => {
    res.send('API WORKING');
});

// Start server
app.listen(port, () => {
    console.log(`Server Started on http://localhost:${port}`); // ✅ Fixed typo
});
