const note_data = require("../db/note_data");
//const router = require("express").Router();
// exporting html paths
module.exports = function(app) {

    app.get("/api/notes", function(req,res) {
        return res.json(note_data);
    });

// Displays a single character, or returns false
app.get("/api/notes/:id", function(req, res) {
    var chosen = req.params.note_data;
  
    console.log(chosen);
  
    for (var i = 0; i < note_data.length; i++) {
      if (chosen === note_data[i].routeName) {
        return res.json(note_data[i]);
      }
    }
  
    return res.json(false);
  });
    
    app.post("/api/notes/", function(req,res) {
        note_data.push(req.body);
        res.json(true);
    })

    app.delete("/api/notes/", function(req,res) {
        note_data.length = 0;

        res.json({ok: true});
    })

};