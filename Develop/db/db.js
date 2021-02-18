//will need unique id to allow for finding by id and deleting
//https://www.npmjs.com/package/uuid see version 1
//import dependencies
const fs = require("fs");

//uuid.v1() create a version 1 timestamp UUID
const uuid = require("uuid/v1");

function readNotes() {
    return fs.readFileAsync("Develop/db.json");
}

function writeNotes(note) {
    return fs.writeFileAsync("Develop/db.json", JSON.stringify(note));
}

function getNotes() {
    return ((notes) => {
        //create let to hold parsed notes
        let parsedNotes;

        //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/try...catch
        //try to execute the first section, throw an exception if it can't be done
        try {
            parsedNotes = [].concat(JSON.parse(notes));
        }
        catch {
            parsedNotes = [];
        }

        return parsedNotes;
    });
}

function addNote(note) {
    //destructure the note
    const { title, text } = note;

    //stop blank fields from being entered
    if (!title) {
        alert('Title cannot be blank');
    }
    else if (!text) {
        alert('Text cannot be blank');
    }

    //create new note with unique id
    const createNote = {
        title,
        text,
        id: uuid()
    }

    //get all notes
    return this.getNotes()
        //add new note to all notes
        .then((notes) => [...notes, createNote])
        //write all notes with new note
        .then((newNotesList) => this.writeNotes(newNotesList))
        //return the new note
        .then(() => createNote);
}

function deleteNote(id) {
    //get all notes
    return this.getNotes()
        //delete the note with the given id
        .then((notes) => notes.filter((note) => note.id !== id))
        //write all updated notes
        .then((updatedNotes) => this.writeNotes(updatedNotes));
}

module.exports = {
    readNotes,
    writeNotes,
    getNotes,
    addNote,
    deleteNote
};