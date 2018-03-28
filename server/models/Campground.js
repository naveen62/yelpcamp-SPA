const mongoose = require('mongoose');

const CampgroundSchema = new mongoose.Schema({
    name: {type: String, required: true},
    image: {
        img: String,
        id: String
    },
    price: {type: Number, required: true},
    description: {type: String},
    createdAt: {type: String, required: true},
    createdBy: {
        id: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
        email: String
    },
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Comments'
        }
    ]
})
const Campground = mongoose.model('Campground', CampgroundSchema);

module.exports = {
    Campground,
}