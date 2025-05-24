import express from 'express'; 
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import productRoutes from './routes/product.route.js';
import path from 'path';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

const __dirname = path.resolve();

app.use(express.json()); //allow express to parse JSON data

// app.use("/api/products", productRoutes);

// Try to register routes with error handling
try {
  console.log('Attempting to load product routes...');
  const productRoutes = await import('./routes/product.route.js');
  console.log('Product routes loaded successfully');
  
  app.use("/api/products", productRoutes.default);
  console.log('Product routes registered successfully');
} catch (error) {
  console.error('Error loading/registering product routes:', error);
  process.exit(1);
}

if(process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
  })
}
  
app.listen(PORT, () => {
  connectDB();
  console.log(`Server started on port http://localhost:${PORT}`);
});

