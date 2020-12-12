const express = require('express');
const authRouter = require('./routes')
const bodyParser = require('body-parser')
const cors = require('cors')

//Express instance
const app = express();


//Express instance configuration
app.use(cors());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use('/api', authRouter);

app.set('PORT', 3000);

app.listen(app.get('PORT'), () => {
    console.log('server up');
});
