import User from '../model/userModel.js';
import bcrypt, { hash } from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import passport from 'passport';

dotenv.config();

export const registerUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        if (!username || !email || !password) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            username,
            email,
            password: hashedPassword
        });

        await newUser.save();
        console.log('User registered successfully:', newUser); // Moved above return

        return res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error('Error in registerUser:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        
        // Set cookie and send response
        res.cookie('EssaRaza', token, {
            httpOnly: true,
            secure: true,
            sameSite: 'None',
            maxAge: 10000 * 60 * 60, // 1 hour
        });

        return res.status(200).json({ message: 'Login successful' }); // Send response
    } catch (error) {
        console.error('Error in loginUser:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};




export const chekCookie = (req, res) => {
    try{
        const token = req.cookies.EssaRaza;
        if (token) {
            return res.status(200).json({ message: true });
        }
        return res.status(200).json({ message: false });
    }catch(error){
        console.error('Error in chekCookie:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};



export const getUserData  = async (req, res) => {
    try{
    const {user} = req;
    
    res.status(200).json({ user });
    }
    catch (error) {
        console.error('Error in getUserData:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};


export const logoutUser = (req, res) => {
    try {
        res.clearCookie('EssaRaza', {
            httpOnly: true,
            secure: true,
            sameSite: 'None',
        });
        return res.status(200).json({ message: 'Logout successful' });
    } catch (error) {
        console.error('Error in logoutUser:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};




export const changePassword = async (req, res) => {
    try {
        const {password ,  newPassword, confirmPassword } = req.body;
        const {user} = req
        const currentPassword = user.password;
        if (!newPassword || !confirmPassword) {
            return res.status(400).json({ message: 'All fields are required' });
        }
        if (newPassword !== confirmPassword) {
            return res.status(400).json({ message: 'Passwords do not match' });
        }
        const passwordMatch = await bcrypt.compare(password,currentPassword);
        if (!passwordMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        const hashedNewPassword = await bcrypt.hash(confirmPassword, 10);
        console.log("the new password is",hashedNewPassword);
        user.password = hashedNewPassword;
        await user.save();
        return res.status(200).json({ message: 'Password changed successfully' });
    } catch (error) {
        console.error('Error in changePassword:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

export const changeAvatar = async (req, res) => {
  const { user } = req;
  
  try {
    if (req.file) {
      // Save the file path or name to the user's profile
      user.avatar = req.file.filename; // or user.avatar = req.file.filename if saving only the name
      await user.save();
    }
    res.status(200).json({ message: "Avatar updated successfully", user });
  } catch (error) {
    console.error("Error updating avatar:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};




export const getAllUser =async (req, res) => {
    try {
        const users =await User.find();
        res.status(200).json({ users });
    } catch (error) {
        console.error('Error in getAllUser:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}