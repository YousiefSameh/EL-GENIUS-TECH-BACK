const mongoose = require('mongoose');

const PricePlanSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true , "name is required"],
    },
    price: {
        type: Number,
        required: true,
    },
    duration: {
        type: String,
        required: true, 
    },
});

const PricePlan = mongoose.model('PricePlan', PricePlanSchema);
module.exports = PricePlan;
