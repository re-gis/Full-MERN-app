const path = require('path')
const express = require("express");
const dotenv = require("dotenv").config();
const { errorHandler } = require("./middleware/errorMiddleware");
const colors = require("colors");
const { json } = require("express");
const connectDB = require("./config/db");
const { default: mongoose } = require("mongoose");
const PORT = process.env.PORT || 3000;

connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/goals", require("./routes/goalRoutes"));
app.use("/api/users", require("./routes/userRoutes"));

if(process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../frontend/build')))

  app.get('*', (req, res) => {
    return res.sendFile(path.resolve(__dirname, '../', 'frontend', 'build', 'index.html'))
  })
} else {
  app.get('/', (req, res) => {
    return res.send('Please set to production...')
  })
}

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}...`);
});
