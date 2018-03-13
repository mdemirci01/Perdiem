var mongoose = require('mongoose');

module.exports = mongoose.model('Post', {
    text: {
        type: String,
        default: ''
    },
    createDate: {
        type: Date,
        default: new Date()
    }
});