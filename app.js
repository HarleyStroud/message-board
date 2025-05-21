const express = require("express");
const app = express();
const path = require('node:path');

// Set view path and view engine.
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//Set path for serving static files, such as styles.css
const assetsPath = path.join(__dirname, 'public');
app.use(express.static(assetsPath));

app.get("/", (req, res) => res.send("Hello world!"));

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
