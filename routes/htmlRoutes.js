const path = require("path");

module.exports = function(app) {
    //Sends user to note taker page
    app.get("/notes", function(req,res) {
        res.sendFile(path.join(__dirname, "../public/notes.html"));
    });

   // sets index.html as default page
   app.get("*", function(req,res) {
       res.sendFile(path.join(__dirname, "../public/index.html"));
     });

};