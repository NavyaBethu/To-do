const express = require("express");
const router=express.Router();
const user=require("../controllers/userController");
const {validate}=require("../middleware/validate");
const {registerSchema,loginSchema}=require("../validationSchemas/userValidation");



router.post("/user-register",validate(registerSchema),user.register);
router.post("/login",validate(loginSchema),user.loginUser);


module.exports=router
