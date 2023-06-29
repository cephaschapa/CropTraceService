import { Router } from 'express';
import * as auth from '../controllers/auth.controller.js';

export default function AuthRoutes(app) {
  const router = Router();
  router.post('/signup', auth.signup);
  router.post('/login', auth.login);
  router.get('/user/:id', auth.findUser);

  app.use('/api/auth', router);
}

