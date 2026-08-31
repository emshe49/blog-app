import dotenv from 'dotenv';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import User from './model/userModel.js';

dotenv.config();

const createOrUpdateAdmin = async () => {
  try {
    const mongoUrl = process.env.MONGO_URL || 'mongodb://127.0.0.1:27017/blogapp';
    await mongoose.connect(mongoUrl);
    console.log('Connected to MongoDB at', mongoUrl);

    // Can be passed via CLI arguments: node createAdmin.js <email> <password> <username>
    const email = (process.argv[2] || 'admin@blogapp.com').trim().toLowerCase();
    const password = process.argv[3] || 'Admin@123';
    const username = process.argv[4] || 'SuperAdmin';

    const hashedPassword = await bcrypt.hash(password, 10);

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      existingUser.role = 'admin';
      existingUser.password = hashedPassword;
      if (username) existingUser.username = username;
      await existingUser.save();
      console.log('----------------------------------------------------');
      console.log(`✅ Existing user updated to ADMIN!`);
      console.log(`   Email:    ${email}`);
      console.log(`   Password: ${password}`);
      console.log(`   Role:     admin`);
      console.log('----------------------------------------------------');
    } else {
      const newAdmin = new User({
        username,
        email,
        password: hashedPassword,
        role: 'admin',
      });
      await newAdmin.save();
      console.log('----------------------------------------------------');
      console.log(`✅ New ADMIN user created successfully!`);
      console.log(`   Username: ${username}`);
      console.log(`   Email:    ${email}`);
      console.log(`   Password: ${password}`);
      console.log(`   Role:     admin`);
      console.log('----------------------------------------------------');
    }

    process.exit(0);
  } catch (error) {
    console.error('❌ Error in createAdmin script:', error);
    process.exit(1);
  }
};

createOrUpdateAdmin();
