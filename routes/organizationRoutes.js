const express = require("express");
const router=express.Router();
const organization=require("../controllers/organizationController");
const {validate}=require("../middleware/validate");
const{createOrganizationSchema}=require("../validationSchemas/organizationValidation");

router.post("/create-organization",validate(createOrganizationSchema),organization.createOrganization);
module.exports=router;