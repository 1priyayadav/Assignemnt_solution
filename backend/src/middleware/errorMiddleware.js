const errorMiddleware = (err, req, res, next) => {
    console.error(err.stack);

    let statusCode = res.statusCode !== 200 ? res.statusCode : 500;
    let message = err.message || 'Internal Server Error';

    if (err.name === 'PrismaClientValidationError') {
        statusCode = 400;
        message = 'Invalid Database Request';
    } else if (err.code === 'P2002') {
        statusCode = 400;
        message = 'Unique constraint failed on the database';
    } else if (err.name === 'ZodError') {
        statusCode = 400;
        message = err.errors.map(e => e.message).join(', ');
    }

    res.status(statusCode).json({
        success: false,
        message,
        ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
    });
};

module.exports = errorMiddleware;
