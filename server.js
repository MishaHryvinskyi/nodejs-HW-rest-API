const mongoose = require('mongoose')
const dotenv = require('dotenv')
const app = require('./app')



dotenv.config()

const { DB_HOST } = process.env

mongoose.set('strictQuery', true)

mongoose.connect(DB_HOST)
  .then(() => {
    app.listen(3000)
  })
  .catch(error => {
    console.log(error.message);
    process.exit(1);
  })

// const app = require('./app')

// app.listen(3000, () => {
//   console.log("Server running. Use our API on port: 3000")
// })
