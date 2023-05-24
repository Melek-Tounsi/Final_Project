const mongoose= require("mongoose")


const CartItemSchema = new mongoose.Schema({
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
    },
    quantity: {
      type: Number,
      default: 1,
    },
  });

const UserDetailsSchema = new mongoose.Schema(
    {
        username: String,
        email:{type:String, unique:true},
        password:String,
        cart: [CartItemSchema],
    },
    {
        collection: "UserInfo",
    }

)

mongoose.model("UserInfo", UserDetailsSchema);