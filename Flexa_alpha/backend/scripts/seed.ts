import dotenv from 'dotenv';
dotenv.config();

import { ProductModel } from '../src/models/productModel';
import fs from 'fs';
import path from 'path';
import csv from 'csv-parser';
import mongoose from 'mongoose';

interface CsvProduct {
  id: string;
  name: string;
  description: string;
  price: string;
  category: string;
  condition: string;
  size: string;
  image_url: string;
  stock: string;
  created_at: string;
  updated_at: string;
}

async function connectDB() {
  try {
    const conn = await mongoose.connect(
      process.env.MONGODB_URI || 'mongodb://localhost/tsmernamazonadb'
    );
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error('Database connection error:', error);
    process.exit(1);
  }
}

async function seedDatabase() {
  try {
    await connectDB();

    const csvFilePath = path.join(__dirname, '..', 'data', 'products.csv');

    if (!fs.existsSync(csvFilePath)) {
      console.error(`❌ CSV file not found at: ${csvFilePath}`);
      process.exit(1);
    }

    const products: CsvProduct[] = [];

    await new Promise<void>((resolve, reject) => {
      fs.createReadStream(csvFilePath)
        .pipe(csv({ separator: ';' }))
        .on('data', (data) => {
          if (data.name && data.name !== 'name') {
            products.push(data);
          }
        })
        .on('end', () => resolve())
        .on('error', (err) => reject(err));
    });

    console.log(`📖 Read ${products.length} products from CSV`);

    const transformedProducts = products.map((product) => ({
      name: product.name,
      slug: product.name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, ''),
      image: product.image_url,
      brand: product.name.split(' ')[0],
      category: product.category,
      description: product.description,
      price: parseFloat(product.price),
      countInStock: parseInt(product.stock),
      rating: Math.floor(Math.random() * 3) + 3,
      numReviews: Math.floor(Math.random() * 50) + 1,
    }));

    await ProductModel.deleteMany({});
    console.log('🧹 Cleared existing products');

    // Batch insert to avoid message size errors
    const batchSize = 100;
    for (let i = 0; i < transformedProducts.length; i += batchSize) {
      const batch = transformedProducts.slice(i, i + batchSize);
      await ProductModel.insertMany(batch);
    }

    console.log(`✅ Successfully seeded ${transformedProducts.length} products to database`);

    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
