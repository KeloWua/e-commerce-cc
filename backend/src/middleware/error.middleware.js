export default function errorHandler(err, req, res, next) {
    console.error(err.stack); 
    
    if (res.headersSent) {
        return next(err);
    }

    res.status(500).json({
        ok: false,
        message: "Internal Server Error"
    });
}