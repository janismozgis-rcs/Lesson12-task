// import express from 'express';
import { Router } from 'express';
import { storeProduct, getAllProducts, 
    getProductById, 
    updateProduct, deleteProduct } from '../models/Product.js';

// const router = express.Router();
const router = Router();

// GET     https://bloggy.com/products
// POST    https://bloggy.com/products             {"description": "foo", "name": "bar", "price": 10.1, "category": 3}
// GET     https://bloggy.com/products/{id}
// PUT     https://bloggy.com/products/{id}        {"description": "baz", "name": "biz", "price": 10.1, "category": 3}
// DELETE  https://bloggy.com/products/{id}

router.get('/', (req, res) => {
    const products = getAllProducts();
    res.json(products);
});

router.get('/:id', (req, res) => {
    const { id } = req.params;
    const product = getProductById(id);
    if (product) {
        res.json(product);
        return;
    }

    res.status(404).json({error: 'Not found'});
});

router.post('/', (req, res) => {
    storeProduct(req.body);
    res.json({success: true});
});

router.put('/:id', (req, res) => {
    const { id } = req.params;
    const product = getProductById(id);
    if (!product) {
        res.status(404).json({error: 'Not found'});
        return;
    }

    updateProduct(id, product, req.body)

    res.json({success: true});
});

router.delete('/:id', (req, res) => {
    const { id } = req.params;
    const product = getProductById(id);
    if (!product) {
        res.status(404).json({error: 'Not found'});
        return;
    }

    deleteProduct(id);

    res.json({success: true});
});

export default router;


