const express    = require("express");
const apiRoutes  = require("./routes/apiRoutes");
const htmlRoutes = require("./routes/htmlRoutes");
const app        = express();
const PORT       = process.env.PORT || 3002;

//parse incoming string or array data
app.use(express.urlencoded({extended: true}));

//parse incoming JSON data
app.use(express.json());

/* Tell the server that any time a client 
navigates to <ourhost>/api, the app will use 
the router we set up in apiRoutes. If / is 
the endpoint, then the router will serve 
back our HTML routes. */
app.use("/", htmlRoutes);
app.use("/api", apiRoutes);

//connect public css and js to html as static resources
app.use(express.static("public"));

app.listen(PORT, () => {
    console.log(`Now on port: ${PORT}`);
});