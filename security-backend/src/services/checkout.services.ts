import Stripe from 'stripe';

const apiKey = process.env.STRIPE_SECRET_KEY;

if(!apiKey) throw new Error('Stripe secret key is missing');

const stripe = new Stripe(apiKey);

export const createCheckoutSession = async () => {
    const session = await stripe.checkout.sessions.create(
        {
            mode : 'payment',
            line_items : [
                {
                    price_data : {
                        currency : 'sek',
                        product_data : {
                            name : 'SlowPokeTail Roast'
                        },
                        unit_amount : 14900
                    },
                    quantity : 1
                }
            ],
            success_url : 'http://localhost:5173/success',
            cancel_url : 'http://localhost:5173/cancel'
        }
    );

    return session.url;
}