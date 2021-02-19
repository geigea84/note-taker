//will need unique id to allow for finding by id and deleting
//https://www.npmjs.com/package/uuid see version 1
//import dependencies
const fs = require("fs");

//uuid.v1() create a version 1 timestamp UUID
const { v1: uuidv1 } = require('uuid');

//combine functions into a single exportable class
class DB {

    //https://www.w3schools.com/nodejs/nodejs_filesystem.asp
    //read through the notes objects in db.json
    read() {
        return fs.readFile("Develop/db.json");
    }

    //write the stringified notes objects to the page
    write(note) {
        return fs.writeFile("Develop/db.json", JSON.stringify(note));
    }

    getNotes() {
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

    addNote(note) {
        //destructure the note
        const { title, text } = note;

        //stop blank title field from being entered
        if (!title) {
            alert('Title cannot be blank');
        }
        //stop blank text field from being entered
        else if (!text) {
            alert('Text cannot be blank');
        }

        //create new note object with unique id
        const createNote = {
            title,
            text,
            id: uuidv1()
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

    deleteNote(id) {
        //get all notes
        return this.getNotes()
            //delete the note with the given id
            .then((notes) => notes.filter((note) => note.id !== id))
            //write all updated notes
            .then((updatedNotes) => this.writeNotes(updatedNotes));
    }
}

module.exports = new DB();