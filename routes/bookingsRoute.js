const express = require("express");
const router = express.Router();
const Booking = require("../models/bookingModel");
const Car = require("../models/carModel");
const shortid = require('shortid')
const Razorpay = require('razorpay')


const razorpay = new Razorpay({
	key_id: 'rzp_test_2ESpxo186OswBB',
	key_secret: 'G2QZJvRXGPGRCbBA1uZrrOCs'
})
/*router.post("/bookcar", async (req, res) => {
  const { token } = req.body;
  try {
    const customer = await stripe.customers.create({
      email: token.email,
      source: token.id,
    });

    const payment = await stripe.charges.create(
      {
        amount: req.body.totalAmount * 100,
        currency: "inr",
        customer: customer.id,
        receipt_email: token.email
      },
      {
        idempotencyKey: uuidv4(),
        
      }
    );

    if (payment) {
      req.body.transactionId = payment.source.id;
      const newbooking = new Booking(req.body);
      await newbooking.save();
      const car = await Car.findOne({ _id: req.body.car });
      console.log(req.body.car);
      car.bookedTimeSlots.push(req.body.bookedTimeSlots);

      await car.save();
      res.send("Your booking is successfull");
    } else {
      return res.status(400).json(error);
    }
  } catch (error) {
    console.log(error);
    return res.status(400).json(error+"India");
  }*/
  router.post('/bookcar/:amt', async (req, res) => {
    console.log(req.body)
    const payment_capture = 1
    const amount = req.params.amt;
    const currency = 'INR'
  
    const options = {
      amount: (amount*100).toString(),
      currency,
      receipt: shortid.generate(),
      payment_capture
    }

  
    try {
      const response = await razorpay.orders.create(options)
      //console.log(response)
      if (response) {
        req.body.transactionId = response.id;
        const newbooking = new Booking(req.body);
        await newbooking.save();
        const car = await Car.findOne({ _id: req.body.car });
        console.log(req.body.car);
        car.bookedTimeSlots.push(req.body.bookedTimeSlots);
  
        await car.save();
        //res.send("Your booking is successfull");
        console.log("here")
        return res.json({
          id: response.id,
          currency: response.currency,
          amount: response.amount
        })
      } else {
        return res.status(400).json(error);
      }
    } catch (error) {
      console.log(error)
    }
  })


router.get("/getallbookings", async(req, res) => {

    try {

        const bookings = await Booking.find().populate('car')
        res.send(bookings)
        
    } catch (error) {
        return res.status(400).json(error);
    }
  
});


module.exports = router;