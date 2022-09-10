const express = require("express");
const mongoose = require("mongoose");
const app = express();
const connect = require("./db")
const cors = require('cors');
const port = process.env.PORT || 2345;

app.use(express.json())
app.use(cors());



app.use('/api/cars/' , require('./routes/carsRoutes'))
app.use('/api/users/' , require('./routes/usersRoute'))
app.use('/api/bookings/' , require('./routes/bookingsRoute'))


const path = require('path')

if(process.env.NODE_ENV==='production')
{

    app.use('/' , express.static('client/build'))

    app.get('*' , (req , res)=>{

          res.sendFile(path.resolve(__dirname, 'client/build/index.html'));

    })

}


app.listen(port, async ()=>{
    try {
        await connect();
    } catch (error) {
        console.log(error)
    }
    console.log(`Listening to port ${port}`)
});