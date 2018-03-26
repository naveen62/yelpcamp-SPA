const mongoose = require('mongoose');

const CampgroundSchema = new mongoose.Schema({
    name: {type: String, required: true},
    image: {type: String, required: true},
    price: {type: Number, required: true},
    description: {type: String},
    createdAt: {type: String, required: true},
    createdBy: {
        id: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
        username: String
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