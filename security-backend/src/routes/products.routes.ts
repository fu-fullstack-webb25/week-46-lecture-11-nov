import { Router, type Request, type Response } from 'express';
import { products } from '../data/products.js';
import { requireAuth } from '../middlewares/requireAuth.js';

const router = Router();

router.get('/', requireAuth, (req : Request, res : Response) => {
    res.json(products);
});

export default router;