const router = require("express").Router();
const path = require("path");

//get index.html
router.get("/", (req, res) => {
    //http://expressjs.com/en/api.html#res.sendFile
    //transfer the file at the given path
    //To create a new directory in your index.js file, insert 
    //__dirname as the first argument to path.join() and the 
    //name of the new directory as the second
    res.sendFile(path.join(__dirname, "../public/index.html"));
});

//get notes.html
router.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/notes.html"));
});

module.exports = router;