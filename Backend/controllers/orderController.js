import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Stripe from "stripe";
import axios from "axios";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const placeOrder = async (req, res) => {
  const frontend_url = "https://tomato-food-del-frontend.vercel.app";

  try {
    const newOrder = new orderModel({
      userId: req.body.userId,
      items: req.body.items,
      amount: req.body.amount,
      address: req.body.address,
    });
    await newOrder.save();
    await userModel.findByIdAndUpdate(req.body.userId, { cartData: {} });
    const line_items = req.body.items.map((item) => ({
      price_data: {
        currency: "pkr",
        product_data: {
          name: item.name,
        },
        unit_amount: item.price * 100 * 277,
      },
      quantity: item.quantity,
    }));

    line_items.push({
      price_data: {
        currency: "pkr",
        product_data: {
          name: "Delivery Charges",
        },
        unit_amount: 2 * 100 * 277,
      },
      quantity: 1,
    });

    const session = await stripe.checkout.sessions.create({
      line_items: line_items,
      mode: "payment",
      success_url: `${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
      cancel_url: `${frontend_url}/verify?success=false&orderId=${newOrder._id}`,
    });

    res.json({ success: true, session_url: session.url });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

const verifyOrder = async (req, res) => {
  const { orderId, success } = req.body;
  try {
    if (success == "true") {
      await orderModel.findByIdAndUpdate(orderId, { payment: true });
      res.json({ success: true, message: "Paid Successfully" });
    } else {
      await orderModel.findByIdAndDelete(orderId);
      res.json({ success: false, message: "Not Paid" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

const userOrders = async (req, res) => {
  try {
    let orders = await orderModel.find({ userId: req.body.userId });
    res.json({ success: true, data: { orders } });
  } catch (error) {
    console.log('error')
    res.json({success:false, message: "Error"})
  }
};

const listOrders = async (req,res) => {
  try {
    const orders = await orderModel.find({});
    res.json({success:true, data: orders});
  } catch (error) {
    console.log(error);
    res.json({success:false, message:'Error'})
  }
}

const updateStatus = async (req,res) => {
  try{
    const status = req.body.orderId;
    await orderModel.findByIdAndUpdate(status, {status:req.body.status});
    res.json({success: true, message:"Status Updated"})
  }
  catch(error){
    console.log('Error');
    res.json({success:false, message: "Error"})
  }
}

export { placeOrder, verifyOrder, userOrders, listOrders, updateStatus };
