const mongoose = require("mongoose");

const CountSchema = new mongoose.Schema(
    {
        name: String,
        postNum: Number,
    },
    { collection: "count" }
);
const Count = mongoose.model("Count", CountSchema);

module.exports = { Count };
