// import express
import express from "express";
// import function from controller
//import { showProducts, showProductById, createProduct, updateProduct, deleteProduct } from "../controllers/Product.js";
import { createUser, loginUser, checkIfAuth, logout, showUnVerifiedUsers, showVerifiedUsers, addToCart, getCartByUser } from "../controllers/Users.js";
import { showProductBrandToDataTable, showProductCategoryToDataTable, showProductsToDataTable, filterProducts,
    createProduct, showProducts, archiveProduct, archiveCategory, archiveBrand, showRecentProducts, showBrands, addStock,
    createCategory, createBrand, showCategory, showProductById, showProductByCategory,
    showProductByBrand, showPopularProduct, showSuggestedProductByCategory, showSuggestedProductByBrand, showOutOfStocks, updateBrand, updateCategory
} from "../controllers/Products.js";
// init express router
const router = express.Router();
// Create
router.post("/createUser", createUser);
router.post("/admin/createProduct", createProduct);
router.post("/admin/createCategory", createCategory);
router.post("/admin/createBrand", createBrand);
router.post("/addToCart", addToCart);
router.post("/getCartByUser", addToCart);
router.post("/filterProducts", filterProducts);
router.post("/logout", logout);

// Read
router.get("/admin/showProducts", showProducts);
router.get("/admin/showCategory", showCategory);
router.get("/admin/showBrands", showBrands);
router.get("/getPopularProduct", showPopularProduct);
router.get("/getRecentProducts", showRecentProducts);
router.get("/admin/getoutofstock", showOutOfStocks);
router.get("/admin/getverifiedusers", showVerifiedUsers);
router.get("/admin/getunverifiedusers", showUnVerifiedUsers);
router.get("/product/:id", showProductById);
router.get("/product/category/:category", showProductByCategory);
router.get("/product/brand/:brand", showProductByBrand);
router.post("/checkIfAuthenticated", checkIfAuth);
router.get("/showSuggestedProductByCategory/:category", showSuggestedProductByCategory);
router.get("/showSuggestedProductByBrand/:brand", showSuggestedProductByBrand);
router.get("/admin/showProductsToDataTable", showProductsToDataTable);
router.get("/admin/showProductCategoryToDataTable", showProductCategoryToDataTable);
router.get("/admin/showProductBrandToDataTable", showProductBrandToDataTable);
router.get("/getCartByUser/:userid", getCartByUser);

// Update
router.put("/admin/archiveProduct/:id", archiveProduct);
router.put("/admin/archiveCategory/:id", archiveCategory);
router.put("/admin/archiveBrand/:id", archiveBrand);
router.put("/admin/addStocks/:id", addStock);
router.put("/admin/updateBrand/:id", updateBrand);
router.put("/admin/updateCategory/:id", updateCategory);
router.post("/loginUser", loginUser);

// export default router
export default router;