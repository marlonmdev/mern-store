import mongoose from 'mongoose';
import Product from '../models/product.model.js';

export const getProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json({ success: true, data: products });
  } catch (error) {
    console.error('Error fetching products:', error.message);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
}

export const createProduct = async (req, res) => {
  const product = req.body;
  
  if(!product.name || !product.price || !product.image) {
    return res.status(400).json({ success: false, message: 'All fields are required' });
  }

  const newProduct = new Product(product);

  try {
    await newProduct.save();
    res.status(201).json({ success: true, data: newProduct });
  } catch (error) {
    console.error('Error creating product:', error.message);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
}

export const updateProduct = async (req, res) => {
  const { id } = req.params;

  const product = req.body;
  // Check if the ID is a valid ObjectId
  if(!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ success: false, message: 'Invalid product ID' });
  }

  if(!product.name || !product.price || !product.image) {
    return res.status(400).json({ success: false, message: 'All fields are required' });
  }

  try {
    const updatedProduct = await Product.findByIdAndUpdate(id, product, { new: true });
    res.status(200).json({ success: true, data: updatedProduct });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Server error' });
  }
}

export const deleteProduct = async (req, res) => {
  const { id } = req.params;

  // Check if the ID is a valid ObjectId
  if(!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ success: false, message: 'Invalid product ID' });
  }

  try {
    await Product.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: 'Product deleted' });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Server error' });
  }
}