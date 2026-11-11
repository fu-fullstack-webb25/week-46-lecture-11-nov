import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import authRouter from './routes/auth.routes.js';
import productsRouter from './routes/products.routes.js';
import checkoutRouter from './routes/checkout.routes.js';
import cookieParser from 'cookie-parser';

const app = express();
const PORT : number = Number(process.env.PORT) || 8081;

app.use(express.json());
app.use(cors({
    origin : 'http://localhost:5173',
    credentials : true
}));
app.use(cookieParser())

app.use('/api/auth', authRouter);
app.use('/api/products', productsRouter);
app.use('/api/checkout', checkoutRouter);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}...`);
});