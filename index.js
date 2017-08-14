var express = require("express");
var fs = require("fs");
var path = require("path");
var app = express();
var jsonPath = path.join(__dirname, "data.json");
var clientPath = path.join(__dirname, 'client');
app.use(express.static(clientPath));

app.route("/api/list")
    .get(function(req, res){
        fs.readFile(jsonPath, "utf-8", function(err, file){
            res.send(JSON.parse(file));
        });
    });

app.route("/api/team/:team")
    .get(function(req, res){
        fs.readFile(jsonPath, 'utf-8', function(err, file) {
            if (err) {
                res.statusStatus(500);
            } else {
                var chunks = JSON.parse(file);
                var team = req.params.team;
                var response = chunks.filter(function(chunk) {
                    if(chunk.team){
                        if (chunk.team.toLowerCase().trim() === team.toLowerCase().trim()) {
                            return chunk
                        }
                    }
                });
                if (response) {
                    res.send(response);
                } else {
                    res.sendStatus(404);
                }
            }
        });
    })

app.route("/api/single/:id")
    .get(function(req, res) {
        fs.readFile(jsonPath, 'utf-8', function(err, file) {
            if (err) {
                res.statusStatus(500);
            } else {
                var chunks = JSON.parse(file);
                var id = req.params.id;
                var response;
                chunks.forEach(function(chunk) {
                    if (chunk.id === id) {
                        response = chunk;
                    }
                });
                if (response) {
                    res.send(response);
                } else {
                    res.sendStatus(404);
                }
            }
        });
    })

app.listen(3000, function(){
    console.log("server is listening on port 3000");
});