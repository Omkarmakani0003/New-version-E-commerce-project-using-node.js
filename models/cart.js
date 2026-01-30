const mongoose = require("mongoose");
const { variation } = require("./admin/variation");

const cart = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    items: [
      {
        product_id: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
        variation: { type: Array }
      }
    ],
    quantity :{
      type: Number,
      required: true,
    },
    total: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);


module.exports.cart = mongoose.model("cart", cart);
