var fs = require("fs");
var notesData = getNotes();

function getNotes() {
    let data = fs.readFileSync('db/db.json', 'utf8');
    let notes = JSON.parse(data);
    // Give each note an ID, so that it can be deleted/opened later. 
    for (let i = 0; i < notes.length; i++) {
        notes[i].id = '' + i;
    }
    return notes;
}

module.exports = function(app) {
  //retreives the input from the user so that it can show up online
    app.get("/api/notes", function (req, res) {
        notesData = getNotes();
        res.json(notesData);
    });

    //pushes the input to the notes file, so that it can be seen in that and online. 
    app.post("/api/notes/", function(req,res) {
      notesData.push(req.body);
        fs.writeFileSync('db/db.json', JSON.stringify(notesData), 'utf8');
        res.json(true);
    })

    app.delete("/api/notes/:id", function (req, res) {
      //gets the id of the note
      const requestID = req.params.id;
      let note = notesData.filter(note => {
          return note.id === requestID;
      })[0];
      //gets the index of the note they want to delete
      const index = notesData.indexOf(note);
      //removes the note that they've selected. 
      notesData.splice(index, 1);
      //Updates the notes file log. 
      fs.writeFileSync('db/db.json', JSON.stringify(notesData), 'utf8');
      res.json("Note deleted");
  });

};


