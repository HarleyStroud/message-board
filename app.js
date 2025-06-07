require('dotenv').config();
const express = require('express');
const app = express();
const path = require('node:path');
const pool = require('./db/pool');

const indexRouter = require('./routes/indexRouter');

// Set view path and view engine.
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//Set path for serving static files, such as styles.css
const assetsPath = path.join(__dirname, 'public');
app.use(express.static(assetsPath));

app.use(express.urlencoded({ extended: true }));

app.use('/', indexRouter);

// 404 error handler
app.use((req, res, next) => {
    const err = new Error('Page not found');
    err.status = 404;
    next(err);
});

// Every thrown error in the application or the previous middleware function calling `next` with an error as an argument will eventually go to this middleware function
app.use((err, req, res, next) => {
    const statusCode = err.status || 500;
    console.error(`[${statusCode}] ${err.message}`);

        res.status(statusCode).render('error', {
        title: `Error ${statusCode}`,
        message:
            statusCode === 500
                ? 'Something went wrong on our end. Please try again later.'
                : err,
        status: statusCode,
    });
});

const PORT = process.env.PORT || 3000;

(async () => {
    try {
        await pool.query('SELECT 1');
        console.log('Successfully connected to database');

        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    } catch (err) {
        console.error('Database connection failed:', err);
        process.exit(1);
    }
})();


app.on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
        console.error(`Port ${PORT} is already in use.`);
    } 
    else {
        console.error('Unexpected server error:', err);
    }
    process.exit(1);
});