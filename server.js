const express    = require("express");
const app        = express();
const PORT       = process.env.PORT || 3002
const apiRoutes  = require("./routes/apiRoutes");
const htmlRoutes = require("./routes/htmlRoutes");


app.get()

app.listen(PORT, () => {
    console.log(`Now on port: ${PORT}`);
});