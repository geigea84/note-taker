//will need unique id to allow for finding by id and deleting
//https://www.npmjs.com/package/uuid see version 1
//import dependencies
const fs = require("fs");
//https://www.npmjs.com/package/util
const util = require("util");

//uuid.v1() create a version 1 timestamp UUID
const { v1: uuidv1 } = require('uuid');

const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);

//combine functions into a single exportable class
class DB {

    //https://www.w3schools.com/nodejs/nodejs_filesystem.asp
    //read through the notes objects in db.json
    read() {
        return readFileAsync("db/db.json", "utf-8");
    }

    //write the stringified notes objects to the page
    write(note) {
        return writeFileAsync("db/db.json", JSON.stringify(note));
    }

    getNotes() {
        return this.read().then((notes) => {
            //create let to hold parsed notes
            let parsedNotes;

            //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/try...catch
            //try to execute the first section, throw an exception if it can't be done
            try {
                parsedNotes = [].concat(JSON.parse(notes));
            }
            catch (err) {
                parsedNotes = [];
                console.log(err);
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
        };

        //get all notes
        return this.getNotes()
            //add new note to all notes
            .then((notes) => [...notes, createNote])
            //write all notes with new note
            .then((newNotesList) => this.write(newNotesList))
            //return the new note
            .then(() => createNote);
    }

    deleteNote(id) {
        //get all notes
        return this.getNotes()
            //delete the note with the given id
            .then((notes) => notes.filter((note) => note.id !== id))
            //write all updated notes
            .then((updatedNotes) => this.write(updatedNotes));
    }
}

module.exports = new DB();