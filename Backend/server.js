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
import contactRoutes from './Routes/contactRoutes.js';
import passport from 'passport';
import session from 'express-session';

dotenv.config();

const app = express();

// Trust reverse proxy (crucial for Render/HTTPS cookies)
app.set('trust proxy', 1);

const parseOrigins = () => {
  const envOrigins = (process.env.FRONTEND_URL || '')
    .split(',')
    .map((url) => url.trim().replace(/\/+$/, ''))
    .filter(Boolean);

  return [
    'http://localhost:5173',
    'http://localhost:3000',
    'http://127.0.0.1:5173',
    ...envOrigins,
  ];
};

const corsOptions = {
  origin: (origin, callback) => {
    // Allow non-browser requests (Postman, mobile apps, curl)
    if (!origin) return callback(null, true);

    const origins = parseOrigins();
    const normalizedOrigin = origin.trim().replace(/\/+$/, '');

    // Allow configured origins, any vercel.app deployment, or development mode
    const isExplicitlyAllowed = origins.includes(normalizedOrigin);
    let isVercel = false;
    try {
      const hostname = new URL(origin).hostname;
      isVercel = hostname === 'vercel.app' || hostname.endsWith('.vercel.app');
    } catch {
      isVercel = false;
    }

    if (isExplicitlyAllowed || isVercel || process.env.NODE_ENV !== 'production') {
      return callback(null, true);
    }

    console.warn(`[CORS] Blocked request from origin: ${origin}`);
    return callback(new Error(`CORS policy blocked for origin: ${origin}`), false);
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: [
    'Content-Type',
    'Authorization',
    'X-Requested-With',
    'Accept',
    'Origin',
  ],
  exposedHeaders: ['Set-Cookie'],
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.options('*', cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(path.resolve(), 'public')));
app.use(expressLayouts);
app.set('view engine', 'ejs');
app.set('layout', 'layouts');
app.use(bodyParser.json());
app.use(cookieParser());

// Session middleware
app.use(session({
    secret: process.env.SESSION_SECRET || 'default_session_secret',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: process.env.NODE_ENV === 'production', sameSite: 'None' }
}));

app.use(passport.initialize());
app.use(passport.session());

// Routes
app.get('/', (req, res) => {
    res.send('Hello');
});
app.use('/api/user', userRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/category', categoryRoutes);
app.use('/api/blog', blogRoutes);
app.use('/api/contact', contactRoutes);

// Start the server
try {
    await connectDB();
    app.listen(process.env.PORT, () => {
        console.log(`Server is running at http://localhost:${process.env.PORT}`);
    });
} catch (error) {
    const message = error.message.replace(/mongodb(?:\+srv)?:\/\/[^\s]+/g, '[redacted MongoDB URI]');
    console.error(`Database connection failed: ${message}`);
    process.exit(1);
}
