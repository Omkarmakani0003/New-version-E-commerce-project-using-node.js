const mongoose = require("mongoose");

const slider = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    // image: {
    //   type: String,
    //   required: true,
    // },
    image: [
      {
        public_id: {
          type: String,
          required: true,
        },
        url: {
          type: String,
          required: true,
        },
      },
    ],
    category_id: {
      type: String,
    },
    subcategory_id: {
      type: String,
    },
    description: {
      type: String,
      required: true,
    },

},
  { timestamps: true }
);


module.exports.slider = mongoose.model("slider", slider);
