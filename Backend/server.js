import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/database.js';
import cors from 'cors';
import path from 'path';
import expressLayouts from 'express-ejs-layouts';
import userRoutes from './Routes/userRoutes.js';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import adminRoutes from './Routes/adminRoutes.js';
import categoryRoutes from './Routes/categoryRoutes.js';
import blogRoutes from './Routes/blogRoutes.js';
import passport from 'passport';
import session from 'express-session'; // Import express-session


dotenv.config();

const app = express();

// Middleware
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true, // Allow credentials (cookies, authorization headers, etc.)
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(path.resolve(), 'public')));
app.use(expressLayouts);
app.set('view engine', 'ejs');
app.set('layout', 'layouts'); // Fixed typo from 'lauyout' to 'layout'
app.use(bodyParser.json());
app.use(cookieParser());

// Session middleware
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: process.env.NODE_ENV === 'production', sameSite: 'None' } // Adjust based on your needs
}));

app.use(passport.initialize());
app.use(passport.session());

// Connect to Database
connectDB();

// Routes
app.get('/', (req, res) => {
    res.send('Hello');
});
app.use('/api/user', userRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/category', categoryRoutes);
app.use('/api/blog', blogRoutes);

// Start the server
app.listen(process.env.PORT, () => {
    console.log(`Server is running at http://localhost:${process.env.PORT}`);
});