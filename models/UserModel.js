// import connection
import db from "../config/database.js";

export const addNewToCart = (data, result) =>{
    db.query("INSERT INTO cart SET ?;", [data], (err, results) => {
        if (err) {
            result(err, null)
        } else {
            result(null, results)
        }
    })
}
export const getCartByUserId = (userId, result) => {
    db.query("SELECT orders.id AS orderid, orders.quantity, products.* FROM orders LEFT JOIN products ON orders.product_id = products.id WHERE user_id = ? ORDER BY id DESC;",[userId], (err, results) => {
        if (err) {
            result(err, null)
        } else {
            result(null, results)
        }
    })
}
export const getUsers = (verify, result) => {
    db.query("SELECT * FROM users WHERE verified = ?;", [verify], (err, results) => {
        if (err) {
            result(err, null)
        } else {
            result(null, results)
        }
    })
}
// Insert Product to Database
export const insertUser = (data, result) => {
    db.query("INSERT INTO users SET ?", [data], (err, results) => {
        if (err) {
            console.log(err);
            result(err, null);
        } else {
            result(null, results);
        }
    });
}
export const insertPAT = (data, result) => {
    db.query("INSERT INTO personal_access_tokens SET ?", [data], (err, results) => {
        if (err) {
            console.log(err);
            result(err, null);
        } else {
            result(null, results);
        }
    })
}
export const getUser = (email, result) => {
    db.query("SELECT id, email, password, username FROM users WHERE email = ?", [email], (err, results) => {
        if (err) {

            result(err, null);
        } else {
            result(null, results[0]);
        }
    });
}

export const getAuthenticated = (token, result) => {
    db.query("SELECT users.id as userid, pat.id, users.email, users.username, pat.token FROM personal_access_tokens AS pat LEFT JOIN users ON pat.user_id=users.id WHERE pat.token = ?;", [token], (err, results) => {
        if (err) {
            result(err, null);
        } else {
            result(null, results[0]);
        }
    });
}

export const logoutUser = (token, result) => {
    db.query("DELETE FROM personal_access_tokens WHERE token = ?", [token], (err, results) => {
        if (err) {
            result(err, null);
        } else {
            result(null, results);
        }
    });
}