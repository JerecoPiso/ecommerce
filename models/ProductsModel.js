import db from "../config/database.js";

export const filteredProducts = (params, result) => {
    var queryString = "";
    var condition = "";
    var paramsValue = [];
    if(params.product.includes("category")){
        const product = params.product.split("_");
        queryString = "SELECT products.* FROM products LEFT JOIN category ON products.category_id = category.id WHERE category.category = ? AND products.archive <> ? ";
        if(params.filterby === "pricerange"){
            const pricerange = params.value.split("-");
            paramsValue = [product[1], 1, parseFloat(pricerange[0]), parseFloat(pricerange[1])];
            condition = "AND  products.price BETWEEN ? AND ?;";
        }else if(params.filter === "sold"){
            paramsValue = [product[1], 1];
            condition = `ORDER BY products.sold ${params.value.toUpperCase()};`;
        }else{
            paramsValue = [product[1], 1];
            condition = `ORDER BY products.price ${params.value.toUpperCase()};`;
        }
    }else if(params.product.includes("brand")){
        const product = params.product.split("_");
        queryString = "SELECT products.*  FROM products LEFT JOIN brand ON products.brand_id = brand.id WHERE brand.brand = ? AND products.archive <> ? ";
        if(params.filterby === "pricerange"){
            const pricerange = params.value.split("-");
            paramsValue = [product[1], 1, parseFloat(pricerange[0]), parseFloat(pricerange[1])];
            condition = "AND products.price BETWEEN ? AND ?;";
        }else if(params.filter === "sold"){
            paramsValue = [product[1], 1];
            condition = `ORDER BY products.sold ${params.value.toUpperCase()};`;
        }else{
            paramsValue = [product[1], 1];
            condition = `ORDER BY products.price ${params.value.toUpperCase()};`;
        }
    }else{
        queryString = "SELECT * FROM products WHERE archive <> ? ";
        if(params.filterby === "pricerange"){
            const pricerange = params.value.split("-");
            paramsValue = [1, parseFloat(pricerange[0]), parseFloat(pricerange[1])];
            condition = "AND price BETWEEN ? AND ?;";
        }else if(params.filter === "sold"){
            paramsValue = [1];
            condition = `ORDER BY sold ${params.value.toUpperCase()};`;
        }else{
            paramsValue = [1];
            condition = `ORDER BY price ${params.value.toUpperCase()};`;
        }
    }
    db.query(queryString+condition, paramsValue, (err, results) => {
        if (err) {
            console.log(err)
            result(err, null)
        } else {
            result(null, results)
        }
    })
}
export const addStocks = (stocks, id, result) => {
    db.query("UPDATE products SET stocks = ? WHERE id = ?;", [stocks, id], (err, results) => {
        if (err) {
            console.log(err)
            result(err, null)
        } else {
            result(null, results)
        }
    })
}

export const insert = (data, table, result) => {
    db.query("INSERT INTO " + table + " SET ?", [data], (err, results) => {
        if (err) {
            console.log(err);
            result(err, null);
        } else {
            result(null, results);
        }
    })
}
export const getProducts = (result) => {
    var sql = "SELECT p.id, p.product_name, p.price, p.stocks, p.description, p.img_name, p.sold, category.category, brand.brand FROM products AS p LEFT JOIN category ON p.category_id=category.id LEFT JOIN brand ON p.brand_id = brand.id WHERE p.stocks > ? AND p.archive <> ? ORDER BY p.id DESC;"
    db.query(sql, [0, 1], (err, results) => {
        if (err) {
            console.log(err);
            result(err, null);
        } else {
            result(null, results);
        }
    });
}
export const getProductsForDataTable = (search, result) => {
    var sql = "SELECT p.id, p.product_name, p.price, p.stocks, p.description, p.img_name, p.sold, category.category, brand.brand FROM products AS p LEFT JOIN category ON p.category_id=category.id LEFT JOIN brand ON p.brand_id = brand.id WHERE p.stocks > ? AND p.archive <> ? AND p.product_name LIKE ? OR p.stocks > ? AND p.archive <> ? AND category.category LIKE ? OR p.stocks > ? AND p.archive <> ? AND brand.brand LIKE ? ORDER BY p.id DESC;"
    db.query(sql, [0, 1, "%" + search + "%", 0, 1, "%" + search + "%", 0, 1, "%" + search + "%"], (err, results) => {
        if (err) {
            console.log(err);
            result(err, null);
        } else {
            result(null, results);
        }
    });
}
export const getProductCategoryForDataTable = (search, result) => {
    var sql = "SELECT * FROM category WHERE category LIKE ? AND archive <> ? ORDER BY id DESC;"
    db.query(sql, ["%" + search + "%", 1], (err, results) => {
        if (err) {
            result(err, null);
        } else {
            result(null, results);
        }
    });
}
export const getProductBrandForDataTable = (search, result) => {
    var sql = "SELECT * FROM brand WHERE brand LIKE ? and archive <> ? ORDER BY id DESC;"
    db.query(sql, ["%" + search + "%", 1], (err, results) => {
        if (err) {
            result(err, null);
        } else {
            result(null, results);
        }
    });
}
export const getOutOfStocks = (result) => {
    db.query("SELECT * FROM products WHERE stocks = ? AND archive <> ? ORDER BY id DESC;", [0, 1], (err, results) => {

        if (err) {
            console.log(err);
            result(err, null);
        } else {
            result(null, results);
        }
    });
}
export const getPopularProduct = (result) => {
    db.query("SELECT * FROM products WHERE archive <> ? AND sold <> ? ORDER BY sold DESC LIMIT 6;", [1, 0], (err, results) => {
        if (err) {
            console.log(err);
            result(err, null);
        } else {
            result(null, results);
        }
    });
}
export const getCategory = (result) => {
    db.query("SELECT * FROM category WHERE archive <> ? ORDER BY id DESC;", [1], (err, results) => {
        if (err) {
            console.log(err);
            result(err, null);
        } else {
            result(null, results);
        }
    });
}
export const getBrands = (result) => {
    db.query("SELECT * FROM brand WHERE archive <> ? ORDER BY id DESC;", [1], (err, results) => {
        if (err) {
            console.log(err);
            result(err, null);
        } else {
            result(null, results);
        }
    });
}
export const getRecentProducts = (result) => {
    db.query("SELECT * FROM products WHERE archive <> ? ORDER BY id DESC LIMIT 6;", [1], (err, results) => {
        if (err) {
            result(err, null)
        } else {
            result(null, results)
        }
    });
}

