import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';

import ProductRoutes from './routes/product.routes.js';
import AuthRoutes from './routes/auth.routes.js';
import StatsRoutes from './routes/stats.routes.js';

const app = express();
const PORT = 3001;
// use 'mongodb://user:password@127.0.0.1:27017/greenupp' if you have auth enabled
const DB_URI = 'mongodb://127.0.0.1:27017/greenupp';
const CORS_OPTIONS = {
  origin: `http://localhost:3000`,
};

app.use(cors()); // CORS_OPTIONS
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

ProductRoutes(app);
AuthRoutes(app);
StatsRoutes(app);

async function main() {
  await mongoose.connect(DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }).then(() => {
    console.log('Connected to MongoDB database!')
  }).catch(err => {
    console.error('Can\'t connect to the database!', err);
    process.exit();
  });

  app.listen(PORT, () => {
    console.log('Server listening on', PORT)
  });
}

main().catch(err => console.err(err));

