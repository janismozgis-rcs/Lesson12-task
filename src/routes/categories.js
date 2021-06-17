// import express from 'express';
import { Router } from 'express';
import { storeCategory, getAllCategories, 
    getCategoryById, 
    updateCategory, deleteCategory } from '../models/Category.js';

// const router = express.Router();
const router = Router();

// GET     https://bloggy.com/categories
// POST    https://bloggy.com/categories             {"description": "foo", "name": "bar"}
// GET     https://bloggy.com/categories/{id}
// PUT     https://bloggy.com/categories/{id}        {"description": "baz", "name": "biz"}
// DELETE  https://bloggy.com/categories/{id}

router.get('/', (req, res) => {
    const Categories = getAllCategories();
    res.json(Categories);
});

router.get('/:id', (req, res) => {
    const { id } = req.params;
    const category = getCategoryById(id);
    if (category) {
        res.json(category);
        return;
    }

    res.status(404).json({error: 'Not found'});
});

router.post('/', (req, res) => {
    storeCategory(req.body);
    res.json({success: true});
});

router.put('/:id', (req, res) => {
    const { id } = req.params;
    const category = getCategoryById(id);
    if (!category) {
        res.status(404).json({error: 'Not found'});
        return;
    }

    updateCategory(id, category, req.body)

    res.json({success: true});
});

router.delete('/:id', (req, res) => {
    const { id } = req.params;
    const category = getCategoryById(id);
    if (!category) {
        res.status(404).json({error: 'Not found'});
        return;
    }

    deleteCategory(id);

    res.json({success: true});
});

export default router;


