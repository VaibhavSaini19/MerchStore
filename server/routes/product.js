const express = require("express");
const router = express.Router();

const { isSignedIn, isAuthenticated, isAdmin } = require("../controllers/auth");
const { getUserById } = require("../controllers/user");
const { getProductById, createProduct, getProduct, photo, deleteProduct, updateProduct, getAllProducts, getAllUniqueCategories } = require("../controllers/product");

router.param("userId", getUserById);
router.param("productId", getProductById);

router.post("/product/create/:userId", isSignedIn, isAuthenticated, isAdmin, createProduct);

router.get("/product/:productId", getProduct);
router.get("/product/photo/:productId", photo);
router.get("/products", getAllProducts);
router.get("/products/categories", getAllUniqueCategories);


router.delete("/product/:productId/:userId", isSignedIn, isAuthenticated, isAdmin, deleteProduct);

router.put("/product/:productId/:userId", isSignedIn, isAuthenticated, isAdmin, updateProduct);

module.exports = router;
