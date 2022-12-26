const express = require('express')
const cors = require ('cors')
const app = express()
const ContactList = require('./Model/ContactList')
const connectDB = require('./db')
const { findByIdAndUpdate } = require('./Model/ContactList')


app.use(cors())
app.use(express.json())


// create Route
app.post('/add-contact', async(req, res) =>{
    const contacts = new ContactList(req.body)
    try {
     
        await contacts.save()
        res.status(201).json({
            status: 'Success',
            data : {
                contacts
            }
        })
    } catch (error) {
        res.status(500).json({
            status: 'Failed',
            message: error
        })
    }
})

// get route

app.get('/get-contact', async (req, res) =>{
   const contactNumbers = await ContactList.find({})
    try {
        res.status(200).json({
            status : 'Success',
            data: {
                contactNumbers
            }
        })
        
    } catch (error) {
        res.status(500).json({
            status : 'Failed',
            message : error
        })
    }

})

// update Route

app.patch('/update-contact/:id', async (req, res) =>{
   const { id } = req.params
     const updatedContact = await ContactList.findOneAndUpdate(id, req.body, {
        new : true,
        runValidators : true
    })
    try {
       res.status(200).json({
        status : 'success',
        data : {
            updatedContact
        }
       }) 
    } catch (error) {
        console.log(error)
    } 
})

// Delete Route

app.delete('/delete-contact/:id' , async(req,res) => {
    await ContactList.findByIdAndDelete(req.params.id)
    try {
        res.status(201).json({
            status : 'success',
            data: {}
        })
    } catch (error) {
        res.status(500).json({
            status : 'Failed',
            message : error
        })
    }
})


const PORT = 8080

app.listen(PORT, () =>{
    console.log(`Server listening on port ${PORT}...`)
})



