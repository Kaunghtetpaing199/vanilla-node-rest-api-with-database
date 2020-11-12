const Data = require("../models/productModel");
const { getPostData } = require("../util");

async function updateProduct(req, res, id = null) {
  let product;
  if (id) {
    product = await Data.findById(id);
  } else {
    product = new Data();
  }
  let resData = await getPostData(req);
  res.writeHead(200, { "Content-Type": "application/json" });
  resData = JSON.parse(resData);
  product.name = resData.name;
  product.description = resData.description;
  product.price = resData.price;
  const saveData = await product.save();
  res.end(JSON.stringify(saveData));
}
async function deleteProduct(req, res, id = null) {
  await Data.findByIdAndDelete(id);
  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(JSON.stringify({ message: `Product ${id} removed` }));
}

async function getProduct(req, res, id = null) {
  let resData;
  if (id) {
    resData = await Data.findById(id);
  } else {
    resData = await Data.find();
  }
  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(JSON.stringify(resData));
}

module.exports = {
  updateProduct,
  deleteProduct,
  getProduct,
};
