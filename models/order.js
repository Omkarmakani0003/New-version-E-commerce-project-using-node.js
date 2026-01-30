const mongoose = require("mongoose");

const order = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    items: [
      {
        product_id: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },

        variation: {
          type: Object,
          default: {},
        },

        quantity: {
          type: Number,
          required: true,
          min: 1,
        },

        price: {
          type: Number,
          required: true,
        },
      },
    ],

    total: {
      type: Number,
      required: true,
      min: 0,
    },

    shipping_address: {
      type: String,
      required: true,
    },

    status: {
      type: String,
      enum: ["pending", "confirmed","processing","shipped", "delivered", "cancelled"],
      default: "pending",
    },
    steps: {
      type: [String],
      default: ["confirmed"]
    },
    razorpay_order_id: {
      type: String,
    },

    razorpay_payment_id: {
      type: String,
    },
    payment_method: {
      type: String,
      enum: ["cod", "card", "upi", "paypal"],
      default : "card"
    },

    payment_status: {
      type: String,
      enum: ["pending", "paid", "failed", "refunded"],
      default: "pending",
    },
  },
  { timestamps: true }
);

module.exports.orders = mongoose.model("order", order);
