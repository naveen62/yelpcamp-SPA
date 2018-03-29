require('./config/config');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');
const publicPath = path.join(__dirname, '..', 'public');

const campRoutes = require('./routes/campground');
const authRoutes = require('./routes/auth');

const port = process.env.PORT || 3000;

const app = express();
app.use(bodyParser.json());
app.use(express.static(publicPath));
app.set('views', path.join(__dirname, '/views'))
app.set('view engine', 'ejs')

mongoose.connect(process.env.DATABASEURL).then(() => {
    console.log('connected')
}).catch((err) => {
    console.log(err)
})

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-auth");
    res.header("Access-Control-Allow-Methods", "*")
    next();
  });
require('./routes/campground');

app.use('/api', campRoutes);
app.use('/api', authRoutes);

app.get('*', (req, res) => {
    res.render('yelpcamp')
})
app.listen(port, () => {
    console.log('Server is running')
})
