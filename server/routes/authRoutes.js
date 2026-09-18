const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/users");

const router = express.Router();


// =====================================================
// REGISTER
// =====================================================

router.post("/register", async (req, res) => {
    try {

        const {
            name,
            email,
            password,
            role
        } = req.body;


        // =============================================
        // VALIDATE REQUIRED FIELDS
        // =============================================

        if (
            !name ||
            !email ||
            !password ||
            !role
        ) {

            return res.status(400).json({
                message:
                    "All fields are required"
            });
        }


        // =============================================
        // VALIDATE ROLE
        // =============================================

        if (
            ![
                "DONOR",
                "RECEIVER"
            ].includes(role)
        ) {

            return res.status(400).json({
                message:
                    "Invalid role"
            });
        }


        // =============================================
        // CHECK EXISTING USER
        // =============================================

        const existingUser =
            await User.findOne({
                email: email.toLowerCase()
            });


        if (existingUser) {

            return res.status(400).json({
                message:
                    "User with this email already exists"
            });
        }


        // =============================================
        // HASH PASSWORD
        // =============================================

        const hashedPassword =
            await bcrypt.hash(
                password,
                10
            );


        // =============================================
        // CREATE USER
        // =============================================

        const newUser =
            new User({

                name,

                email:
                    email.toLowerCase(),

                password:
                    hashedPassword,

                role

            });


        const savedUser =
            await newUser.save();


        // =============================================
        // RESPONSE
        // =============================================

        res.status(201).json({

            message:
                "User registered successfully",

            user: {

                id:
                    savedUser._id,

                name:
                    savedUser.name,

                email:
                    savedUser.email,

                role:
                    savedUser.role

            }

        });

    } catch (error) {

        console.error(
            "Registration error:",
            error.message
        );

        res.status(500).json({
            message:
                "Registration failed"
        });
    }
});


// =====================================================
// LOGIN
// =====================================================

router.post("/login", async (req, res) => {
    try {

        const {
            email,
            password
        } = req.body;


        // =============================================
        // VALIDATE INPUT
        // =============================================

        if (
            !email ||
            !password
        ) {

            return res.status(400).json({
                message:
                    "Email and password are required"
            });
        }


        // =============================================
        // FIND USER
        // =============================================

        const user =
            await User.findOne({
                email:
                    email.toLowerCase()
            });


        if (!user) {

            return res.status(401).json({
                message:
                    "Invalid email or password"
            });
        }


        // =============================================
        // CHECK PASSWORD
        // =============================================

        const passwordMatch =
            await bcrypt.compare(
                password,
                user.password
            );


        if (!passwordMatch) {

            return res.status(401).json({
                message:
                    "Invalid email or password"
            });
        }


        // =============================================
        // CREATE JWT TOKEN
        // =============================================

        const token =
            jwt.sign(

                {
                    id:
                        user._id.toString(),

                    name:
                        user.name,

                    email:
                        user.email,

                    role:
                        user.role
                },

                process.env.JWT_SECRET,

                {
                    expiresIn:
                        "7d"
                }
            );


        // =============================================
        // SEND RESPONSE
        // =============================================

        res.status(200).json({

            message:
                "Login successful",

            token,

            user: {

                id:
                    user._id,

                name:
                    user.name,

                email:
                    user.email,

                role:
                    user.role

            }

        });

    } catch (error) {

        console.error(
            "Login error:",
            error.message
        );

        res.status(500).json({
            message:
                "Login failed"
        });
    }
});


module.exports = router;