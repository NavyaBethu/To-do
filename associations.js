const User = require('./models/userModel');
const Organization = require('./models/organizationModel');


User.belongsTo(Organization, { foreignKey: 'organizationId' });
Organization.hasMany(User, { foreignKey: 'organizationId' });

module.exports = { User, Organization };
