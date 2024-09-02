const  Organization  = require('../models/organizationModel');

const createOrganization = async (req, res) => {
        const { name } = req.body;
        const organization = await Organization.create({ name });

        return res.status(201).json({data:organization});
};
module.exports={createOrganization}