// middleware/validate.js
function validate(schema) {
    return (req, res, next) => {
        let data;
        
        // Determine where the data should come from
        if (req.method === 'GET') {
            // Use query parameters for GET requests
            data = req.query;
        } else {
            // Use body data for POST, PUT, DELETE requests
            data = req.body;
        }

        // Validate the data
        const { error } = schema.validate(data, { abortEarly: false });

        if (error) {
            // Format error messages
            const formattedErrors = error.details.map(detail => ({
                message: detail.message,
                path: detail.path.join('.')
            }));
            
            // Return 400 Bad Request with detailed error messages
            return res.status(400).json({
                error: 'Validation Error',
                details: formattedErrors
            });
        }

        next();
    };
}

module.exports = { validate };
