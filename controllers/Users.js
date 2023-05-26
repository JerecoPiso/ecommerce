// Import function from User Model
import { insertUser, getUser, insertPAT, getAuthenticated, logoutUser, getUsers } from "../models/userModel.js";
import passwordHash from "password-hash";
import jwt from 'jsonwebtoken'

export const loginUser = (req, res) => {

    getUser(req.body.email, (err, results) => {
        if (err) {
            res.send(err);
        } else {
            if (results != null) {

                var match = passwordHash.verify(req.body.password, results.password)

                if (match) {

                    const user = {
                        email: req.body.email,
                        username: results.username,
                        id: results.id
                    }
                    const secret_token = jwt.sign(user, '${process.env.JWT_KEY}');
                    const data = {
                        user_id: results.id,
                        token: secret_token
                    }
                    insertPAT(data, (err, patResults) => {
                        if (err) {
                            res.send(err);
                        } else {

                            res.json({
                                secret_token,
                                user,
                            });
                        }
                    })

                    //res.json({err: false, message: "Loggin successfully", responseType: "success"})
                } else {
                    res.json({ err: true, message: "Incorrect password", responseType: "error" })
                }
            } else {
                res.json({ err: true, message: "No email found", responseType: "error" })
            }
        }
    });
}
//Create New User
export const createUser = (req, res) => {
    req.body.password = passwordHash.generate(req.body.password);
    const data = req.body;
    insertUser(data, (err, results) => {
        if (err) {
            res.send(err);
        } else {

            res.json(results);
        }
    });
}

export const checkIfAuth = (req, res) => {
    // console.log(req.body.token)
    getAuthenticated(req.body.token, (err, results) => {
        if (err) {
            res.json({ loggin: false })
        } else {
            if (results !== undefined) {
                const user = {
                    email: results.email,
                    username: results.username
                }
                const secret_token = results.token

                res.json({
                    user,
                    secret_token
                });
            } else {
                res.json({ loggin: false })
            }
        }
    })
}

export const logout = (req, res) => {
    logoutUser(req.body.token, (err, results) => {
        if (err) {
            res.send(err);
        } else {
            res.json({ err: false, message: "Logout successfully", responseType: "success" })
        }
    })
}

export const showVerifiedUsers = (req, res) => {
    getUsers((1), (err, results) => {
        if (err) {
            res.send(err);
        } else {
            res.json(results);
        }
    })
}

export const showUnVerifiedUsers = (req, res) => {
    getUsers((0), (err, results) => {
        if (err) {
            res.send(err);
        } else {
            res.json(results);
        }
    })
}