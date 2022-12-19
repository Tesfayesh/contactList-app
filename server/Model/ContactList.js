const mongoose = require('mongoose')

const ContactListSchema = new mongoose.Schema({
    name: {
        type : String,
        required : true
    },

    phone : {
        type : Number,
        required : true
    }
})

const ContactList = mongoose.model('ContactList' , ContactListSchema)

module.exports = ContactList