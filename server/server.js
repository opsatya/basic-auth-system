import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import router from './routes/userRoutes.js';
import cors from 'cors';

dotenv.config();
connectDB();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use('/api/users', router);

// Error Handler Middleware
app.use((_err, _req, res, _next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode);
  res.json({
    message: _err.message,
    stack: process.env.NODE_ENV === 'production' ? null : _err.stack,
  });
});

const PORT = process.env.PORT || 3434;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));