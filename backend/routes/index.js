const express = require('express');
const authRoutes = require('./authRoutes');
const product = require('./carRoutes');

const router = express.Router();


router.use('/auth', authRoutes);
router.use('/product', product);


module.exports = router;
