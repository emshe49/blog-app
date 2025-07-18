import mongoose, { mongo } from 'mongoose'
const Schema =  mongoose.Schema




const categorySchema = new Schema({
    title: { type: String, required: true },
    blogs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Blog' }],
});

const Category = mongoose.model('Category', categorySchema);
export default Category;



