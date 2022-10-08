const fs = require("fs")
const fsPromises = require("fs").promises
const path = require("path")
const http = require("http");



const PORT = 4000;



// function to serve files
const serveFile = async (filePath, contentType, response) => {
    try {
        const rawData = await fsPromises.readFile(
            filePath,
            !contentType.includes("image") ? "utf8" : ""
        );
        const data = contentType === "application/json"
            ? JSON.parse(rawData) : rawData;
        response.writeHead(
            filePath.includes("404.html") ? 404 : 200, 
            { "Content-Type": contentType }
        );
        response.end(
            contentType === "application/json" ? JSON.stringify(data) : data
        );
    } catch (err) {
        console.log(err);
        response.statusCode = 500;
        response.end();
    }
}

const server = http.createServer((req, res) => {
    console.log(req.url, req.method);


    const extension = path.extname(req.url);

    let contentType;

    switch (extension) {
        case '.css':
            contentType = 'text/css';
            break;
        case '.js':
            contentType = 'text/javascript';
            break;
        case '.json':
            contentType = 'application/json';
            break;
        case '.jpg':
            contentType = 'image/jpeg';
            break;
        case '.png':
            contentType = 'image/png';
            break;
        case '.txt':
            contentType = 'text/plain';
            break;
        default:
            contentType = 'text/html';
    }

    let filePath =
        contentType === "text/html" && req.url === "/"
            ? path.join(__dirname, "views", "index.html")
                : contentType === "text/html" && req.url.slice(-1) === "/"
                    ? path.join(__dirname, "views", req.url, "index.html") // to handle requests to sub-directories
                        : contentType === "text/html"
                            ? path.join(__dirname, "views", req.url)  // to handle about.html, ifeanyi.html, nonso.html
                                : path.join(__dirname, req.url); // to handle style.css, app.js
    
    // to make address work without (.html)
    if (!extension && req.url.slice(-1) !== "/") filePath += ".html";

    const fileExists = fs.existsSync(filePath);

    if (fileExists) {
        // serve the file
        serveFile(filePath, contentType, res)
    } else {
        // 404
        // 301 redirect
        console.log(path.parse(filePath));
        switch (path.parse(filePath).base) {
            case "home.html":
                res.writeHead(301, { "Location": "/index.html" });
                res.end();
                break;
            default: 
                // serve a 404 response
                serveFile(path.join(__dirname, "views", "404.html"), "text/html", res)
        }
    }
});

server.listen(PORT, () => console.log(`Server running on Port ${PORT}`))