export const archiveProductById = (id, result) => {
    db.query("UPDATE products SET archive = ? WHERE id = ?", [1, id], (err, results) => {
        if (err) {
            console.log(err);
            result(err, null);
        } else {
            result(null, results);
        }
    });
}
export const archiveBrandById = (id, result) => {
    db.query("UPDATE brand SET archive = ? WHERE id = ?", [1, id], (err, results) => {
        if (err) {
            console.log(err);
            result(err, null);
        } else {
            result(null, results);
        }
    });
}
export const archiveCategoryById = (id, result) => {
    db.query("UPDATE category SET archive = ? WHERE id = ?", [1, id], (err, results) => {
        if (err) {
            console.log(err);
            result(err, null);
        } else {
            result(null, results);
        }
    });
}
export const getProductById = (id, result) => {
    db.query("SELECT p.product_name, p.stocks, p.price, p.description, p.img_name, p.sold, brand.brand, category.category FROM products AS p LEFT JOIN category ON category.id=p.category_id LEFT JOIN brand ON brand.id = p.brand_id WHERE p.id = ?", [id], (err, results) => {
        if (err) {
            console.log(err);
            result(err, null);
        } else {
            result(null, results[0]);
        }
    });
}

export const getProductByCategory = (category, result) => {
    db.query("SELECT products.* FROM products LEFT JOIN category ON products.category_id=category.id WHERE category.category = ? AND products.archive <> ?;", [category, 1], (err, results) => {
        if (err) {
            console.log(err);
            result(err, null);
        } else {
            result(null, results);
        }
    })
}
export const getProductByBrand = (brand, result) => {
    db.query("SELECT products.* FROM products LEFT JOIN brand ON products.brand_id=brand.id WHERE brand.brand = ? AND products.archive <> ?", [brand, 1], (err, results) => {
        if (err) {
            console.log(err);
            result(err, null);
        } else {
            result(null, results);
        }
    })
}
export const getSuggestedProductByCategory = (category, result) => {
    db.query("SELECT products.* FROM products LEFT JOIN category ON products.category_id=category.id WHERE category.category != ? AND products.archive <> ? LIMIT 12;", [category, 1], (err, results) => {
        if (err) {
            console.log(err);
            result(err, null);
        } else {
            result(null, results);
        }
    })
}
export const getSuggestedProductByBrand = (brand, result) => {
    db.query("SELECT products.* FROM products LEFT JOIN brand ON products.brand_id=brand.id WHERE brand.brand != ? AND products.archive <> ? LIMIT 12;", [brand, 1], (err, results) => {
        if (err) {
            console.log(err);
            result(err, null);
        } else {
            result(null, results);
        }
    })
}

export const updateBrandById = (brand, id, result) => {
    db.query("UPDATE brand SET brand = ?  WHERE id = ?;", [brand, id], (err, results) => {
        if (err) {
            result(err, null);
        } else {
            result(null, results);
        }
    })
}
export const updateCategoryById = (category, id, result) => {
    db.query("UPDATE category SET category = ?  WHERE id = ?;", [category, id], (err, results) => {
        if (err) {
            result(err, null);
        } else {
            result(null, results);
        }
    })
}