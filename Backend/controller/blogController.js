import User from "../model/userModel.js";
import Blog from "../model/blogModel.js";

export const getAllBlog = async (req, res) => {
  try {
    const blog = await Blog.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      blog,
    });
  } catch (err) {
    console.log(err);
  }
};

export const getDescription = async (req, res) => {
  const { id } = req.params;
  try {
    const blog = await Blog.findById(id);
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }
    res.status(200).json({
      success: true,
      blog,
    });
  } catch (err) {
    console.log(err);
  }
};

export const addBLogToFavorite = async (req, res) => {
  try {
    const { user } = req;
    const { id } = req.params;
    const blog = await Blog.findById(id);
    const existingUser = await User.findById(user._id);
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }
    blog.favouriteBlogByUsers.push(user._id);
    existingUser.favoritesBlog.push(blog._id);
    await blog.save();
    await existingUser.save();

    res.status(200).json({
      success: true,
      message:"blog added to the favuorites",
      blog,
      existingUser,
    });
  } catch (err) {
    console.log(err);
  }
};



export const removeBLogFromFavorite = async (req, res) => {
  try {
    const { user } = req;
    const { id } = req.params;
    const blog = await Blog.findById(id);
    const existingUser = await User.findById(user._id);
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    const favuoritesIndex = existingUser.favoritesBlog.indexOf(blog._id);
    if (favuoritesIndex !== -1) {
      existingUser.favoritesBlog.splice(favuoritesIndex, 1);
    }else{
      return res.status(404).json({ message: "Blog not found" });
    }

    const blogIndex = blog.favouriteBlogByUsers.indexOf(user._id);
    if (blogIndex !== -1) {
      blog.favouriteBlogByUsers.splice(blogIndex, 1);
    }else{
      return res.status(404).json({ message: "Blog not found" });
    }
    
    await blog.save();
    await existingUser.save();

    res.status(200).json({
      success: true,
      message:"remove blog from the favuorites",
      blog,
      existingUser,
    });
  } catch (err) {
    console.log(err);
  }
};