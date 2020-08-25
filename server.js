const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const ShrinkURL = require('./models/shrinkURL')
const mongoose = require('mongoose')

// Loading 
require('dotenv').config({ path: './.env' })

// Body Parser
app.use(bodyParser.urlencoded({ extended: true }))

// Local Database
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, (error) => {
    if (error) {
        console.log(error)
    } else {
        console.log('Successfully Connected to Database');
    }
})

// View Engine
app.set('view engine', 'ejs')

// Route
app.get('/', async (req, res) => {
    const shrinkURL = await ShrinkURL.find()
    res.render('index', { shrinkURL: shrinkURL })
})

app.post('/shrinkURL', async (req, res) => {
    await ShrinkURL.create({ full: req.body.url })
    res.redirect('/')
})

app.get('/:shrinkURLs', async (req, res) => {
    const shortURL = await ShrinkURL.findOne({ shrink: req.params.shrinkURLs })
    if (shortURL == null) {
        res.sendStatus(404)
    }

    shortURL.clicks++
    shortURL.save()

    res.redirect(shortURL.full)
})

// Port
app.listen(process.env.PORT, (error) => {
    if (error) {
        console.log(error)
    } else {
        console.log(`Server listening on Port ${process.env.PORT}`)
    }
})