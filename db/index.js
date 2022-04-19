const mongoose = require('mongoose')

// connect to Mongo and create new DB
let MONGO_URI = process.env.PROD_MONGODB || process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/itemsDatabase'

mongoose.connect(MONGO_URI, { useUnifiedTopology: true,
useNewParser: true }).then(() => {
    console.log('Successfully connected to MongoDB')
  }).catch(e => {
    console.error('Connection error', e.message)
  })
  
  const db = mongoose.connection
  
  module.exports = db