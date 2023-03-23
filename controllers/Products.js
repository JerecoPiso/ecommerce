	
// Import function from Product Model
import {    addStocks,
            getProducts,archiveProductById, archiveCategoryById, getOutOfStocks ,archiveBrandById,
            getRecentProducts, getCategory, getBrands, getProductById, getProductByCategory, 
            getProductByBrand, getPopularProduct, getSuggestedProductByCategory, getSuggestedProductByBrand, insert, updateBrandById, updateCategoryById
       } from "../models/productsModel.js";


export const addStock = (req, res) => {
   addStocks(req.body.stocks,req.params.id,(err, results) => {
        if (err){
            res.send(err);
        }else{
            res.json(results);
        }
   })
}
export const showProducts = (req, res) => {
    getProducts((err, results)=>{
        if (err){
            res.send(err);
        }else{
            res.json(results);
        }
    })
}
export const showCategory = (req, res) => {
    getCategory((err, results)=>{
        if (err){
            res.send(err);
        }else{
            res.json(results);
        }
    })
}
export const showPopularProduct = (req, res) => {
    getPopularProduct((err, results)=>{
        if (err){
            res.send(err);
        }else{
            res.json(results);
        }
    })
}
export const showOutOfStocks = (req, res) => {
    getOutOfStocks((err, results)=>{
        if (err){
            res.send(err);
        }else{
            res.json(results);
        }
    })
}
export const showBrands = (req, res) => {
    getBrands((err, results)=>{
        if (err){
            res.send(err);
        }else{
            res.json(results);
        }
    })
}
export const showRecentProducts = (req, res) => {
    getRecentProducts((err, results) => {
        if(err){
            res.send(err);
        }else{
            res.json(results)
        }
    })
}
export const archiveProduct = (req, res) => {
    const id = req.params.id;
    archiveProductById(id, (err, results) => {
        if (err){
            res.send(err);
        }else{
            res.json(results);
        }
    });
}
export const archiveCategory = (req, res) => {
    const id = req.params.id;
    archiveCategoryById(id, (err, results) => {
        if(err){
            res.send(err);
        }else{
            res.json(results)
        }
    })
}
export const archiveBrand = (req, res) => {
    const id = req.params.id;
    archiveBrandById(id, (err, results) => {
        if(err){
            res.send(err);
        }else{
            res.json(results)
        }
    })
}
// Create New Product
export const createProduct = (req, res) => {
    var file = req.files.photo;
    var position = file.name.lastIndexOf(".");
    var extension = file.name.substring(position, file.name.length)
    var image_name = file.md5+extension
    const data = 
    {
        category_id: req.body.category,
        brand_id: req.body.brand,
        product_name: req.body.pname,
        price: req.body.price,
        stocks: req.body.stocks,
        description: req.body.description,
        img_name: image_name
    }
    file.mv("../frontend/public/images/"+image_name)
    insert(data,"products",(err, results) => {
        if (err){
            res.json({err: true, message: "An error has occured", responseType: "error"})
        }else{
            res.json({err: false, message: "Product added successfully", responseType: "success"})
        }
    });
}

export const createCategory = (req,res) =>{
    const data = req.body
    insert(data,"category", (err, results) => {
        if (err){
            res.json({err: true, message: "An error has occured", responseType: "error"})
        }else{
            res.json({err: false, message: "Category added successfully", responseType: "success"})
        }
    })
}
export const createBrand = (req,res) =>{
    const data = req.body
    insert(data,"brand", (err, results) => {
        if (err){
            res.json({err: true, message: "An error has occured", responseType: "error"})
        }else{
            res.json({err: false, message: "Brand added successfully", responseType: "success"})
        }
    })
}

export const showProductById = (req, res) => {
    getProductById(req.params.id, (err, results) => {
        if (err){
            res.send(err);
        }else{
            res.json(results);
        }
    })
}

export const showProductByCategory = (req, res) => {
    getProductByCategory(req.params.category, (err, results) => {
        if (err){
            res.send(err);
        }else{
            res.json(results);
        }
    })
}

export const showProductByBrand = (req, res) => {
    getProductByBrand(req.params.brand, (err, results) => {
        if (err){
            res.send(err);
        }else{
            res.json(results);
        }
    })
}
export const showSuggestedProductByCategory = (req, res) => {
    getSuggestedProductByCategory(req.params.category, (err, results) => {
        if (err){
            res.send(err);
        }else{
            res.json(results);
        }
    })
}
export const showSuggestedProductByBrand = (req, res) => {
    getSuggestedProductByBrand(req.params.brand, (err, results) => {
        if (err){
            res.send(err);
        }else{
            res.json(results);
        }
    })
}

export const updateBrand = (req, res) => {
    updateBrandById(req.body.brand, req.params.id, (err, results) => {
        if (err){
            res.send(err);
        }else{
            res.json({err: false, message: "Brand updated successfully", responseType: "success"})
        }
    })
}

export const updateCategory = (req, res) => {
    updateCategoryById(req.body.category, req.params.id, (err, results) => {
        if (err){
            res.send(err);
        }else{
            res.json({err: false, message: "Category updated successfully", responseType: "success"})
        }
    })
}
