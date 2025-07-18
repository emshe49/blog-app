import mongoose from "mongoose";
const Schema = mongoose.Schema;

const blogSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  likes: {
    type: Number,
    default: 0,
  },
  category:{},
  favouriteBlogByUsers:[{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  likedBlogByUser:[{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
}, { timestamps: true });

const Blog = mongoose.model("Blog", blogSchema);

export default Blog;
