const http = require("http");
const fs = require("fs");
const url = require("url");
const replaceTempo = require("./modules/replaceTempo.js");

// static files
const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, "utf-8");
const tempOverview = fs.readFileSync(
  `${__dirname}/templates/template-overview.html`,
  "utf-8"
);
const tempCard = fs.readFileSync(
  `${__dirname}/templates/template-card.html`,
  "utf-8"
);
// data
const tempProduct = fs.readFileSync(
  `${__dirname}/templates/template-product.html`,
  "utf-8"
);
productdata = JSON.parse(data);
console.log(productdata);

// server
const server = http.createServer((req, res) => {
  const { query, pathname } = url.parse(req.url, true);
  //overview page
  if (pathname === "/" || pathname === "/overview") {
    res.writeHead(200, {
      "content-type": "text/html",
    });
    const cardHtml = productdata
      .map((el) => replaceTempo(tempCard, el))
      .join("");
    let output = tempOverview.replace("{%card%}", cardHtml);

    res.end(output);
  } else if (pathname === "/products") {
    res.writeHead(200, {
      "content-type": "text/html",
    });
    res.end("products");
  } else if (pathname === "/product") {
    res.writeHead(200, {
      "content-type": "text/html",
    });
    const productSingle = productdata[query.id];
    const output = replaceTempo(tempProduct, productSingle);
    res.end(output);
    console.log(query);
  } else if (pathname === "/api") {
    res.writeHead(200, {
      "content-type": "application/json",
    });
    console.log(data.at(2));
    res.end(data);
  } else {
    res.writeHead(404, {
      "content-type": "text/html",
    });
    res.end(`<h1">Page not found</h1>`);
  }
});

// server listeing
server.listen(8000, "127.0.0.10", () => {
  console.log("server is listening @ port 8000");
});
