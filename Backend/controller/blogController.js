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
    console.error("Error fetching all blogs:", err);
    res.status(500).json({ message: "Failed to fetch blogs" });
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
    console.error("Error getting blog description:", err);
    res.status(500).json({ message: "Failed to get article description" });
  }
};

export const addBLogToFavorite = async (req, res) => {
  try {
    const { user } = req;
    const { id } = req.params;

    const blog = await Blog.findById(id);
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    const existingUser = await User.findById(user._id);
    if (!existingUser) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if already in favorites to prevent duplicate entries
    const alreadyUserFavorite = existingUser.favoritesBlog.some(
      (favId) => favId.toString() === blog._id.toString()
    );

    if (!alreadyUserFavorite) {
      existingUser.favoritesBlog.push(blog._id);
      await existingUser.save();
    }

    const alreadyBlogFavorited = blog.favouriteBlogByUsers.some(
      (userId) => userId.toString() === user._id.toString()
    );

    if (!alreadyBlogFavorited) {
      blog.favouriteBlogByUsers.push(user._id);
      await blog.save();
    }

    res.status(200).json({
      success: true,
      message: "Blog added to your favourites",
      blog,
    });
  } catch (err) {
    console.error("Error adding blog to favorites:", err);
    res.status(500).json({ message: "Failed to add blog to favourites" });
  }
};

export const removeBLogFromFavorite = async (req, res) => {
  try {
    const { user } = req;
    const { id } = req.params;

    const blog = await Blog.findById(id);
    const existingUser = await User.findById(user._id);

    if (!existingUser) {
      return res.status(404).json({ message: "User not found" });
    }

    // Filter out blog from user's favourites
    existingUser.favoritesBlog = existingUser.favoritesBlog.filter(
      (favId) => favId.toString() !== id.toString()
    );
    await existingUser.save();

    // Filter out user from blog's favourite users if blog exists
    if (blog) {
      blog.favouriteBlogByUsers = blog.favouriteBlogByUsers.filter(
        (userId) => userId.toString() !== user._id.toString()
      );
      await blog.save();
    }

    res.status(200).json({
      success: true,
      message: "Blog removed from your favourites",
      blog,
    });
  } catch (err) {
    console.error("Error removing blog from favorites:", err);
    res.status(500).json({ message: "Failed to remove blog from favourites" });
  }
};