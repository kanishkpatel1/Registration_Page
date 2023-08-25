const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const EmployeeModel = require('./models/Employee');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken'); // Import the jwt module
const cookieParser = require('cookie-parser');

const app = express();
app.use(express.json());
app.use(cors({
    origin: [""],
    methods: ["GET", "POST"],
    credentials: true
}));
app.use(cookieParser());

mongoose.connect("mongodb+srv://kanishkdeveshpatel:Kanishk7215@cluster0.a0fhq5f.mongodb.net/employee?retryWrites=true&w=majority");

const verifyUser = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        return res.json("Token is missing")
    } else {
        jwt.verify(token, "jwt-secret-key", (err, decoded) => {
            if (err) {
                return res.json("Error with token")
            } else {
                if (decoded.role === "admin") {
                    next();
                } else {
                    return res.status(403).json("Not admin");
                }
            }
        });
    }
};
app.get("/",(req,res)=>{
    res.json("Hello");
})
app.get('/dashboard', verifyUser, (req, res) => {
    res.json("Success");
});





app.post('/login', (req, res) => {
    const {email, password} = req.body;
    EmployeeModel.findOne({email: email})
    .then(user => {
        if(user) {
            bcrypt.compare(password, user.password, (err, response) => {
                if(response) {
                  const token = jwt.sign({email: user.email, role: user.role},
                        "jwt-secret-key", {expiresIn: '1d'})  
                    res.cookie('token', token)
                    return res.json({Status: "Success", role: user.role})
                }else {
                    return res.json("The password is incorrect")
                }
            })
        } else {
            return res.json("No record existed")
        }
    })
})

app.post('/register', (req, res) => {
    const { name, email, password } = req.body;
    bcrypt.hash(password, 10)
        .then(hash => {
            EmployeeModel.create({ name, email, password: hash })
                .then(employee => res.json("Success"))
                .catch(err => res.json(err))
        })
        .catch(err =>  res.json(err))
    })


app.listen(4444, () => {
    console.log("Server is running at http://localhost:4444");
});
