import { Router } from 'express';
import * as products from '../controllers/product.controller.js';

export default function ProductRoutes(app) {
  const router = Router();
  router.post('/', products.create);
  router.get('/', products.findAll);
  router.get('/certified', products.findAllCertified);
  router.get('/:id', products.findOne);
  router.put('/:id', products.update);
  router.delete('/:id', products.remove);

  app.use('/api/product', router);
}

