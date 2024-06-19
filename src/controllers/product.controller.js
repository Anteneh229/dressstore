const Product = require('../models/product.model');

// GET all products
exports.getAllProducts = (req, res) => {
    const { name } = req.query;
    let condition = name ? { name: { $regex: new RegExp(name), $options: 'i' } } : {};

    Product.find(condition)
        .then(products => {
            res.json(products);
        })
        .catch(err => {
            res.status(500).json({
                message: err.message || 'Some error occurred while retrieving products.'
            });
        });
};

// GET product by ID
exports.getProductById = (req, res) => {
    Product.findById(req.params.id)
        .then(product => {
            if (!product) {
                return res.status(404).json({ message: 'Product not found.' });
            }
            res.json(product);
        })
        .catch(err => {
            res.status(500).json({
                message: err.message || 'Error retrieving product with id ' + req.params.id
            });
        });
};

// POST add new product
exports.addProduct = (req, res) => {
    const newProduct = new Product({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        quantity: req.body.quantity,
        category: req.body.category
    });

    newProduct.save()
        .then(product => {
            res.status(201).json(product);
        })
        .catch(err => {
            res.status(500).json({
                message: err.message || 'Some error occurred while creating the product.'
            });
        });
};

// PUT update product by ID
exports.updateProductById = (req, res) => {
    Product.findByIdAndUpdate(req.params.id, req.body, { new: true })
        .then(product => {
            if (!product) {
                return res.status(404).json({ message: 'Product not found.' });
            }
            res.json(product);
        })
        .catch(err => {
            res.status(500).json({
                message: err.message || 'Error updating product with id ' + req.params.id
            });
        });
};

// DELETE remove product by ID
exports.removeProductById = (req, res) => {
    Product.findByIdAndRemove(req.params.id)
        .then(product => {
            if (!product) {
                return res.status(404).json({ message: 'Product not found.' });
            }
            res.json({ message: 'Product deleted successfully!' });
        })
        .catch(err => {
            res.status(500).json({
                message: err.message || 'Error deleting product with id ' + req.params.id
            });
        });
};

// DELETE remove all products
exports.removeAllProducts = (req, res) => {
    Product.deleteMany({})
        .then(() => {
            res.json({ message: 'All products removed successfully!' });
        })
        .catch(err => {
            res.status(500).json({
                message: err.message || 'Some error occurred while removing all products.'
            });
        });
};

// GET find all products with name containing 'kw'
exports.findProductsByName = (req, res) => {
    const { name } = req.query;
    Product.find({ name: { $regex: new RegExp(name), $options: 'i' } })
        .then(products => {
            res.json(products);
        })
        .catch(err => {
            res.status(500).json({
                message: err.message || 'Some error occurred while finding products by name.'
            });
        });
};
