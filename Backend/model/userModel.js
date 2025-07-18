import mongoose from "mongoose";
const Schema = mongoose.Schema;
const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,

  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["admin", "user"],
    default: "user",
    required: true,
  },
  avatar: {
    type: String,
  },
  favoritesBlog: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Blog' }],
  LikedBlog:[{ type: mongoose.Schema.Types.ObjectId, ref: 'Blog' }]
});

// Middleware to hash password before saving


const User = mongoose.model("User", userSchema);

export default User;
