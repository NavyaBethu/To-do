// middleware/errorHandler.js

const errorHandler = (err, req, res, next) => {
    console.error('Error:', err); // Log the error for debugging

    // Default error message
    let statusCode = 500;
    let message = 'Internal Server Error';

    // Customize response based on error type or properties
    if (err.name === 'ValidationError') {
        statusCode = 400;
        message = err.details ? err.details[0].message : 'Validation Error';
    } else if (err.name === 'NotFoundError') {
        statusCode = 404;
        message = err.message || 'Resource Not Found';
    } else if (err.name === 'UnauthorizedError') {
        statusCode = 401;
        message = err.message || 'Unauthorized';
    }

    res.status(statusCode).json({
        error: message
    });
};

module.exports = errorHandler;
