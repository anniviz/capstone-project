const express = require('express')
const mongoose = require('mongoose')
const path = require('path')

require('dotenv').config()
const {
  PORT = 4000,
  SPOTIFY_TOKEN,
  MONGODB_URL = 'mongodb://localhost:27017/patiententagebuch',
} = process.env

mongoose
  .connect(MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('Connected to MongoDB'))
  .catch(console.error)

const app = express()

app.use('/api', express.json()) // (req, res, next) => {...}
