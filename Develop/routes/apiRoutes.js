//reference https://expressjs.com/en/api.html
//see db.js for functions for each route
const router = require("express").Router();
const db = require("../db/db.js");

//get all notes
router.get("/notes", (req, res) => {
    db.getNotes()
        .then((notes) => {
            return res.json(notes);
        })
        .catch((err) => {
            res.status(500).json(err);
        });
});

//create a new note
router.post("/notes", (req, res) => {
    //https://expressjs.com/en/api.html#req.body
    db.addNote(req.body)
        .then((note) => {
            res.json(note);
        })
        .catch((err) => {
            res.status(500).json(err);
        });
});

//get a note by its id and delete
router.delete("/notes/:id", (req, res) => {
    //https://expressjs.com/en/api.html#req.params
    db.deleteNote(req.params.id)
        .then(() => {
            res.json({ ok: true });
        })
        .catch((err) => {
            res.status(500).json(err);
        });
});

module.exports = router;