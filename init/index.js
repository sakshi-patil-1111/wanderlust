const mongoose = require("mongoose");
const Listing = require("../models/listing");
const initData = require("./data.js");

async function main() {
  mongoose.connect("mongodb://127.0.0.1:27017/wanderlust");
}

main()
  .then(() => {
    console.log("connection to db sucessful");
  })
  .catch((err) => {
    console.log(err);
  });

const initDB = async () => {
  await Listing.deleteMany({});
  initData.data = initData.data.map((obj) => {
    return { ...obj, owner: "66c50bf252c1ef8b62c57f14" };
  });
  await Listing.insertMany(initData.data);
  console.log("data was initialized");
};

initDB();
