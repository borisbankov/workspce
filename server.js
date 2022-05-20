const http = require("http");
const fs = require("fs");
const url = require("url");
// Create a server
http.createServer( async (request, response) => { 
   // Parse the request containing file name
   var pathname = url.parse(request.url).pathname;
   // Print the name of the file for which request is made.
   console.log("Request for " + pathname + " received.");

   fs.readFile(pathname.substr(1), function (err, data) {
      if (err) {
         console.log(err);
         // HTTP Status: 404 : NOT FOUND
         // Content Type: text/plain
         response.writeHead(404, {"Content-Type": "text/html"});
      } else {
         // Page found       
         // HTTP Status: 200 : OK
         // Content Type: text/plain
         let dotoffset = request.url.lastIndexOf('.');
         let mimetype = dotoffset == -1
                           ? 'text/plain'
                           : {
                              '.html' : 'text/html',
                              '.ico' : 'image/x-icon',
                              '.jpg' : 'image/jpeg',
                              '.png' : 'image/png',
                              '.gif' : 'image/gif',
                              '.css' : 'text/css',
                              '.js' : 'text/javascript'
                              }[ request.url.substr(dotoffset) ];
         response.setHeader('Content-type' , mimetype);
         // Write the content of the file to response body
         response.write(data.toString());      
      }
      // Send the response body
      response.end();
   });  

}).listen(8080);