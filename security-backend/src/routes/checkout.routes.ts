import { Router, type Request, type Response } from 'express';
import { createCheckoutSession } from '../services/checkout.services.js';
import { requireAuth } from '../middlewares/requireAuth.js';

const router = Router();

router.post('/', requireAuth, async (req : Request, res : Response) => {
    try {
        const url = await createCheckoutSession();
        res.json({ url });
    } catch(error) {
        console.error('Checkout error:', error);
        res.status(500).json({ message : 'Could not create checkout session' })
    }
});

export default router;