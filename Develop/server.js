const express = require("express");
const apiRoutes = require("./routes/apiRoutes");
const htmlRoutes = require("./routes/htmlRoutes");

//initialize the app
const app = express();

//create a port
const PORT = process.env.PORT || 3003;

//parse incoming JSON data
app.use(express.json());

//parse incoming string or array data
app.use(express.urlencoded({ extended: true }));

//connect public css and js to html as static resources
app.use(express.static("public"));

/* Tell the server that any time a client 
navigates to <ourhost>/api, the app will use 
the router we set up in apiRoutes. If / is 
the endpoint, then the router will serve 
back our HTML routes. */
app.use("/", htmlRoutes);
app.use("/api", apiRoutes);

app.listen(PORT, () => {
    console.log(`Now open on port ${PORT}`);
});