if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const http = require("http");
const mongoose = require("mongoose");
const Data = require("./models/productModel");
const {
  updateProduct,
  deleteProduct,
  getProduct,
} = require("./controllers/productConroller");
mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;

db.on("error", (error) => console.error(error));
db.once("open", () => console.log("Connected to Mongoose"));

const server = http.createServer(async (req, res) => {
  if (req.url === "/" && req.method === "GET") {
    getProduct(req, res);
  } else if (req.url.match(/\/([0-9]+)/) && req.method === "GET") {
    const id = req.url.split("/")[1];
    getProduct(req, res, id);
  } else if (req.url === "/" && req.method === "POST") {
    updateProduct(req, res);
  } else if (req.url.match(/\/([0-9]+)/) && req.method === "PUT") {
    const id = req.url.split("/")[1];
    updateProduct(req, res, id);
  } else if (req.url.match(/\/([0-9]+)/) && req.method === "DELETE") {
    const id = req.url.split("/")[1];
    deleteProduct(req, res, id);
  } else {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "Route not found" }));
  }
});

const port = process.env.PORT || 3000;

server.listen(port, () => console.log(`Server start running at ${port}`));
