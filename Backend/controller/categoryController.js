import Category from "../model/categoryModel.js";

export const addCategory = async (req, res) => {
  try {
    const { title } = req.body;
    if (!title) {
      return res.status(400).json({ message: "Title is required" });
    }
    const existingCategory = await Category.findOne({ title });
    if (existingCategory) {
      return res.status(400).json({ message: "Category already exists" });
    }
    const newCategory = new Category({
      title,
    });
    await newCategory.save();
    return res
      .status(201)
      .json({ message: "Category added successfully", category: newCategory });
  } catch (error) {
    console.error("Error in addCategory:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const getCategory = async (req, res) => {
  try {
    const category = await Category.find();
    res.status(200).json({
      success: true,
      category,
    });
  } catch (err) {
    console.log(err);
  }
};




export const categoryById = async(req,res)=>{
  try{
    const {id} = req.params;
    const category = await Category.findById(id).populate("blogs");
    res.status(200).json({
      success: true,
      blogs:category.blogs,
    });

  }catch(err){
    console.log(err);
  }

}




export const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const category_blogs = await Category.findById(id);
    if(category_blogs.blogs.length>0){
      return res.status(400).json({ message: "Category has blogs in it. Can't be deleted" });
    }
    const category = await Category.findByIdAndDelete(id);
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }
    return res.status(200).json({ message: "Category deleted successfully" });
  } catch (error) {
    console.error("Error in deleteCategory:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}


export const updateCategory  =async ()=>{
  try{
    const {id} = req.params
    const {title} = req.body
    const category = Category.findByIdAndUpdate(id,{title},{new:true})
    res.status(200).json({
      success: true,
      category,
    });

  }catch(err){
    console.log(err)

  }

}