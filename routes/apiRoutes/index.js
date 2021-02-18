//reference https://expressjs.com/en/api.html
//see db.js for functions for each route
const router = require("express").Router();
const {
    readNotes,
    writeNotes,
    getNotes,
    addNote,
    deleteNote
} = require("../../Develop/db/db.js");

//get all notes
router.get("/notes", (req, res) => {
    getNotes()
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
    addNote(req.body)
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
    deleteNote(req.params.id)
        .then(() => {
            res.json({ ok: true });
        })
        .catch((err) => {
            res.status(500).json(err);
        });
});

module.exports = router;