const express = require("express");
const app = express();
const path = require('node:path');

const indexRouter = require("./routes/indexRouter");

// Set view path and view engine.
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//Set path for serving static files, such as styles.css
const assetsPath = path.join(__dirname, 'public');
app.use(express.static(assetsPath));

app.use(express.urlencoded({ extended: true }));

app.use("/", indexRouter);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
