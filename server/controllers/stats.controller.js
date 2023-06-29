import { User } from '../models/user.model.js';
import { Product } from '../models/product.model.js';

export async function calculateStats(_req, res) {
  const userCount = await User.count({});
  const productCount = await Product.count({});
  const farms = await Product.distinct('farmName').exec();

  res.send({
    userCount,
    productCount,
    farmCount: farms.length,
  });
}

