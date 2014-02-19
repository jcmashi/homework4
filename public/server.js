// Include http module, 
var http = require('http'),
 url = require("url");
var mysql = require("mysql");
var port = process.env.port||1337;

// Create the connection. 
// Data is default to new mysql installation and should be changed according to your configuration. 
var connection = mysql.createConnection({
    host: "stardock.cs.virginia.edu",
    user: "cs4720jcw5qj",
    password: "spring2014",
    database: "cs4720jcw5qj"
});

// Create the http server. 
http.createServer(function (request, response) {
	var pathname = url.parse(request.url).pathname;
    
    connection.query('SELECT * FROM RestaurantVisits;', function (error, rows, fields) {
        response.writeHead(200, {
            'Content-Type': 'text/plain'
        });
        // Send data as JSON string. 
        // Rows variable holds the result of the query. 
        response.write(JSON.stringify(rows));
        response.end();
    });


}).listen(8888);
console.log("Server running at http://127.0.0.1:8888/");