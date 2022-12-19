const mongoose = require('mongoose')

const DB = 'mongodb+srv://tesfaye:letmein!@cluster-mern.arbhcql.mongodb.net/contactList?retryWrites=true&w=majority'

mongoose.connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() =>{
    console.log('Database connected successfully...')
})