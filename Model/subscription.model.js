const mongoose = require("mongoose");

const subscriptionSchema = new mongoose.Schema({
    
        title:{type:String},
        img:{type:String},
        benifit:[{type:String}],
        description:{type:String},
        actualPrice:{type:Number},
        offerPrice:{type:Number},
        subplan:[{
        duration:{type:String},
        price:{type:Number},
        discount:{type:Number},
        off:{type:Number,default:0},
        }]
})
const SubscrptionModel = mongoose.model('Subscription_Plan', subscriptionSchema);

module.exports = {
    SubscrptionModel
};
