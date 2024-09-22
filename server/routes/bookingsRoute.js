const express = require("express");
const router = express.Router();
const Booking = require("../models/bookingModel");
const Car = require("../models/carModel");
const { v4: uuidv4 } = require("uuid");

router.post("/bookCar", async (req, res) => {
  const { token, totalAmount, car, bookedTimeSlots } = req.body;

  try {
    // Simulate a successful payment response
    const payment = {
      id: uuidv4(),  // Generate a dummy payment ID
      status: "succeeded",  // Simulate a successful payment
      receipt_email: token.email,  // Use email from token (which you pass from frontend)
    };

    // Simulate successful payment
    console.log("Simulated payment successful:", payment);

    // Proceed with booking logic
    req.body.transactionId = payment.id;  // Dummy payment ID for the transaction
    const newBooking = new Booking(req.body);  // Create new booking with request body data
    await newBooking.save();  // Save the booking to the database

    // Find and update car details (e.g., add booked time slots)
    const foundCar = await Car.findOne({ _id: car });
    if (!foundCar) {
      console.error("Car not found:", car);
      return res.status(404).json({ error: "Car not found" });
    }

    // Push the new booked time slots for this car
    foundCar.bookedTimeSlots.push(bookedTimeSlots);
    await foundCar.save();  // Save updated car data to the database

    res.status(200).json({ message: "Your booking is successful", payment });
  } catch (error) {
    console.error("Error processing booking:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Fetch all bookings
router.get("/getallbookings", async (req, res) => {
  try {
    const bookings = await Booking.find().populate("car");  // Populate car details in bookings
    res.status(200).json(bookings);  // Return bookings data in response
  } catch (error) {
    console.error("Error fetching bookings:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
