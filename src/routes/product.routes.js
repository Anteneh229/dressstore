const express = require('express');
const router = express.Router();
const productController = require('../controllers/product.controller');

// GET all products
router.get('/', productController.getAllProducts);

// GET product by ID
router.get('/:id', productController.getProductById);

// POST add new product
router.post('/', productController.addProduct);

// PUT update product by ID
router.put('/:id', productController.updateProductById);

// DELETE remove product by ID
router.delete('/:id', productController.removeProductById);

// DELETE remove all products
router.delete('/', productController.removeAllProducts);

module.exports = router;
