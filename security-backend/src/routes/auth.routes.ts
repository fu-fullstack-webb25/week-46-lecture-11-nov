import { Router, type Request, type Response } from 'express';
import type { LoginBody, RegisterBody } from '../types/auth.types.js';
import { users } from '../data/users.js';
import { signToken } from '../utils/jwt.js';

const router = Router();

router.post('/register', 
    (
        req : Request<{}, {}, RegisterBody>, 
        res : Response
    ) => {
    const { username, password, role = 'user' } = req.body;
    if(users.some(user => user.username === username)) {
        res.status(400).json({ message : 'Username already exists' });
    }
    users.push({
        username,
        password,
        role
    });

    res.status(201).json({ message : 'User created' });
});

router.post(
    '/login',
    (
        req : Request<{}, {}, LoginBody>,
        res : Response
    ) => {
    const { username, password } = req.body;
    
    const user = users.find(user => user.username === username);

    if(!user || user.password !== password) {
        return res.status(400).json({ message : 'Invalid credentials' });
    }

    const token = signToken({ username, role : user.role });
    console.log(token);

    res.cookie('token', token, {
        httpOnly : true,
        secure : true,
        sameSite : 'strict'
    });

    res.json({ message : 'Login successful'});
    }
)

export default router;