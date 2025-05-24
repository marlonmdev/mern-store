import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name:{
    type: String,
    required: true,
  }, 
  price: {
    type: Number,
    required: true,
  },
  image: { 
    type: String,
    required: true,
  }
}, {
  timestamps: true, //createAt and updateAt
});

const Product = mongoose.model('Product', productSchema);

export default Product;