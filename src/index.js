import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';

import productsRoutes from './routes/products.js';
import categoriesRoutes from './routes/categories.js';

dotenv.config();
const server = express();
server.use(bodyParser.json());

server.use('/products', productsRoutes);
server.use('/categories', categoriesRoutes);

server.get('/users', (req, res) => {
    res.send('Hello form users');
});

server.listen(process.env.PORT, () => {
    console.log(`express is up and running on port ${process.env.PORT}`);
})