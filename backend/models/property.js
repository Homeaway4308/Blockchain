var mongoose = require('mongoose')

var propertySchema = mongoose.Schema({
    status:{
        type: Number
    },
    location:{
        type: String,
        required: true
    },
    rentee:{
        type: String
    },
    company:{
        type:String
    },
    price:{
        type: Number
    },
    start:{
        type:Number
    },
    end:{
        type:Number
    },
    image:{
        type:String
    }
})

const Property = module.exports = mongoose.model("Property", propertySchema);
