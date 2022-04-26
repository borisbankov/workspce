const http = require("http");
const fs = require("fs");
const url = require("url");
let data = ''
// Create a server
http.createServer( async (request, response) => { 
   // Parse the request containing file name
   var pathname = url.parse(request.url).pathname;
   // Print the name of the file for which request is made.
   console.log("Request for " + pathname + " received.");
   if(request.method == 'POST'){
      request.on('data', chunk => {
         // data may not have been fully loaded, push data in chunks
         data += chunk;
      });
      request.on('end', () => {
         // work with ur data
         console.log(JSON.parse(data));
      });
   }
   // Read the requested file content from file system
   fs.readFile(pathname.substr(1), function (err, data) {
      if (err) {
         console.log(err);
         // HTTP Status: 404 : NOT FOUND
         // Content Type: text/plain
         response.writeHead(404, {"Content-Type": "text/html"});
      } else {
         //Page found       
         // HTTP Status: 200 : OK
         // Content Type: text/plain
         response.writeHead(200, {"Content-Type": "text/html"});    
         // Write the content of the file to response body
         response.write(data.toString());      
      }
      // Send the response body
      response.end();
   });  
}).listen(8080);